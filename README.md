# Native Form Validation
[![NPM](https://nodei.co/npm/native-form-validation.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/native-form-validation/)

[![npm version](https://img.shields.io/npm/v/native-form-validation.svg?style=flat-square)](https://www.npmjs.org/package/native-form-validation)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/aalfiann/native-form-validation/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/aalfiann/native-form-validation/tree/master)
[![Known Vulnerabilities](https://snyk.io//test/github/aalfiann/native-form-validation/badge.svg?targetFile=package.json)](https://snyk.io//test/github/aalfiann/native-form-validation?targetFile=package.json)
![License](https://img.shields.io/npm/l/native-form-validation)
![NPM download/month](https://img.shields.io/npm/dm/native-form-validation.svg)
![NPM download total](https://img.shields.io/npm/dt/native-form-validation.svg)
[![](https://data.jsdelivr.com/v1/package/npm/native-form-validation/badge)](https://www.jsdelivr.com/package/npm/native-form-validation)

Native JavaScript Form Validation for Browser / UI Framework.

### Background
There is a lot of `Form Validation`, but most of them was created for `jQuery` and too bloated. This is an `native` javascript form validation which is can be use for all kind of javascript UI framework.

### Install using NPM
```bash
$ npm install native-form-validation

// load using require in nodejs
const FormValidation = require('native-form-validation');

// or load using import in typescript
import FormValidation from 'native-form-validation';

// or load use with path for client side
<script src="node_modules/native-form-validation/dist/formvalidation.min.js"></script>
```

**Or simply use with CDN**
```html
<!-- Always get the latest version -->
<!-- Not recommended for production sites! -->
<script src="https://cdn.jsdelivr.net/npm/native-form-validation/dist/formvalidation.min.js"></script>

<!-- Get minor updates and patch fixes within a major version -->
<script src="https://cdn.jsdelivr.net/npm/native-form-validation@1/dist/formvalidation.min.js"></script>

<!-- Get patch fixes within a minor version -->
<script src="https://cdn.jsdelivr.net/npm/native-form-validation@1.4/dist/formvalidation.min.js"></script>

<!-- Get a specific version -->
<!-- Recommended for production sites! -->
<script src="https://cdn.jsdelivr.net/npm/native-form-validation@1.4.0/dist/formvalidation.min.js"></script>
```

### Usage
```javascript
var FV = new FormValidation();

// Create the rules
FV.rules({
    username: {
        required: true,
        message: 'Username must be min 3-20 chars!',
        minLength:3,
        maxLength:20,
        regex: /^[a-zA-Z0-9]/,
        errorPlace:'username-error',
        errorAddClass: {
            username_group:'has-danger',
            username:'is-invalid'
        }
    },
    email: {
        regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        errorPlace:'email-error',
        errorAddClass: {
            email_group:'has-danger',
            email:'is-invalid'
        }
    }
});

// Validate all
FV.validate();

// Determine is Valid all
if(FV.isValid()) {
    // run your code
}

// Validate per element
FV.element('username').validate();

// Determine is Valid per element
if(FV.element('username').isValid()) {
    // run your code
}
```

### Documentation
Please see our Wiki at [here](https://github.com/aalfiann/native-form-validation/wiki).
