import Utils from 'facade/js/util/Utils';

/**
 * @classdesc
 * Feature format for reading and writing data in the KML format.
 *
 */
export default class KML extends ol.format.KML {
  /**
   * @constructor
   * @extends {ol.format.KML}
   * @param {olx.format.KMLOptions=} optOptions Options.
   * @api stabl
   */
  constructor(optOptions = {}) {
    super();

    /**
     * @private
     * @type {Object}
     */
    this.screenOverlay_ = null;
  }

  /**
   * TODO
   */
  readCustomFeatures(textResponse, options) {
    const features = this.readFeatures(textResponse, options);
    const featuresModified = features.map((feature) => {
      const styles = feature.getStyle()(feature);
      styles.forEach((style) => {
        if (style.getImage() instanceof ol.style.Icon) {
          const image = style.getImage();
          image.getImage().removeAttribute('crossorigin');
          style.setImage(image);
        }
      });
      feature.set('name', Utils.decodeHtml(feature.get('name')));
      return feature;
    });
    this.readScreenOverlay(textResponse);
    return featuresModified;
  }

  /**
   * @param {Node} node Node.
   * @param {Array.<*>} objectStack Object stack.
   * @public
   */
  readScreenOverlay(textResponse) {
    // Attributes ScreenOverlay
    const screenOverlayAttr = 'ScreenOverlay';
    const iconAttr = 'Icon';
    const hrefAttr = 'href';
    const overlayXYAttr = 'overlayXY';
    const screenXYAttr = 'screenXY';
    const rotationXYAttr = 'rotationXY';
    const sizeAttr = 'size';
    const xUnitsAttr = 'xunits';
    const yUnitsAttr = 'yunits';

    const screenOverlay = ol.xml.parse(textResponse).querySelector(screenOverlayAttr);
    if (screenOverlay !== null) {

      const icon = screenOverlay.querySelector(iconAttr);

      // Icon src of ScreenOverlay
      const src = icon !== null ? icon.querySelector(hrefAttr).innerHTML : 'NO_IMAGE';

      // overlayXY (offset)
      let overlayXY;
      let overlayXUnits;
      let overlayYUnits;
      const overlayXYElement = screenOverlay.querySelector(overlayXYAttr);
      if (overlayXYElement !== null) {
        const attributeX = parseFloat(overlayXYElement.getAttribute('x'));
        const attributeY = parseFloat(overlayXYElement.getAttribute('y'));
        overlayXY = [attributeX, attributeY];
        overlayXUnits = overlayXYElement.getAttribute(xUnitsAttr);
        overlayYUnits = overlayXYElement.getAttribute(yUnitsAttr);
      }

      // screenXY (anchor)
      let screenXY;
      let screenXUnits;
      let screenYUnits;
      const screenXYElement = screenOverlay.querySelector(screenXYAttr);
      if (screenXYElement !== null) {
        const attributeX = parseFloat(screenXYElement.getAttribute('x'));
        const attributeY = parseFloat(screenXYElement.getAttribute('y'));
        screenXY = [attributeX, attributeY];
        screenXUnits = screenXYElement.getAttribute(xUnitsAttr);
        screenYUnits = screenXYElement.getAttribute(yUnitsAttr);
      }
      else if (src === ol.format.KML.DEFAULT_IMAGE_STYLE_SRC) {
        screenXY = ol.format.KML.DEFAULT_IMAGE_STYLE_ANCHOR;
        screenXUnits = ol.format.KML.DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS;
        screenYUnits = ol.format.KML.DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS;
      }
      else if (/^http:\/\/maps\.(?:google|gstatic)\.com\//.test(src)) {
        screenXY = [0.5, 0];
        screenXUnits = ol.style.IconAnchorUnits.FRACTION;
        screenYUnits = ol.style.IconAnchorUnits.FRACTION;
      }

      // rotation
      let rotationXY;
      let rotationXUnits;
      let rotationYUnits;
      const rotationElement = screenOverlay.querySelector(rotationXYAttr);
      if (rotationElement !== null) {
        const attributeX = parseFloat(rotationElement.getAttribute('x'));
        rotationXY = (Math.PI / 180) * (attributeX);
        rotationXUnits = rotationElement.getAttribute(xUnitsAttr);
        rotationYUnits = rotationElement.getAttribute(yUnitsAttr);
      }

      // size
      let size;
      let sizeXUnits;
      let sizeYUnits;
      const sizeElement = screenOverlay.querySelector(sizeAttr);
      if (sizeElement !== null) {
        const attributeX = parseFloat(sizeElement.getAttribute('x'));
        const attributeY = parseFloat(sizeElement.getAttribute('y'));
        size = [attributeX, attributeY];
        sizeXUnits = sizeElement.getAttribute(xUnitsAttr);
        sizeYUnits = sizeElement.getAttribute(yUnitsAttr);
      }

      this.screenOverlay_ = {
        screenXY,
        screenXUnits,
        screenYUnits,
        overlayXY,
        overlayXUnits,
        overlayYUnits,
        rotationXY,
        rotationXUnits,
        rotationYUnits,
        size,
        sizeXUnits,
        sizeYUnits,
        src,
      };
    }
  }

  getScreenOverlay() {
    return this.screenOverlay_;
  }
}

/**
 *  See https://github.com/openlayers/openlayers/blob/v4.0.1/src/ol/format/kml.js#L223
 * @const
 * @type {string}
 */
KML.DEFAULT_NO_IMAGE_STYLE = 'NO_IMAGE';

/**
 * See https://github.com/openlayers/openlayers/blob/v4.0.1/src/ol/format/kml.js#L191
 * @const
 * @type {string}
 *
 */
KML.DEFAULT_IMAGE_STYLE_SRC = 'https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png';

/**
 * See https://github.com/openlayers/openlayers/blob/v4.0.1/src/ol/format/kml.js#L161
 * @const
 * @type {ol.Size}
 */
KML.DEFAULT_IMAGE_STYLE_ANCHOR = [20, 2]; // FIXME maybe [8, 32] ?

/**
 *  See https://github.com/openlayers/openlayers/blob/v4.0.1/src/ol/format/kml.js#L168
 * See https://github.com/openlayers/openlayers/blob/c27aac20b7642f7878abe1e23ace07a851511829/src/ol/style/IconAnchorUnits.js#L11
 * @const
 * @type {ol.style.IconAnchorUnits}
 */
KML.DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS = 'pixels';

/**
 * See https://github.com/openlayers/openlayers/blob/v4.0.1/src/ol/format/kml.js#L176
 * See https://github.com/openlayers/openlayers/blob/c27aac20b7642f7878abe1e23ace07a851511829/src/ol/style/IconAnchorUnits.js#L11
 * @const
 * @type {ol.style.IconAnchorUnits}
 */
KML.DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS = 'pixels';
