<template>
  <div>

    <h3>Input Number</h3>

    <strong>Options:</strong>

    <div v-for="opt in getOptions()" :key="opt">
      <span style="display:inline-block; width: 100px; text-align:right;">
        {{ opt }}:</span> <input type="input" v-model.number="options[opt]">
    </div>

    <p>
      <strong>Try:</strong> <br>
      <input-number
        :step="options.step"
        :min="options.min"
        :max="options.max"
        :maxlength="options.maxlength"
        :placeholder="options.placeholder"
        :class="options.inputclass"
        @onInputNumberChange="inputChange"></input-number>
    </p>

    <strong>Value:</strong> <span>{{ inputValue }}</span>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

interface Options {
  step: number,
  min: number,
  max: number,
  maxlength: number,
  placeholder: String,
  inputclass: String
}

@Component
export default class App extends Vue {
  options: Options = {
    step: 1,
    min: 1,
    max: 100,
    maxlength: 3,
    placeholder: 'Enter a number',
    inputclass: 'v-input-number-input'
  }

  inputValue: number = 1

  getOptions () {
    return Object.keys(this.options)
  }

  inputChange (val: number) {
    this.inputValue = val
  }
}
</script>

<style>
.v-input-number {
  position: relative;
  display: block;
  overflow: hidden;
  width: 175px;
}
.v-input-number * {
  box-sizing: border-box;
}
.v-input-number-arrows {
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
}
.v-input-number-arrows > a {
  position: absolute;
  top: 0;
  right: 2px;
  background-color: #ccc;
  border: 0;
  width: 28px;
  height: 15px;
  line-height: 1;
  text-align: center;
  cursor: pointer;
}
.v-input-number-arrows > a.v-input-number-up {
  top: 2px;
}
.v-input-number-arrows > a.v-input-number-down {
  top: 18px;
}
.v-input-number-arrows > a > i {
  display: inline-block;
  height: 0;
  text-indent: -999em;
  content: "";
  overflow: hidden;
  position: relative;
  vertical-align: baseline;
  width: 0;
  border: 4px solid transparent;
}
.v-input-number-arrows > a.v-input-number-up > i {
  top: -3px;
  border: 4px solid transparent;
  border-bottom-color: #333;
}
.v-input-number-arrows > a.v-input-number-down > i {
  border-top-color: #333;
}
.v-input-number-input {
  display: block;
  padding: 5px 25px 5px 0;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid #bbb;
  text-align: center;
  width: 100%;
  height: 35px;
  text-align: center;
}
</style>