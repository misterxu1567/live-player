<template>
  <input
    class="volumeSlider vertical"
    :class="[type]"
    type="range"
    :max="max"
    :min="min"
    :value="value"
    :style="{background: `linear-gradient(to right, #22d6af 0%, #22d6af ${value * 100 / max}%, #fff ${value * 100 / max}%, #fff)`}"
    @input="handleChange($event)"
  />
</template>

<script>
export default {
  name: "",
  props: {
    max: {
      type: Number,
      required: false,
      default: 100
    },
    min: {
      type: Number,
      required: false,
      default: 0
    },
    value: {
      type: Number,
      required: false,
      default: 0
    },
    // horizontal => 水平的
    type: {
      type: String,
      required: false,
      default: 'vertical'
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
    };
  },
  mounted() {
    console.log(this.value)
  },
  methods: {
    handleChange(e){
      this.$emit('input', parseInt(e.target.value));
    }
  }
};
</script>

<style scoped lang="less">
.volumeSlider {
  position: absolute;
  left: -100%;
  top: -56px;
  z-index: 9999;
  transform: rotate(-90deg);
  &.horizontal{
    transform: rotate(0);
  }
  /*横条样式*/
  &[type="range"] {
    -webkit-appearance: none;
    width: 100px;
    height: 2px;
  }
  /*拖动块的样式*/
  &[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 8px;
    width: 8px;
    background: #fff;
    margin-top: -1px;
    border-radius: 50%;
  }
}
</style>
