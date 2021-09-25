<template>
  <button :disabled="buttonDisabled || loading" :autofocus="autofocus" :type="nativeType" :delayed="delayed" :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]" class="el-button" @click="handleClick">
    <i v-if="loading" class="el-icon-loading" />
    <i v-if="icon && !loading" :class="icon" />
    <span v-if="$slots.default">
      <slot/>
    </span>
  </button>
</template>
<script>
export default {
  name: 'ElButton',

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },
    functions: {
      type: Function,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: null
    },
    // disabled: {
    //   type: Boolean,
    //   default: null
    // },
    plain: {
      type: Boolean,
      default: null
    },
    autofocus: {
      type: Boolean,
      default: null
    },
    round: {
      type: Boolean,
      default: null
    },
    delayed: {
      type: Number,
      default: 1000
    },
    circle: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      disabled: null,
      timer:null
    }
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    buttonDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    }
  },
  methods: {
    handleClick(evt) {
      this.disabled = true
      if(this.timer !== null){
        return
      }
      this.functions().then(
        value => {
          this.timer =  setTimeout(() => {
            this.disabled = false          
            clearTimeout(this.timer)
            this.timer = null
          }, this.delayed)
        },
        err => {
          this.disabled = false
          console.log(err)
        }
      )
    }
  }
}
</script>
