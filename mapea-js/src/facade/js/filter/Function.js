/**
 * @module M/filter/Function
 */
import BaseFilter from './Base';
import { isNullOrEmpty } from '../util/Utils';

/**
 * @classdesc
 * @api
 */
class Function extends BaseFilter {
  /**
   * Creates a Filter Function to filter features
   *
   * @param {function} filterFunction - Function to execute
   * @api
   */
  constructor(filterFunction, options = {}) {
    super();
    /**
     * Function to execute
     * @private
     * @type {function}
     */
    this.filterFunction_ = filterFunction;

    /**
     * Filter CQL
     * @private
     * @type {String}
     */
    this.cqlFilter_ = '';
    if (!isNullOrEmpty(options.cqlFilter)) {
      this.cqlFilter_ = options.cqlFilter;
    }
  }

  /**
   * This function set a function filter
   *
   * @public
   * @function
   * @api
   */
  setFunction(filterFunction) {
    this.filterFunction_ = filterFunction;
  }

  /**
   * This function get a function filter
   *
   * @public
   * @function
   * @return {M.filter.Function} filter to execute
   * @api
   */
  getFunctionFilter() {
    return this.filterFunction_;
  }

  /**
   * This function execute a function filter
   *
   * @public
   * @function
   * @param {Array<M.Feature>} features - Features on which the filter runs
   * @return {Array<M.Feature>} features to passed filter
   * @api
   */
  execute(features) {
    return features.filter(this.filterFunction_);
  }

  /**
   * This function return CQL
   *
   * @public
   * @function
   * @api
   * @return {string} CQL
   */
  toCQL() {
    return this.cqlFilter_;
  }
}

export default Function;
