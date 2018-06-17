<template>
  <div class="v-input-number">
    <div class="v-input-number-arrows">
      <a class="v-input-number-up"
        @click.prevent="onClick($event, 'up')"
        @mouseup="onMouseup"
        @mousedown="onMousedown($event, 'up')"
        > <i class="v-input-number-icon"></i> </a>

      <a class="v-input-number-down"
        @click.prevent="onClick($event, 'down')"
        @mouseup="onMouseup"
        @mousedown="onMousedown($event, 'down')"
        > <i class="v-input-number-icon"></i> </a>
    </div>

    <input type="text" 
      :maxlength="maxlength" 
      autocomplete="off"
      :placeholder="placeholder"
      :class="inputclass"
      v-model.number="quantity"
      @keyup="onKeyup($event)"
      @keydown="onKeydown($event)"
      @blur="onBlur"
      >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    integer: {
      type: Boolean,
      default: false
    },
    mousedown: {
      type: Boolean,
      default: false
    },
    keydown: {
      type: Boolean,
      default: true
    },
    maxlength: {
      type: Number,
      default: 4
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputclass: {
      type: String,
      default: 'v-input-number-input'
    }
  },

  data () {
    return {
      clicked: false,
      interval: 0,
      timeout: 0,
      quantity: this.init,
      oldValue: this.init,
      isKeydown: false
    }
  },

  watch: {
    placeholder: function () {
      this.quantity = !this.placeholder ? this.min : null
    },
    quantity: function () {
      this.evaluateQuantity()
    },
    min: function (val) {
      if (this.quantity < val) {
        this.quantity = val
      }
    },
    max: function (val) {
      this.quantity = this.quantity > val ? val : this.min
    }
  },

  mounted () {
    this.emitChange(true)
  },

  methods: {
    reset () {
      this.quantity = this.init
    },

    emitChange (init = false) {
      this.oldValue = this.quantity

      if (init && !this.placeholder) {
        this.quantity = (this.value < this.min) ? this.min : this.value
      }

      this.$emit('onInputNumberChange', this.quantity, init)
    },

    increment () {
      if (!this.quantity) {
        this.quantity = this.min
      } else {
        this.quantity = this.quantity < this.max
          ? this.quantity + this.step
          : this.max
      }
    },

    decrement () {
      if (!this.quantity) {
        this.quantity = this.min
      } else {
        this.quantity = this.quantity > this.min
          ? this.quantity - this.step
          : this.min
      }
    },

    onBlur () {
      if (this.placeholder && !this.quantity) {
        return
      }

      if (this.quantity.toString().length === 0) {
        this.quantity = this.oldValue
        return
      }

      if (this.quantity < this.min) {
        this.quantity = this.min
      }

      if (this.quantity > this.max) {
        this.quantity = this.max
      }
    },

    onClick (e, dir) {
      this.clicked = true
      if (dir === 'up') this.increment()
      if (dir === 'down') this.decrement()
      this.onMouseup()
    },

    evaluateQuantity () {
      if (this.isKeydown) return

      if (
        !this.placeholder &&
        this.quantity.toString().length > 0 &&
        this.quantity !== this.oldValue
      ) {
        this.emitChange()
      }
    },

    onMouseup (e) {
      if (!this.mousedown) return

      this.clicked = false
      clearTimeout(this.timeout)
      clearInterval(this.interval)
    },

    onMousedown (e, dir) {
      if (!this.mousedown) return

      this.clicked = false
      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        clearInterval(this.interval)

        this.interval = setInterval(() => {
          if (this.clicked) {
            this.clicked = false
            clearInterval(this.interval)
            clearTimeout(this.timeout)
            return
          }

          if (dir === 'up') this.increment()
          if (dir === 'down') this.decrement()
        }, 30)
      }, 400)
    },

    onKeyup (e) {
      this.isKeydown = false
      this.evaluateQuantity()
    },

    onKeydown (e) {
      this.isKeydown = true

      if (!this.keydown) {
        e.preventDefault()
        return
      }

      // Up key: Increase the value
      if (e.keyCode === 38) {
        this.increment()
        e.preventDefault()
        return
      }

      // Down key: Decrease the value
      if (e.keyCode === 40) {
        this.decrement()
        e.preventDefault()
        return
      }

      // Allow dot key for decimals:
      if (e.keyCode === 110 || e.keyCode === 190) {
        if (this.integer) {
          e.preventDefault()
          return
        }
      }

      // Allow these keys only:
      if (
        // backspace, delete, tab, escape, enter, dot
        [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) >= 0 ||
        // Ctrl/cmd+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Ctrl/cmd+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Ctrl/cmd+R
        (e.keyCode === 82 && (e.ctrlKey || e.metaKey)) ||
        // Ctrl/cmd+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        return
      }

      if (
        (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault()
      }
    }
  }
}
</script>
