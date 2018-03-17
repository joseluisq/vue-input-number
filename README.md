# vue-input-number

> A custom input number component for [Vue.js 2](https://vuejs.org/).

## Install

[Yarn](https://yarnpkg.com/lang/en/)

```sh
yarn add vue-input-number --dev
```

[NPM](https://www.npmjs.com/)
```sh
npm install vue-input-number --save-dev
```

## Prerequisites

- [Vue.js 2](https://vuejs.org/)

## Usage

```html
<template>

    <input-number
        :step="1"
        :min="10"
        :max="100"
        :maxlength="3"
        @onInputNumberChange="onChange"></input-number>

</template>

<script>
  export default {
    methods: {
        onChange (value) {
            console.log(value)
        }
    }
  }
</script>
```

In your entry app:

```js
const Vue = require('vue')

Vue.component('vue-input-number', require('vue-input-number'))

const app = new Vue({
  el: '#app'
})
```

For more detailed example check out [the app directory](./app).

## Attributes

- __step:__ Step value for increment and decrement the input number value.
- __min:__ Minimum value for input number.
- __max:__ Maximum value for input number.
- __maxlength:__ Maxlength for the input number.
- __keydown:__ Enable keydown for increment or decrement value.
- __mousedown:__ Enable mousedown for increment or decrement value.
- __integer:__ Enable integer value only.
- __placeholder:__ Set a input placeholder.

## Events

#### @onInputNumberChange

Event is fired when value is changed.

## License
MIT license

© 2018 [José Luis Quintana](https://git.io/joseluisq)
