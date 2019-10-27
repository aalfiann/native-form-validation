# Native Form Validation
[![NPM](https://nodei.co/npm/native-form-validation.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/native-form-validation/)  
  
[![npm version](https://img.shields.io/npm/v/native-form-validation.svg?style=flat-square)](https://www.npmjs.org/package/native-form-validation)
![License](https://img.shields.io/npm/l/fly-json-odm)
![NPM download/month](https://img.shields.io/npm/dm/fly-json-odm.svg)
![NPM download total](https://img.shields.io/npm/dt/fly-json-odm.svg)

Universal JavaScript Form Validation for Browser.

### Background
There is a lot of `Form Validation`, but mostly of them was created for `jQuery` and too bloated. This is an `universal` javascript form validation which is can be use for all kind of javascript UI framework.

### Install using NPM
```bash
$ npm install native-form-validation
```

**Or simply use with CDN**
```html
<script src="https://cdn.jsdelivr.net/npm/native-form-validation@1.0.0/dist/formvalidation.min.js"></script>
```

### Usage
```javascript
var FV = new FormValidation();

// Set the rules
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

// Validate
FV.validate();

// is Valid
if(FV.isValid()) {
    // run your code
}
```

### Documentation
Please see our Wiki at [here](https://github.com/aalfiann/native-form-validation/wiki).