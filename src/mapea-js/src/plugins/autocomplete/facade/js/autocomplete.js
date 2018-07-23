export default class Autocomplete extends M.Plugin {
  /**
   * @classdesc
   * Main facade plugin object. This class creates a plugin
   * Autocomplete
   *
   * @constructor
   * @extends {M.Plugin}
   * @param {Mx.parameters.Autocomplete} parameters - Autocomplete parameters
   * @api stable
   */
  constructor(parameters = {}) {
    super();
    /**
     * Facade of the map
     *
     * @private
     * @type {M.Map}
     */
    this.map_ = null;

    /**
     * Name of this control
     * @public
     * @type {string}
     * @api stable
     */
    this.name = Autocomplete.NAME;

    /**
     * INE code to specify the search
     *
     * @private
     * @type {number}
     */
    this.locality_ = '';
    if (!M.utils.isNullOrEmpty(parameters.locality)) {
      this.locality_ = parameters.locality;
    }

    /**
     * Service URL
     *
     * @private
     * @type {string}
     */
    this.url_ = M.config.SEARCHSTREET_URLCODINEAUTOCOMPLETE;

    /**
     * Minimum number of characters to start autocomplete
     *
     * @private
     * @type {number}
     */
    this.minLength_ = M.config.AUTOCOMPLETE_MINLENGTH;
    /**
     * Input searchstreet
     *
     * @private
     * @type {HTMLElement}
     */
    this.target_ = parameters.target;
    /**
     * Container autocomplete
     *
     * @private
     * @type {HTMLElement}
     */
    this.resultsContainer_ = parameters.html.querySelector('div#m-autocomplete-results');
    // JGL20170816: control de selección por teclado
    this.target_.addEventListener('keydown', (e) => {
      const lista = this.resultsContainer_.querySelectorAll('div.autocomplete');
      let selectedResult = this.resultsContainer_.querySelector('.selected');
      if (e.keyCode === 13) {
        const controls = this.map_.getControls();
        for (let i = 0, ilen = controls.length; i < ilen; i += 1) {
          if (controls[1].name_ === 'searchstreet') {
            if (this.controls[1].indexOf(',') < 0) {
              this.searchMunicipality_(this.controls[1]);
            }
            else {
              controls[1].searchClick_(e);
              controls[1].completed = false;
            }
          }
          else if (controls[1].name_ === 'searchstreetgeosearch') {
            if (!M.Utils.isNullOrEmpty(selectedResult) && (this.controls[1].indexOf(',') < 0)) {
              this.searchMunicipality_(this.controls[1]);
            }
            else {
              controls[1].ctrlSearchstreet.searchClick_(e);
              controls[1].ctrlSearchstreet.completed = false;
              controls[1].ctrlGeosearch.searchClick_(e);
            }
          }
        }
        selectedResult = null;
      }
      else if (lista.length > 0) {
        let idxSelectedResult = -1;
        for (let i = 0; i < lista.length; i += 1) {
          if (lista[i].classList.contains('selected')) {
            idxSelectedResult = i;
            selectedResult = lista[i];
          }
        }
        if (e.keyCode === 40) {
          if (idxSelectedResult === -1) {
            selectedResult = lista[0];
            selectedResult.classList.add('selected');
          }
          else if (idxSelectedResult < lista.length - 1) {
            // console.log(idxSelectedResult,lista.length);
            lista[idxSelectedResult].classList.remove('selected');
            selectedResult = lista[idxSelectedResult + 1];
            selectedResult.classList.add('selected');
          }
        }
        else if (e.keyCode === 38) {
          if (idxSelectedResult === lista.length) {
            selectedResult = lista[lista.length];
            selectedResult.classList.add('selected');
          }
          else if (idxSelectedResult >= 1) {
            lista[idxSelectedResult].classList.remove('selected');
            selectedResult = lista[idxSelectedResult - 1];
            selectedResult.classList.add('selected');
          }
        }

        if (!M.utils.isNullOrEmpty(selectedResult)) {
          this.value = selectedResult.innerHTML.trim();
          const divCont = document.getElementById('m-autcomplete');
          divCont.scrollTop = selectedResult.offsetTop;
        }
      }
    });

    /**
     * Delay time
     *
     * @private
     * @type {number}
     */
    this.delayTime_ = M.config.AUTOCOMPLETE_DELAYTIME;

    /**
     * Time out Key
     *
     * @private
     * @type {number}
     */
    this.timeoutKey_ = null;

    /**
     * Number of results to show
     *
     * @private
     * @type {number}
     */
    this.limit_ = M.config.AUTOCOMPLETE_LIMIT;

    /**
     * Timestamp of the search to abort old requests
     *
     * @private
     * @type {number}
     */
    this.searchTime_ = 0;

    /**
     * State search municipality
     *
     * @private
     * @type {boolean}
     */
    this.busqMunicipio_ = false;

    /**
     * State click search municipality
     *
     * @private
     * @type {boolean}
     */
    this.busqMunicipioClick_ = false;

    /**
     * Container searching results
     *
     * @private
     * @type {HTMLElement}
     */
    this.searchingResult_ = this.resultsContainer_.querySelector('div#m-autocomplete-results > div#m-searching-result-autocomplete');
  }

  /**
   * @inheritdoc
   *
   * @public
   * @function
   * @param {M.Map} map - Facade map
   * @api stable
   */
  addTo(map) {
    this.map_ = map;
    this.target_.classList.add(Autocomplete.CLASS);
    this.resultsContainer_.remove(this.searchingResult_);
    this.target_.addEventListener('input', this.keyPress);
    this.target_.addEventListener('keyup', this.hiddenAutocomplete_);
  }

  /**
   * This function will hide the search results if the escape key is pressed.
   *
   * @private
   * @function
   * @param {goog.events.BrowserEvent}
   *        evt - Keypress event
   */
  hiddenAutocomplete_(evt) {
    if (evt.keyCode === 27) {
      this.cancelSearch_(evt);
    }
  }


  /**
   * Read events keystrokes
   *
   * @private
   * @function
   * @param {goog.events.BrowserEvent}
   *        evt - Keypress event
   */
  keyPress_(evt) {
    evt.preventDefault();

    if (!M.utils.isNullOrEmpty(this.timeoutKey_)) {
      this.cancelSearch_(evt);
    }

    const query = this.target_.value.trim();
    if (query.length >= this.minLength_) {
      this.timeoutKey_ = setTimeout(() => {
        if (query.indexOf(',') !== -1) {
          this.busqMunicipio_ = true;
        }
        else {
          this.busqMunicipio_ = false;
          this.busqMunicipioClick_ = false;
        }
        this.search_(query);
      }, this.delayTime_);
    }
  }

  /**
   * This function performs the query
   *
   * @private
   * @function
   * @param {string} query - Query to search
   * @param {goog.events.BrowserEvent}
   *        evt - Click event
   */
  search_(query, evt) {
    let searchUrl;
    searchUrl = M.utils.addParameters(this.url_, {
      input: query.trim(),
      limit: this.limit_,
      codine: this.locality_,
    });

    searchUrl = this.formatContent_(searchUrl, ' ', '%20');
    this.searchTime_ = Date.now();
    ((searchTime) => {
      M.Remote.get(searchUrl).then((response) => {
        if (searchTime === this.searchTime_) {
          let results = JSON.parse(response.text);
          results = this.parseResultsForTemplate_(results);
          const controls = this.map_.getControls();
          /*
           * In case of using locality, if a different municipality
           is indicated to locality results.docs will be undefinded
           * In this case, to change false the attribute completed of searchstreet
           */
          if (!M.Utils.isUndefined(results.docs)) {
            // If the result is indefinite, it will not continue autocompleting
            if (!M.Utils.isUndefined(results.docs[0])) {
              M.Template.compile(Autocomplete.RESULTAUTOCOMPLETE, {
                jsonp: true,
                vars: results,
              }).then((html) => {
                this.resultsContainer_.innerHTML = html.innerHTML;
                const divResultsAutocomplete = this.resultsContainer_.querySelectorAll('div.autocomplete');
                this.addEvents_(divResultsAutocomplete);
                this.target_.focus();
                /*
                 * In case the municipality not searched, to verify that searchstreet is completed,
                 * in affirmative case to change to false the attribute completed of searchstreet
                 * and not show results
                 * */
                if (this.busqMunicipio_ === true) {
                  /* In case of not having the added event, it will be verified
                   if searchstreet is completed.
                   *  In affirmative case to change to false and not to show result,
                   *  in negative case, to assign the event to the results
                   */
                  if (this.busqMunicipioClick_ === true) {
                    // this.target_.value = query.slice(0, -1);
                    this.resultsContainer_.innerHTML = '';
                    if (!M.utils.isUndefined(this.evt)) {
                      for (let i = 0, ilen = controls.length; i < ilen; i += 1) {
                        if (controls[1].name_ === 'searchstreetgeosearch') {
                          controls[1].ctrlSearchstreet.searchClick_(this.evt);
                          controls[1].ctrlSearchstreet.completed = false;
                          controls[1].ctrlGeosearch.searchClick_(this.evt);
                        }
                        else if (controls[1].name_ === 'searchstreet') {
                          controls[1].searchClick_(this.evt);
                          controls[1].completed = false;
                        }
                      }
                      this.busqMunicipioClick_ = false;
                    }
                  }
                  else {
                    const autocompleteResults = this.resultsContainer_.querySelectorAll('div.autocomplete');
                    for (let m = 0, ilen2 = controls.length; m < ilen2; m += 1) {
                      if (controls[m].name_ === 'searchstreetgeosearch') {
                        if (controls[m].ctrlSearchstreet.completed === true) {
                          controls[m].ctrlSearchstreet.completed = false;
                          this.resultsContainer_.innerHTML = '';
                        }
                        else {
                          for (let h = 0, ilen3 = autocompleteResults.length; h < ilen3; h += 1) {
                            this.evtClickMunicipaly_(autocompleteResults[h]);
                          }
                        }
                      }
                      else if (controls[m].name_ === 'searchstreet') {
                        if (controls[m].completed === true) {
                          controls[m].completed = false;
                          this.resultsContainer_.innerHTML = '';
                        }
                        else {
                          for (let j = 0, ilen5 = autocompleteResults.length; j < ilen5; j += 1) {
                            this.evtClickMunicipaly_(autocompleteResults[j]);
                          }
                        }
                      }
                    }
                  }
                }
                else {
                  for (let y = 0, ilen4 = controls.length; y < ilen4; y += 1) {
                    if (controls[y].name_ === 'searchstreet') {
                      if (controls[y].completed === true) {
                        this.resultsContainer_.innerHTML = '';
                        controls[y].completed = false;
                      }
                    }
                    else if (controls[y].name_ === 'searchstreetgeosearch') {
                      if (controls[y].ctrlSearchstreet.completed === true) {
                        this.resultsContainer_.innerHTML = '';
                        controls[y].ctrlSearchstreet.completed = false;
                      }
                    }
                  }
                }
              });
            }
            else {
              for (let r = 0, ilen4 = controls.length; r < ilen4; r += 1) {
                if (controls[r].name_ === 'searchstreet') {
                  controls[r].completed = false;
                }
                else if (controls[r].name_ === 'searchstreetgeosearch') {
                  controls[r].ctrlSearchstreet.completed = false;
                }
              }
            }
          }
          else {
            for (let g = 0, ilen6 = controls.length; g < ilen6; g += 1) {
              if (controls[g].name_ === 'searchstreet') {
                controls[g].completed = false;
              }
              else if (controls[g].name_ === 'searchstreetgeosearch') {
                controls[g].ctrlSearchstreet.completed = false;
              }
            }
          }
          this.resultsContainer_.classList.remove(Autocomplete.MINIMUM);
          this.resultsContainer_.removeChildren(this.searchingResult_);
        }
      });
    })(this.searchTime_);
  }
  /**
   * This function adds the click event to each result with municipality
   *
   * @private
   * @param {HTMLElement} element - HTML element to add the event
   * @function
   */
  evtClickMunicipaly_(element) {
    element.addEventListener('click', () => {
      this.clickMunicipaly_();
    });
  }

  /**
   * This function parse results for template
   *
   * @private
   * @param {object} results - Query results
   * @function
   * @return {object} ResultsTemplateVar - parse results
   */
  parseResultsForTemplate_(results) {
    let docs = results.autocompletarDireccionMunicipioResponse
      .autocompletarDireccionMunicipioReturn.autocompletarDireccionMunicipioReturn;
    const doscsTemp = [];
    if (this.busqMunicipio_ === true) {
      if (!M.Utils.isUndefined(docs)) {
        if (docs instanceof Array === false) {
          docs = [docs];
        }
        for (let i = 0, ilen = docs.length; i < ilen; i += 1) {
          const info = docs[i].split(',');
          doscsTemp.push(`${info[0]} ${info[1]}, ${info[3]} (${info[info.length - 1]})`);
        }
        docs = doscsTemp;
      }
      else {
        this.resultsContainer_.innerHTML = '';
      }
    }
    else if (docs instanceof Array === false) {
      doscsTemp.push(docs);
      docs = doscsTemp;
      if (!M.utils.isUndefined(docs[0])) {
        for (let x = 0, ilen3 = docs.length; x < ilen3; x += 1) {
          docs[x] = this.formatContent_(docs[x], ',', ' ');
        }
      }
    }
    else {
      for (let j = 0, ilen2 = docs.length; j < ilen2; j += 1) {
        docs[j] = this.formatContent_(docs[j], ',', ' ');
      }
    }
    let resultsTemplateVar = null;
    resultsTemplateVar = {
      docs,
    };
    return resultsTemplateVar;
  }

  /**
   * This function add events to the results
   *
   * @private
   * @Param {array} results - Array of HTML elements
   * @function
   */
  addEvents_(results) {
    results.forEach((value) => {
      this.addEventSearchMunicipality_(value);
    });
  }

  /**
   * This function add events to specific result
   *
   * @private
   * @param {HTMLElement} result - HTML element to add the event
   * @function
   */
  addEventSearchMunicipality_(result) {
    result.addEventListener('click', (e) => {
      this.target_.value = result.innerHTML.trim();
      if (!M.utils.isNullOrEmpty(this.locality_)) {
        const controls = this.map_.getControls();
        this.resultsContainer_.innerHTML = '';
        controls.forEach((controlVar) => {
          const control = controlVar;
          if (control.name_ === 'searchstreet') {
            control.searchClick_(e);
            control.completed = false;
          }
          else if (control.name_ === 'searchstreetgeosearch') {
            control.ctrlSearchstreet.searchClick_(e);
            control.ctrlSearchstreet.completed = false;
            control.ctrlGeosearch.searchClick_(e);
          }
        });
      }
      else {
        this.searchMunicipality_(result.innerHTML, e);
      }
    });
  }

  /**
   * This function active 'busqMunicipio' and calls performs the search
   *
   * @private
   * @param {string} content - String to search
   * @param {goog.events.BrowserEvent}
   *        evt - keypress event
   * @function
   */
  searchMunicipality_(content, evt) {
    this.busqMunicipio_ = true;
    this.search_(`${content.trim()},`, evt);
  }

  /**
   * This function active 'busqMunicipioClick_'
   *
   * @private
   * @function
   */
  clickMunicipaly_() {
    this.busqMunicipioClick_ = true;
  }

  /**
   * This function formats content
   *
   * @private
   * @function
   * @param {string} str - String to search
   * @Param {string} find - String to find
   * @Param {string} replace - String to replace
   * @returns {string} Format content
   */
  static formatContent_(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  /**
   * This function cancel search
   *
   * @private
   * @function
   * @param {goog.events.BrowserEvent}
   *        evt - Keypress event
   */
  cancelSearch_(evt) {
    clearTimeout(this.timeoutKey_);
    if (this.minLength_ <= this.target_.value.length && evt.keyCode !== 13 && evt.keyCode !== 27) {
      if (!M.utils.isNullOrEmpty(this.resultsContainer_.parentElement.querySelector('#m-searchstreet-results>div'))) {
        this.resultsContainer_.classList.add('results-panel-content');
        this.resultsContainer_.classList.remove('results-panel');
      }
      else {
        this.resultsContainer_.classList.add('results-panel');
      }
      this.resultsContainer_.appendChild(this.searchingResult_);
      this.resultsContainer_.parentElement.classList.add(Autocomplete.SEARCHING_CLASS);
      this.resultsContainer_.classList.add(Autocomplete.MINIMUM);
    }
    else {
      this.searchTime_ = 0;
      this.resultsContainer_.parentElement.classList.remove(Autocomplete.SEARCHING_CLASS);
      this.resultsContainer_.classList.remove(Autocomplete.MINIMUM);
      this.resultsContainer_.removeChildren(this.searchingResult_);
      this.resultsContainer_.innerHTML = '';
    }
  }

  /**
   * This function destroys this plugin
   *
   * @public
   * @function
   * @api stable
   */
  destroy() {
    this.map_.removeControls(this);
    this.map_ = null;
    this.locality_ = '';
    this.url_ = null;
    this.minLength_ = null;
    this.target_ = null;
    this.resultsContainer_ = null;
    this.delayTime_ = null;
    this.timeoutKey_ = null;
    this.limit_ = null;
    this.searchTime_ = null;
    this.busqMunicipio_ = null;
    this.busqMunicipioClick_ = null;
    this.searchingResult_ = null;
  }

  static equals(plugin) {
    if (plugin instanceof Autocomplete) {
      return true;
    }
    return false;
  }
}

/**
 * Class autocomplete
 *
 * @const
 * @type {string}
 * @public
 * @api stable
 */
Autocomplete.CLASS = 'm-plugin-autocomplete';

/**
 * Class searching
 * @const
 * @type {string}
 * @public
 * @api stable
 */
Autocomplete.SEARCHING_CLASS = 'm-searching';

/**
 * Template for this plugin - results
 * @const
 * @type {string}
 * @public
 * @api stable
 */
Autocomplete.RESULTAUTOCOMPLETE = 'resultautocomplete.html';

/**
 * Class minimum
 * @const
 * @type {string}
 * @public
 * @api stable
 */
Autocomplete.MINIMUM = 'minimum';

/**
 * This function compare if pluging recieved by param is instance of Autocomplete
 *
 * @public
 * @function
 * @param {M.plugin} plugin to comapre
 * @api stable
 */

Autocomplete.NAME = 'autocomplete';
