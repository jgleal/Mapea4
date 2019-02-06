/**
 * @module M/impl/layer/OSM
 */
import FacadeMapbox from 'M/layer/Mapbox';
import FacadeOSM from 'M/layer/OSM';
import * as LayerType from 'M/layer/Type';
import { isNullOrEmpty, generateResolutionsFromExtent, extend } from 'M/util/Utils';
import OLLayerTile from 'ol/layer/Tile';
import OLControlAttribution from 'ol/control/Attribution';
import SourceOSM from 'ol/source/OSM';
import OLTileGrid from 'ol/tilegrid/TileGrid';
import { getBottomLeft } from 'ol/extent';
import ImplMap from '../Map';
import Layer from './Layer';

/**
 * @classdesc
 * @api
 */
class OSM extends Layer {
  /**
   * @classdesc
   * Main constructor of the class. Creates a WMS layer
   * with parameters specified by the user
   *
   * @constructor
   * @implements {M.impl.Layer}
   * @param {Mx.parameters.LayerOptions} options custom options for this layer
   * @param {Object} vendorOptions vendor options for the base library
   * @api stable
   */
  constructor(userParameters, options = {}, vendorOptions) {
    // calls the super constructor
    super(options, vendorOptions);

    /**
     * Layer resolutions
     * @private
     * @type {Array<Number>}
     */
    this.resolutions_ = null;

    /**
     * The facade layer instance
     * @private
     * @type {M.layer.OSM}
     * @expose
     */
    this.facadeLayer_ = null;

    // Añadir plugin attributions
    this.hasAttributtion = false;

    this.haveOSMorMapboxLayer = false;

    // sets visibility
    if (options.visibility === false) {
      this.visibility = false;
    }

    this.zIndex_ = ImplMap.Z_INDEX[LayerType.OSM];
  }

  /**
   * This function sets the visibility of this layer
   *
   * @function
   * @api stable
   */
  setVisible(visibility) {
    this.visibility = visibility;
    if (this.inRange() === true) {
      // if this layer is base then it hides all base layers
      if ((visibility === true) && (this.transparent !== true)) {
        // hides all base layers
        this.map.getBaseLayers().forEach((layer) => {
          if (!layer.equals(this) && layer.isVisible()) {
            layer.setVisible(false);
          }
        });

        // set this layer visible
        if (!isNullOrEmpty(this.ol3Layer)) {
          this.ol3Layer.setVisible(visibility);
        }

        // updates resolutions and keep the bbox
        const oldBbox = this.map.getBbox();
        this.map.getImpl().updateResolutionsFromBaseLayer();
        if (!isNullOrEmpty(oldBbox)) {
          this.map.setBbox(oldBbox);
        }
      } else if (!isNullOrEmpty(this.ol3Layer)) {
        this.ol3Layer.setVisible(visibility);
      }
    }
  }

  /**
   * This function sets the map object of the layer
   *
   * @public
   * @function
   * @param {M.impl.Map} map
   * @api stable
   */
  addTo(map) {
    this.map = map;

    const extent = this.facadeLayer_.getMaxExtent();
    this.ol3Layer = new OLLayerTile(extend({
      source: new SourceOSM(),
      extent,
    }, this.vendorOptions_, true));

    this.map.getMapImpl().addLayer(this.ol3Layer);

    this.map.getImpl().getMapImpl().getControls().getArray()
      .forEach((cont) => {
        if (cont instanceof OLControlAttribution) {
          this.hasAttributtion = true;
        }
      }, this);
    if (!this.hasAttributtion) {
      this.map.getMapImpl().addControl(new OLControlAttribution({
        className: 'ol-attribution ol-unselectable ol-control ol-collapsed m-attribution',
      }));
      this.hasAttributtion = false;
    }

    // recalculate resolutions
    this.map.getMapImpl().updateSize();
    const size = this.map.getMapImpl().getSize();
    const units = this.map.getProjection().units;
    this.resolutions_ =
      generateResolutionsFromExtent(this.facadeLayer_.getMaxExtent(), size, 16, units);

    // sets its visibility if it is in range
    if (this.isVisible() && !this.inRange()) {
      this.setVisible(false);
    }
    if (this.zIndex_ !== null) {
      this.setZIndex(this.zIndex_);
    }
    // sets the resolutions
    if (this.resolutions_ !== null) {
      this.setResolutions(this.resolutions_);
    }
    // activates animation for base layers or animated parameters
    const animated = ((this.transparent === false) || (this.options.animated === true));
    this.ol3Layer.set('animated', animated);
  }

  /**
   * This function sets the resolutions for this layer
   *
   * @public
   * @function
   * @param {Array<Number>} resolutions
   * @api stable
   */
  setResolutions(resolutions) {
    this.resolutions_ = resolutions;

    if (!isNullOrEmpty(this.ol3Layer) && isNullOrEmpty(this.vendorOptions_.source)) {
      // gets the extent
      const extent = this.facadeLayer_.getMaxExtent();
      const newSource = new SourceOSM({
        extent,
      });
      this.ol3Layer.setSource(newSource);
    }
  }

  /**
   * This function set facade class OSM
   *
   * @function
   * @param {object} obj - Facade layer
   * @api stable
   */
  setFacadeObj(obj) {
    this.facadeLayer_ = obj;
  }

  /**
   * TODO
   */
  setMaxExtent(maxExtent) {
    this.getOL3Layer().setExtent(maxExtent);
    let resolutions = this.map.getResolutions();
    let tileGrid;
    if (isNullOrEmpty(resolutions) && !isNullOrEmpty(this.resolutions_)) {
      resolutions = this.resolutions_;
    }

    // gets the tileGrid
    if (!isNullOrEmpty(resolutions)) {
      tileGrid = new OLTileGrid({
        resolutions,
        extent: maxExtent,
        origin: getBottomLeft(maxExtent),
      });
      this.ol3Layer.getSource().tileGrid = tileGrid;
    }
  }

  /**
   * This function gets the min resolution for
   * this WMS
   *
   * @public
   * @function
   * @api stable
   */
  getMinResolution() {
    return this.resolutions_[0];
  }

  /**
   * This function gets the max resolution for
   * this WMS
   *
   * @public
   * @function
   * @api stable
   */
  getMaxResolution() {
    return this.resolutions_[this.resolutions_.length - 1];
  }

  /**
   * This function destroys this layer, cleaning the HTML
   * and unregistering all events
   *
   * @public
   * @function
   * @api stable
   */
  destroy() {
    const olMap = this.map.getMapImpl();
    if (!isNullOrEmpty(this.ol3Layer)) {
      olMap.removeLayer(this.ol3Layer);
      this.ol3Layer = null;
    }

    this.map.getLayers().forEach((layer) => {
      if (layer instanceof FacadeOSM || layer instanceof FacadeMapbox) {
        this.haveOSMorMapboxLayer = true;
      }
    });

    if (!this.haveOSMorMapboxLayer) {
      this.map.getImpl().getMapImpl().getControls().getArray()
        .forEach((data) => {
          if (data instanceof OLControlAttribution) {
            this.map.getImpl().getMapImpl().removeControl(data);
          }
        });
    }
    this.map = null;
  }

  /**
   * This function checks if an object is equals
   * to this layer
   *
   * @function
   * @api stable
   */
  equals(obj) {
    let equals = false;

    if (obj instanceof OSM) {
      equals = (this.url === obj.url);
      equals = equals && (this.name === obj.name);
    }

    return equals;
  }
}

export default OSM;
