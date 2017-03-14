<template>
  <div>
    <checker v-model="permission" default-item-class="area-item" selected-item-class="area-item-selected">
      <checker-item :value=0>初级用户</checker-item>
      <checker-item :value=1>中级用户</checker-item>
      <checker-item :value=2>高级用户</checker-item>
    </checker>
    <head-steps :cur=1></head-steps>
    <br>
    <x-hr></x-hr>
    <tab-select :permission="permission"></tab-select>
    <br>
  </div>
</template>
<script>
  import {XHr, Checker, CheckerItem} from 'vux'
  import headSteps from './components/Steps'
  import tabSelect from './components/TabSelect.vue'
  
  export default {
    components: {
      XHr,
      headSteps,
      tabSelect, Checker, CheckerItem
    },
    data () {
      return {
        permission: 0
      }
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
