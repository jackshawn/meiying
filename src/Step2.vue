<template>
  <div>
    <head-steps :cur=1></head-steps>
    <br>
    <x-hr></x-hr>
    <tab-select></tab-select>
    <br>
  </div>
</template>
<script>
  import {XHr} from 'vux'
  import headSteps from './components/Steps'
  import tabSelect from './components/TabSelect.vue'
  
  export default {
    components: {
      XHr,
      headSteps,
      tabSelect
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>
<style scoped>
  .btn_wrap {
    padding: 0 1rem;
    margin-top: 2rem;
  }
</style>
<style>
  .padding5 {
    width: 95%;
    margin: 0 auto;
  }
  
  .x-btn {
    float: right;
  }
  
  .vux-timeline-item-checked {
    display: none !important;
  }
  
  .vux-timeline-item-head-first {
    width: 10px !important;
    height: 10px !important;
    left: 1px !important;
    top: 5px !important;
  }
</style>
