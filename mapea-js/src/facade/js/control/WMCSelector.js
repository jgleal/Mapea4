/**
 * @module M/control/WMCSelector
 */
import wmcselectorTemplate from 'templates/wmcselector';
import 'assets/css/controls/wmcselector';
import WMCSelectorImpl from 'impl/control/WMCSelector';
import ControlBase from './Control';
import { isUndefined } from '../util/Utils';
import Exception from '../exception/exception';
import { compileSync as compileTemplate } from '../util/Template';
import { getValue } from '../i18n/language';

/**
 * @classdesc
 * @api
 */
class WMCSelector extends ControlBase {
  /**
   * @constructor
   * @extends {M.Control}
   * @api
   */
  constructor() {
    // implementation of this control
    const impl = new WMCSelectorImpl();

    // calls the super constructor
    super(impl, WMCSelector.NAME);

    // checks if the implementation can create WMC layers
    if (isUndefined(WMCSelectorImpl)) {
      Exception(getValue('exception').wmcselector_method);
    }
  }

  /**
   * This function creates the view to the specified map
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api
   */
  createView(map) {
    // compiles the template
    return compileTemplate(wmcselectorTemplate, {
      vars: {
        layers: map.getWMC(),
        title: getValue('wmcselector').title,
      },
    });
  }

  /**
   * This function checks if an object is equals
   * to this control
   *
   * @function
   * @api
   */
  equals(obj) {
    let equals = false;
    if (obj instanceof WMCSelector) {
      equals = (this.name === obj.name);
    }
    return equals;
  }
}

/**
 * Name for this controls
 * @const
 * @type {string}
 * @public
 * @api
 */
WMCSelector.NAME = 'wmcselector';

export default WMCSelector;
