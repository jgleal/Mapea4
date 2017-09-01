goog.provide('M.impl.style.Simple');

/**
 * @namespace M.impl.style.Simple
 */

(function() {
  /**
   * Main constructor of the class.
   * @constructor
   * @api stable
   */
  M.impl.style.Simple = (function(options = {}) {
    this.updateFacadeOptions(options);
  });

  /**
   * This function apply style options facade to impl
   * @private
   * @function
   * @param {Object} options
   * @api stable
   */
  M.impl.style.Simple.prototype.updateFacadeOptions = function(options = {}) {};

  /**
   * This function apply style to layer
   * @public
   * @function
   * @param {M.layer.Vector} layer - Layer
   * @api stable
   */
  M.impl.style.Simple.prototype.applyToLayer = function(layer) {
    layer.getFeatures().forEach(this.applyToFeature, this);
  };

  /**
   * This function apply style to feature
   *
   * @public
   * @param {M.Feature} feature - Feature to apply style
   * @function
   * @api stable
   */
  M.impl.style.Simple.prototype.applyToFeature = function(feature) {
    let g = ol.Observable.prototype.changed;
    ol.Observable.prototype.changed = function() {};
    feature.getImpl().getOLFeature().setStyle(this.olStyleFn_);
    ol.Observable.prototype.changed = g;
  };

  /**
   * This function get the value of the feature which key match with
   * the attr param
   * @public
   * @function
   * @param {string|number|function} attr - attribute or function
   * @param {M.Feature}  feature - Feature
   * @api stable
   */
  M.impl.style.Simple.getValue = function(attr, feature) {
    let regexp = /^\{\{([^\}]+)\}\}$/;
    let attrFeature = attr;
    if (regexp.test(attr)) {
      let keyFeature = attr.replace(regexp, '$1');
      attrFeature = feature.getProperties()[keyFeature];
    }
    else if (M.utils.isFunction(attr)) {
      attrFeature = attr(feature);
    }
    if (M.utils.isNullOrEmpty(attrFeature)) {
      attrFeature = undefined;
    }
    return attrFeature;
  }
})();
