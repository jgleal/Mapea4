import DrawFeatureImpl from '../../impl/ol/js/drawfeature';
import drawfeatureHTML from '../../templates/drawfeature';

export default class DrawFeature extends M.Control {
  /**
   * @classdesc Main constructor of the class. Creates a DrawFeature
   * control to draw features on the map.
   *
   * @constructor
   * @param {M.layer.WFS} layer - Layer for use in control
   * @extends {M.Control}
   * @api stable
   */
  constructor(layer) {
    // implementation of this control
    const impl = new DrawFeatureImpl(layer);

    // calls the super constructor
    super(impl, DrawFeature.NAME);

    /**
     * Name of the control
     * @public
     * @type {String}
     */
    this.name = DrawFeature.NAME;

    if (M.utils.isUndefined(DrawFeatureImpl)) {
      M.Exception('La implementación usada no puede crear controles DrawFeature');
    }
  }

  /**
   * This function creates the view to the specified map
   *
   * @public
   * @function
   * @param {M.Map} map - Map to add the control
   * @returns {HTMLElement} html response
   * @api stable
   */
  createView(map) {
    return M.template.compileSync(drawfeatureHTML, {
      jsonp: true,
    });
  }

  /**
   * This function returns the HTML button
   *
   * @public
   * @function
   * @param {HTMLElement} element - HTML control
   * @return {HTMLElement} return HTML button
   * @api stable
   * @export
   */
  getActivationButton(element) {
    return element.querySelector('button#m-button-drawfeature');
  }

  /**
   * This function checks if an object is equals to this control
   *
   * @function
   * @api stable
   * @param {*} obj - Object to compare
   * @returns {boolean} equals - Returns if they are equal or not
   */
  equals(obj) {
    const equals = (obj instanceof DrawFeature);
    return equals;
  }

  /**
   * This function set layer for delete features
   *
   * @public
   * @function
   * @param {M.layer.WFS} layer - Layer
   * @api stable
   */
  setLayer(layer) {
    this.getImpl().setLayer(layer);
  }
}

/**
 * Name for this controls
 *
 * @const
 * @type {string}
 * @public
 * @api stable
 */
DrawFeature.NAME = 'drawfeature';

/**
 * Template for this controls - button
 *
 * @const
 * @type {string}
 * @public
 * @api stable
 */
DrawFeature.TEMPLATE = 'drawfeature.html';
