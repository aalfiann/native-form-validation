"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.FormValidation = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      /*!
       * FormValidation ES6 v1.1.1
       * https://github.com/aalfiann/native-form-validation
       *
       * Copyright 2019 M ABD AZIZ ALFIAN
       * Released under the MIT license
       * https://github.com/aalfiann/native-form-validation/blob/master/LICENSE
       */
      /* eslint no-eval: 0 */
      var FormValidation = /*#__PURE__*/function () {
        function FormValidation() {
          _classCallCheck(this, FormValidation);
          // error messages list
          this.error = [];
        }

        /**
         * Determine value is array
         * @param {*} value
         * @returns {bool}
         */
        _createClass(FormValidation, [{
          key: "_isArray",
          value: function _isArray(value) {
            if (value === undefined || value === '') {
              return false;
            }
            return value && value !== '' && _typeof(value) === 'object' && value.constructor === Array;
          }

          /**
           * Determine value is found
           * @param {*} value
           * @return {bool}
           */
        }, {
          key: "_isFound",
          value: function _isFound(value) {
            return value !== undefined && value !== null;
          }

          /**
           * Determine value is found and not empty
           * @param {*} value
           * @return {bool}
           */
        }, {
          key: "_isNotEmpty",
          value: function _isNotEmpty(value) {
            return this._isFound(value) && value !== '';
          }

          /**
           * Determine is error messages exists
           * @param {string} name     this is the element name
           * @return {bool}
           */
        }, {
          key: "_isErrorExist",
          value: function _isErrorExist(name) {
            var result = false;
            var len = this.error.length;
            for (var i = 0; i < len; i++) {
              if (this.error[i].element === name) {
                result = true;
                break;
              }
            }
            return result;
          }

          /**
           * Get error message from list
           * @param {string} name     this is the element name
           * @return {string}
           */
        }, {
          key: "_getErrorMessage",
          value: function _getErrorMessage(name) {
            var result = '';
            var len = this.error.length;
            for (var i = 0; i < len; i++) {
              if (this.error[i].element === name) {
                result = this.error[i].message;
                break;
              }
            }
            return result;
          }

          /**
           * Push error message to list
           * @param {string} customMessage    this is the custom message value if any
           * @param {string} elementName      this is the element name
           * @param {string} defaultMessage   this is the default message if no any custom message
           */
        }, {
          key: "_pushError",
          value: function _pushError(customMessage, elementName, defaultMessage) {
            if (this._isFound(customMessage)) {
              this.error.push({
                element: elementName,
                message: customMessage
              });
            } else {
              this.error.push({
                element: elementName,
                message: defaultMessage
              });
            }
          }

          /**
           * Set Rules for validation
           * @param {object} rules
           * @return {this}
           */
        }, {
          key: "rules",
          value: function rules(_rules) {
            this.rules = _rules;
            return this;
          }

          /**
           * Set element for single validation
           * @param {string} id       this is the element id
           * @return {this}
           */
        }, {
          key: "element",
          value: function element(id) {
            this.single = id;
            return this;
          }

          /**
           * Determine validate is valid
           * @return {bool}
           */
        }, {
          key: "isValid",
          value: function isValid() {
            return this.error.length === 0;
          }

          /**
           * Make validation
           * @param {fn} callback     [optional] Callback(error)
           * @return {this}
           */
        }, {
          key: "validate",
          value: function validate(callback) {
            // reset error messages list
            this.error = [];
            for (var key in this.rules) {
              // detect single element
              if (this._isNotEmpty(this.single)) key = this.single;

              // if (this.rules.hasOwnProperty(key)) {
              if (Object.prototype.hasOwnProperty.call(this.rules, key)) {
                // trim first
                if (!this._isFound(this.rules[key].trim) || this.rules[key].trim) {
                  var div = document.getElementById(key);
                  div.value = div.value.trim();
                }

                // required
                if (this._isFound(this.rules[key].required) && this.rules[key].required) {
                  if (document.getElementById(key).value.length === 0) {
                    this._pushError(this.rules[key].message, key, 'This field is required!');
                  }
                }

                // minLength
                if (this._isFound(this.rules[key].minLength) && this.rules[key].minLength) {
                  var minchar = parseInt(this.rules[key].minLength);
                  if (document.getElementById(key).value.length < minchar) {
                    this._pushError(this.rules[key].message, key, 'This field must be at least ' + minchar + ' characters long!');
                  }
                }

                // maxLength
                if (this._isFound(this.rules[key].maxLength) && this.rules[key].maxLength) {
                  var maxchar = parseInt(this.rules[key].maxLength);
                  if (document.getElementById(key).value.length > maxchar) {
                    this._pushError(this.rules[key].message, key, 'This field must be not more than ' + maxchar + ' characters long!');
                  }
                }

                // method
                if (!this._isErrorExist(key)) {
                  if (document.getElementById(key).value.length > 0) {
                    if (this._isFound(this.rules[key].method)) {
                      var keyMethod = this.rules[key].method;
                      var fn = void 0;
                      if (typeof keyMethod === 'string') {
                        fn = eval(keyMethod);
                      } else {
                        fn = keyMethod;
                      }
                      if (fn(document.getElementById(key)) === false) {
                        this._pushError(this.rules[key].message, key, 'This format field is not valid!');
                      }
                    }
                  }
                }

                // regex
                if (!this._isErrorExist(key)) {
                  if (document.getElementById(key).value.length > 0) {
                    if (this._isFound(this.rules[key].regex)) {
                      if (this.rules[key].regex.test(document.getElementById(key).value) === false) {
                        this._pushError(this.rules[key].message, key, 'This format field is not valid!');
                      }
                    }
                  }
                }

                // errorPlace
                if (this._isFound(this.rules[key].errorPlace) && this.rules[key].errorPlace) {
                  var _div = document.getElementById(this.rules[key].errorPlace);
                  _div.innerHTML = '';
                  _div.style.visibility = 'hidden';
                  if (this._isErrorExist(key)) {
                    _div.innerHTML += this._getErrorMessage(key);
                    _div.style.visibility = 'visible';
                  }
                }

                // error Add Class
                if (this._isFound(this.rules[key].errorAddClass)) {
                  for (var el in this.rules[key].errorAddClass) {
                    // if (this.rules[key].errorAddClass.hasOwnProperty(el)) {
                    if (Object.prototype.hasOwnProperty.call(this.rules[key].errorAddClass, el)) {
                      var _div2 = document.getElementById(el);
                      if (this._isArray(this.rules[key].errorAddClass[el])) {
                        for (var i = 0; i < this.rules[key].errorAddClass[el].length; i++) {
                          _div2.classList.remove(this.rules[key].errorAddClass[el][i]);
                          if (this._isErrorExist(key)) {
                            _div2.classList.add(this.rules[key].errorAddClass[el][i]);
                          }
                        }
                      } else {
                        _div2.classList.remove(this.rules[key].errorAddClass[el]);
                        if (this._isErrorExist(key)) {
                          _div2.classList.add(this.rules[key].errorAddClass[el]);
                        }
                      }
                    }
                  }
                }
              }

              // cleanup single element
              if (this._isNotEmpty(this.single)) {
                this.single = '';
                break;
              }
            }

            // if use callback
            if (typeof callback === 'function') {
              if (!this.isValid()) {
                callback(this.error);
              } else {
                callback(null);
              }
            }
            return this;
          }
        }, {
          key: "reset",
          value: function reset() {
            // reset error messages list
            this.error = [];
            for (var key in this.rules) {
              // detect single element
              if (this._isNotEmpty(this.single)) key = this.single;

              // if (this.rules.hasOwnProperty(key)) {
              if (Object.prototype.hasOwnProperty.call(this.rules, key)) {
                // errorPlace
                if (this._isFound(this.rules[key].errorPlace) && this.rules[key].errorPlace) {
                  var div = document.getElementById(this.rules[key].errorPlace);
                  div.innerHTML = '';
                  div.style.visibility = 'hidden';
                }

                // error Add Class
                if (this._isFound(this.rules[key].errorAddClass)) {
                  for (var el in this.rules[key].errorAddClass) {
                    // if (this.rules[key].errorAddClass.hasOwnProperty(el)) {
                    if (Object.prototype.hasOwnProperty.call(this.rules[key].errorAddClass, el)) {
                      var _div3 = document.getElementById(el);
                      if (this._isArray(this.rules[key].errorAddClass[el])) {
                        for (var i = 0; i < this.rules[key].errorAddClass[el].length; i++) {
                          _div3.classList.remove(this.rules[key].errorAddClass[el][i]);
                        }
                      } else {
                        _div3.classList.remove(this.rules[key].errorAddClass[el]);
                      }
                    }
                  }
                }
              }

              // cleanup single element
              if (this._isNotEmpty(this.single)) {
                this.single = '';
                break;
              }
            }
            return this;
          }
        }]);
        return FormValidation;
      }();
      module.exports = FormValidation;
    }, {}]
  }, {}, [1])(1);
});
