/*!
 * FormValidation ES5 v1.0.1
 * https://github.com/aalfiann/native-form-validation
 *
 * Copyright 2019 M ABD AZIZ ALFIAN
 * Released under the MIT license
 * https://github.com/aalfiann/native-form-validation/blob/master/LICENSE
 */
function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormValidation = function () {
  "use strict";
  function FormValidation() {
    _classCallCheck(this, FormValidation);
    this.error = [];
  }
  _createClass(FormValidation, [{
    key: "_isFound", value: function _isFound(value) {
      return value !== undefined && value !== null;
    }
  }, {
    key: "_isNotEmpty", value: function _isNotEmpty(value) {
      return this._isFound(value) && value !== '';
    }
  }, {
    key: "_isErrorExist", value: function _isErrorExist(name) {
      var result = false;
      var len = this.error.length;
      for (var i = 0; i < len; i++) {
        if (this.error[i]['element'] === name) {
          result = true;
          break;
        }
      }
      return result;
    }
  }, {
    key: "_getErrorMessage", value: function _getErrorMessage(name) {
      var result = '';
      var len = this.error.length;
      for (var i = 0; i < len; i++) {
        if (this.error[i]['element'] === name) {
          result = this.error[i]['message'];
          break;
        }
      }
      return result;
    }
  }, {
    key: "_pushError", value: function _pushError(customMessage, elementName, defaultMessage) {
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
  }, {
    key: "rules", value: function rules(_rules) {
      this.rules = _rules;
      return this;
    }
  }, {
    key: "element", value: function element(id) {
      this.single = id;
      return this;
    }
  }, {
    key: "isValid", value: function isValid() {
      return this.error.length === 0;
    }
  }, {
    key: "validate", value: function validate(callback) {
      this.error = [];
      for (var key in this.rules) {
        if (this._isNotEmpty(this.single)) key = this.single;
        if (this.rules.hasOwnProperty(key)) {
          if (!this._isFound(this.rules[key]['trim']) || this.rules[key]['trim']) {
            var div = document.getElementById(key);
            div.value = div.value.trim();
          }
          if (this._isFound(this.rules[key]['required']) && this.rules[key]['required']) {
            if (document.getElementById(key).value.length === 0) {
              this._pushError(this.rules[key]['message'], key, 'This field is required!');
            }
          }
          if (this._isFound(this.rules[key]['minLength']) && this.rules[key]['minLength']) {
            var minchar = parseInt(this.rules[key]['minLength']);
            if (document.getElementById(key).value.length < minchar) {
              this._pushError(this.rules[key]['message'], key, 'This field must be at least ' + minchar + ' characters long!');
            }
          }
          if (this._isFound(this.rules[key]['maxLength']) && this.rules[key]['maxLength']) {
            var maxchar = parseInt(this.rules[key]['maxLength']);
            if (document.getElementById(key).value.length > maxchar) {
              this._pushError(this.rules[key]['message'], key, 'This field must be not more than ' + maxchar + ' characters long!');
            }
          }
          if (!this._isErrorExist(key)) {
            if (document.getElementById(key).value.length > 0) {
              if (this._isFound(this.rules[key]['method'])) {
                var keyMethod = this.rules[key]['method'];
                var fn;
                if (typeof keyMethod === 'string') {
                  fn = eval(keyMethod);
                } else {
                  fn = keyMethod;
                }
                if (fn(document.getElementById(key)) === false) {
                  this._pushError(this.rules[key]['message'], key, 'This format field is not valid!');
                }
              }
            }
          }
          if (!this._isErrorExist(key)) {
            if (document.getElementById(key).value.length > 0) {
              if (this._isFound(this.rules[key]['regex'])) {
                if (this.rules[key]['regex'].test(document.getElementById(key).value) === false) {
                  this._pushError(this.rules[key]['message'], key, 'This format field is not valid!');
                }
              }
            }
          }
          if (this._isFound(this.rules[key]['errorPlace']) && this.rules[key]['errorPlace']) {
            var div = document.getElementById(this.rules[key]['errorPlace']);
            div.innerHTML = '';
            div.style.visibility = "hidden";
            if (this._isErrorExist(key)) {
              div.innerHTML += this._getErrorMessage(key);
              div.style.visibility = "visible";
            }
          }
          if (this._isFound(this.rules[key]['errorAddClass'])) {
            for (var el in this.rules[key]['errorAddClass']) {
              if (this.rules[key]['errorAddClass'].hasOwnProperty(el)) {
                var div = document.getElementById(el);
                div.classList.remove(this.rules[key]['errorAddClass'][el]);
                if (this._isErrorExist(key)) {
                  div.classList.add(this.rules[key]['errorAddClass'][el]);
                }
              }
            }
          }
        }
        if (this._isNotEmpty(this.single)) {
          this.single = '';
          break;
        }
      }
      if (typeof callback === "function") {
        if (!this.isValid()) {
          callback(this.error);
        } else {
          callback(null);
        }
      }
      return this;
    }
  }]);
  return FormValidation;
}();