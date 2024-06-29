/* global describe it */

'use strict';

const assert = require('assert');
const FormValidation = require('../src/formvalidation.js');

describe('validation function test', () => {
  it('is array', () => {
    const form = new FormValidation();
    assert.deepEqual(form._isArray(['abc']), true);
    assert.deepEqual(form._isArray([]), true);
    assert.deepEqual(form._isArray('abc'), false);
    assert.deepEqual(form._isArray(), false);
    assert.deepEqual(form._isArray({}), false);
  });

  it('is object', () => {
    const form = new FormValidation();
    assert.deepEqual(form._isObject({}), true);
    assert.deepEqual(form._isObject([]), false);
    assert.deepEqual(form._isObject(undefined), false);
    assert.deepEqual(form._isObject(null), false);
    assert.deepEqual(form._isObject(42), false);
    assert.deepEqual(form._isObject('Hello'), false);
    assert.deepEqual(form._isObject(new Date()), false);
    assert.deepEqual(form._isObject(function () { }), false);
  });

  it('is found', () => {
    const form = new FormValidation();
    assert.deepEqual(form._isFound(['abc']), true);
    assert.deepEqual(form._isFound([]), true);
    assert.deepEqual(form._isFound('abc'), true);
    assert.deepEqual(form._isFound(), false);
    assert.deepEqual(form._isFound(null), false);
  });

  it('is not empty', () => {
    const form = new FormValidation();
    assert.deepEqual(form._isNotEmpty(['abc']), true);
    assert.deepEqual(form._isNotEmpty([]), true);
    assert.deepEqual(form._isNotEmpty('abc'), true);
    assert.deepEqual(form._isNotEmpty(), false);
    assert.deepEqual(form._isNotEmpty(null), false);
  });

  it('rules', () => {
    const form = new FormValidation();
    form.rules({
      username: {
        required: true,
        message: 'Username must be min 3-20 chars!',
        minLength: 3,
        maxLength: 20,
        errorPlace: 'username-error',
        errorAddClass: {
          username_group: 'has-danger',
          username: 'is-invalid'
        }
      }
    });
    assert.deepStrictEqual(form.rules.username.required, true);
  });

  it('element', () => {
    const form = new FormValidation();
    form.element('tester');
    assert.deepStrictEqual(form.single, 'tester');
  });

  it('when no rules, then default is valid', () => {
    const form = new FormValidation();
    assert.deepStrictEqual(form.isValid(), true);
  });

  it('push, get and determine error message', () => {
    const form = new FormValidation();
    form._pushError('This field is required!', 'username', 'Field is required!');
    form._pushError(null, 'password', 'Field is required!');
    const isError = form._isErrorExist('password');
    const errMsg = form._getErrorMessage('password');
    assert.deepEqual(isError, true);
    assert.deepEqual(errMsg, 'Field is required!');
    assert.deepStrictEqual(form.error.length, 2);
    assert.deepStrictEqual(form.error[0].message, 'This field is required!');
    assert.deepStrictEqual(form.error[1].message, 'Field is required!');
  });

  it('push error, delete it and then show error list', () => {
    const form = new FormValidation();
    form._pushError(null, 'username', 'Field username is required!');
    form._pushError(null, 'username', 'Field username is required!');
    form._pushError(null, 'password', 'Field password is required!');
    form._pushError(null, 'confirm-password', 'Field confirm-password is required!');
    assert.deepStrictEqual(form.error[1].element, 'username');
    assert.deepStrictEqual(form.error.length, 4);
    form._deleteError('username');
    assert.deepStrictEqual(form.error[1].element, 'confirm-password');
    assert.deepStrictEqual(form.error.length, 2);
  });

  it('add a rule', () => {
    const form = new FormValidation();
    form.rules({
      username: {
        required: true,
        message: 'Username must be min 3-20 chars!',
        minLength: 3,
        maxLength: 20,
        errorPlace: 'username-error',
        errorAddClass: {
          username_group: 'has-danger',
          username: 'is-invalid'
        }
      }
    });
    assert.deepStrictEqual(form.rules.username.required, true);
    form.add('address', {
      required: true,
      message: 'Address must be min 10 chars!',
      minLength: 10,
      errorPlace: 'address-error',
      errorAddClass: {
        address_group: 'has-danger',
        address: 'is-invalid'
      }
    });
    assert.deepStrictEqual(form.rules.address.required, true);
  });

  it('remove single or many rules', () => {
    const form = new FormValidation();
    form.rules({
      username: {
        required: true,
        message: 'Username must be min 3-20 chars!',
        minLength: 3,
        maxLength: 20,
        errorPlace: 'username-error',
        errorAddClass: {
          username_group: 'has-danger',
          username: 'is-invalid'
        }
      },
      address: {
        required: true,
        message: 'Address must be min 10 chars!',
        minLength: 10,
        errorPlace: 'address-error',
        errorAddClass: {
          address_group: 'has-danger',
          address: 'is-invalid'
        }
      },
      email: {
        required: true,
        message: 'Email must be valid!',
        errorPlace: 'email-error',
        errorAddClass: {
          email_group: 'has-danger',
          email: 'is-invalid'
        }
      }
    });
    form.remove('username');
    assert.deepStrictEqual(form.rules.username, undefined);
    assert.deepStrictEqual(form.rules.address.required, true);

    form.add('username', {
      required: true,
      message: 'Username must be min 3-20 chars!',
      minLength: 3,
      maxLength: 20,
      errorPlace: 'username-error',
      errorAddClass: {
        username_group: 'has-danger',
        username: 'is-invalid'
      }
    });

    assert.deepStrictEqual(form.rules.username.required, true);
    assert.deepStrictEqual(form.rules.email.required, true);
    assert.deepStrictEqual(form.rules.address.required, true);

    form.remove(['email', 'address']);
    assert.deepStrictEqual(form.rules.username.required, true);
    assert.deepStrictEqual(form.rules.email, undefined);
    assert.deepStrictEqual(form.rules.address, undefined);
  });

  it('remove a rule with a wrong id, will skip it', () => {
    const form = new FormValidation();
    form.rules({
      username: {
        required: true,
        message: 'Username must be min 3-20 chars!',
        minLength: 3,
        maxLength: 20,
        errorPlace: 'username-error',
        errorAddClass: {
          username_group: 'has-danger',
          username: 'is-invalid'
        }
      }
    });
    form.remove('tester');
    assert.deepStrictEqual(form.rules.username.required, true);
  });

  it('add a rule without set rules at first is ok', () => {
    const form = new FormValidation();
    form.add('username', {
      required: true,
      message: 'Username must be min 3-20 chars!',
      minLength: 3,
      maxLength: 20,
      errorPlace: 'username-error',
      errorAddClass: {
        username_group: 'has-danger',
        username: 'is-invalid'
      }
    }).add('address', {
      required: true,
      message: 'Address must be min 10 chars!',
      minLength: 10,
      errorPlace: 'address-error',
      errorAddClass: {
        address_group: 'has-danger',
        address: 'is-invalid'
      }
    });
    assert.deepStrictEqual(form.rules.username.required, true);
    assert.deepStrictEqual(form.rules.address.required, true);
    assert.deepStrictEqual(form._isObject(form.rules), true);
  });
});
