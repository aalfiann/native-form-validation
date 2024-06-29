/*!
 * FormValidation ES6 v1.3.0
 * https://github.com/aalfiann/native-form-validation
 *
 * Copyright 2019 M ABD AZIZ ALFIAN
 * Released under the MIT license
 * https://github.com/aalfiann/native-form-validation/blob/master/LICENSE
 */
export = FormValidation;

declare class FormValidation {
    constructor();
    /**
     * Determine value is array
     * @param {*} value
     * @returns
     */
    _isArray(value: any): boolean;
    /**
     * Determine value is object
     * @param {*} value
     * @returns
     */
    _isObject(value: any): boolean;
    /**
     * Determine value is found
     * @param {*} value
     * @return {bool}
     */
    _isFound(value: any): boolean;
    /**
     * Determine value is found and not empty
     * @param {*} value
     * @return {bool}
     */
    _isNotEmpty(value: any): boolean;
    /**
     * Determine is error messages exists
     * @param {string} name     this is the element name
     * @return {bool}
     */
    _isErrorExist(name: string): boolean;
    /**
     * Delete error message
     * @param {string} elementName
     */
    _deleteError(elementName: string): void;
    /**
     * Get error message from list
     * @param {string} name     this is the element name
     * @return {string}
     */
    _getErrorMessage(name: string): string;
    /**
     * Push error message to list
     * @param {string} customMessage    this is the custom message value if any
     * @param {string} elementName      this is the element name
     * @param {string} defaultMessage   this is the default message if no any custom message
     */
    _pushError(customMessage: string, elementName: string, defaultMessage: string): void;
    /**
     * Set Rules for validation
     * @param {object} rules
     * @return {this}
     */
    rules(rules: object): this;
    /**
     * Add a rule
     * @param {string} id       this is the element id
     * @param {object} objRules this is the object rules per id
     * @return {this}
     */
    add(id: string, objRules: object): this;
    /**
     * Remove a rule
     * @param {string | string[]} id this is the element id
     * @return {this}
     */
    remove(id: string | string[]): this;
    /**
     * Set element for single validation
     * @param {string} id       this is the element id
     * @return {this}
     */
    element(id: string): this;
    /**
     * Determine validate is valid
     * @return {bool}
     */
    isValid(): boolean;
    /**
     * Make validation
     * @param {fn} callback     [optional] Callback(error)
     * @return {this}
     */
    validate(callback?: Function): this;
    /**
     * Set Custom Error Message for single element
     * @param {string} errMessage
     * @return {this}
     */
    setCustomError(errMessage: string): this;
    /**
     * Reset form validation
     * @return {this}
     */
    reset(): this;
}

