/*!
 * FormValidation ES6 v1.0.0
 * https://github.com/aalfiann/native-form-validation
 *
 * Copyright 2019 M ABD AZIZ ALFIAN
 * Released under the MIT license
 * https://github.com/aalfiann/native-form-validation/blob/master/LICENSE
 */
class FormValidation {

    error = [];
    _isFound(value) {
        return value !== undefined && value !== null;
    }
    _isNotEmpty(value) {
        return this._isFound(value) && value !== '';
    }
    _isErrorExist(name) {
        var result = false;
        var len = this.error.length;
        for(var i=0;i<len;i++) {
            if(this.error[i]['element'] === name) {
                result = true;
                break;
            }
        }
        return result;
    }
    _getErrorMessage(name) {
        var result = '';
        var len = this.error.length;
        for(var i=0;i<len;i++) {
            if(this.error[i]['element'] === name) {
                result = this.error[i]['message'];
                break;
            }
        }
        return result;
    }
    _pushError(element,key,message) {
        if(this._isFound(element)) {
            this.error.push({element:key,message:element});
        } else {
            this.error.push({element:key,message:message});
        }
    }

    /**
     * Set Rules for validation
     * @param {object} rules
     * @return {this} 
     */
    rules(rules) {
        this.rules = rules;
        return this;
    }

    /**
     * Set element for single validation
     * @param {string} id       this is the element id
     * @return {this} 
     */
    element(id) {
        this.single = id;
        return this;
    }

    /**
     * Make validation
     * @param {fn} callback     [optional] Callback(error)
     * @return {this} 
     */
    validate(callback){
        // reset error
        this.error = [];
        for(var key in this.rules) {
            if(this._isNotEmpty(this.single)) key = this.single;
            if(this.rules.hasOwnProperty(key)) {
                // trim first
                if(!this._isFound(this.rules[key]['trim']) || this.rules[key]['trim']) {
                    var div = document.getElementById(key);
                    div.value = div.value.trim();
                }
                
                // required
                if(this._isFound(this.rules[key]['required']) && this.rules[key]['required']) {
                    if(document.getElementById(key).value.length === 0) {
                        this._pushError(this.rules[key]['message'],key,'This field is required!');
                    }
                }

                // minLength
                if(this._isFound(this.rules[key]['minLength']) && this.rules[key]['minLength']) {
                    var minchar = parseInt(this.rules[key]['minLength']);
                    if(document.getElementById(key).value.length < minchar) {
                        this._pushError(this.rules[key]['message'],key,'This field must be at least '+minchar+' characters long!');
                    }
                }

                // maxLength
                if(this._isFound(this.rules[key]['maxLength']) && this.rules[key]['maxLength']) {
                    var maxchar = parseInt(this.rules[key]['maxLength']);
                    if(document.getElementById(key).value.length > maxchar) {
                        this._pushError(this.rules[key]['message'],key,'This field must be not more than '+maxchar+' characters long!');
                    }
                }

                // method
                if(!this._isErrorExist(key)) {
                    if(document.getElementById(key).value.length > 0) {
                        if(this._isFound(this.rules[key]['method'])) {
                            var keyMethod = this.rules[key]['method'];
                            var fn;
    						if(typeof keyMethod === 'string') {
	    						fn = eval(keyMethod);
		    				} else {
			    				fn = keyMethod;
                            }
                            if(fn(document.getElementById(key)) === false) {
                                this._pushError(this.rules[key]['message'],key,'This format field is not valid!');
                            }
                        }
                    }
                }
                
                // regex
                if(!this._isErrorExist(key)) {
                    if(document.getElementById(key).value.length > 0) {
                        if(this._isFound(this.rules[key]['regex'])) {
                            if(this.rules[key]['regex'].test(document.getElementById(key).value) === false) {
                                this._pushError(this.rules[key]['message'],key,'This format field is not valid!');
                            }
                        }
                    }
                }

                // errorPlace
                if(this._isFound(this.rules[key]['errorPlace']) && this.rules[key]['errorPlace']) {
                    var div = document.getElementById(this.rules[key]['errorPlace']);
                    div.innerHTML = '';
                    div.style.visibility = "hidden";
                    if(this._isErrorExist(key)) {
                        div.innerHTML += this._getErrorMessage(key);
                        div.style.visibility = "visible";
                    }
                }

                // error Add Class
                if(this._isFound(this.rules[key]['errorAddClass'])) {
                    for(var el in this.rules[key]['errorAddClass']) {
                        if(this.rules[key]['errorAddClass'].hasOwnProperty(el)) {
                            var div = document.getElementById(el);
                            div.classList.remove(this.rules[key]['errorAddClass'][el]);
                            if(this._isErrorExist(key)) {
                                div.classList.add(this.rules[key]['errorAddClass'][el]);
                            }
                        }
                    }
                }
            }
            if(this._isNotEmpty(this.single)) {
                this.single = '';
                break;
            }
        }
        if(typeof callback === "function") {
            if( this.error.length > 0 ) {
                callback(this.error);
            } else {
                callback(null);
            }
        }
        return this;
    }

    /**
     * Determine validate is valid
     * @return {bool}
     */
    isValid() {
        if( this.error.length > 0 ) {
            return false;
        }
        return true;
    }

}