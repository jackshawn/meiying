<template>
  <div>
    <divider>选择几跳</divider>
    <div class="padding5" style="text-align: center">
      <checker v-model="jumpTimes" default-item-class="checker-item" selected-item-class="checker-item-selected">
        <checker-item :value=1>1跳</checker-item>
        <checker-item :value=2>2跳</checker-item>
        <checker-item :value=3>3跳</checker-item>
      </checker>
    </div>
    <IOandJump :inOutData="inOutData" :jumpData="jumpData" :permission="permission" v-on:changeTimes="changeTimes"></IOandJump>
  </div>
</template>
<script>
  import { Checker, CheckerItem, Divider} from 'vux'
  import IOandJump from './IOandJump'
  export default {
    components: {
       Checker, CheckerItem, Divider, IOandJump
    },
    data () {
      return {
        jumpTimes: '',
        jumpData: []
      }
    },
    props: ['permission','inOutData'],
    methods: {
      changeTimes(t){
          this.jumpTimes = t*1;
      }
    },
    watch:{
      jumpTimes:function () {
        this.jumpData = new Array(this.jumpTimes*1).fill({name: '随机'});
      },
      permission:function (val) {
        if(val==1){
            this.inOutData = {
              nodeIn: [['智能选择', '香港1', '香港2']],
              nodeOut: [[ '智能选择', '香港3', '香港4']],
            }
        }else{
          this.inOutData = {
            nodeIn: [['', '智能选择', '香港1', '香港2']],
            nodeOut: [['', '智能选择', '香港3', '香港4']],
          }
        }
      }
    }
    
  }
</script>
<style scoped>
  .checker-item {
    border: 1px solid #ccc;
    padding: 5px 15px;
    margin: 3px;
  }
  
  .checker-item-selected {
    border: 2px solid #04be02;
  }
</style>
