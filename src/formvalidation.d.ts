/*!
 * FormValidation ES6 v1.1.0
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
    validate(callback: Function): this;
    reset(): this;
}

