<template>
  <div>
    <divider>选择地区</divider>
    <div class="padding5">
      <scroller lock-y scrollbar-x>
        <div class="area-box" :style="{width:areaWidth+'px'}">
          <checker v-model="areaSelected" default-item-class="area-item" selected-item-class="area-item-selected">
            <checker-item v-for="area in areaList" :value="area">{{area}}</checker-item>
          </checker>
        </div>
      </scroller>
    </div>
    <p style="display: none">{{totalNum}}</p>
    <group title="城市列表">
      <cell v-for="city in cityList[areaSelected]" :title="city+'('+ nodeNum[city].cur+'/'+nodeNum[city].total+')'"
            @click.native="showList(city)">
        <x-button mini @click.native.stop="addNode(city)">+</x-button>
      </cell>
    </group>
    <group :title="citySelected+'节点列表'" v-if="showScroll">
      <scroller lock-x scrollbar-y style="max-height: 130px">
        <div>
          <cell v-for="node in nodeList[citySelected]" :title="node.name+',延迟:'+node.delay+'ms,状态:'+node.state"></cell>
        </div>
      </scroller>
    </group>
    <IOandJump :inOutData="inOutData" :jumpData="jumpData" :permission="permission"
                   @deleteNode="delNode"></IOandJump>
    <alert v-model="showMsg"> {{msgText}}</alert>
  </div>
</template>

<script>
  import {
     Checker, CheckerItem, Divider, Cell, Group, XButton, Alert, Scroller
  } from 'vux'
  import IOandJump from './IOandJump'
  export default {
    components: {
      Checker,
      CheckerItem,
      Divider,
      Cell,
      Group,
      XButton,
      Alert,
      IOandJump,
      Scroller
    },
    data () {
      return {
        areaSelected: '',
        citySelected: '',
        showMsg: false,
        msgText: '',
        totalNum: 0,
        showScroll: false,
        jumpData: []
      }
    },
    props: ['permission','areaList','cityList','nodeList','inOutData'],
    methods: {
      addNode(city){
        if (this.nodeNum[city].cur) {
          /*总共可添加的节点数*/
          if (this.totalNum < 3) {
            this.jumpData.push({name: city});
            this.nodeNum[city].cur--;
            this.totalNum++;
          } else {
            this.msgText = '最多共可以添加3个节点';
            this.showMsg = true
          }
        } else {
          this.msgText = this.citySelected + '已经没有节点可用';
          this.showMsg = true
        }
      },
      showList(city){
        if (city != this.citySelected) {
          this.citySelected = city;
          this.showScroll = false
          let _this = this;
          setTimeout(function () {
            _this.showScroll = true
          })
        } else {
          this.showScroll = false;
          this.citySelected = '';
        }
      },
      delNode(city){
        this.totalNum--;
        this.jumpData = this.jumpData.remove({name: city});
        this.nodeNum[city].cur++;
      }
      
    },
    beforeMount(){
      this.areaSelected = this.areaList[0];
    },
    computed: {
      nodeNum(){
        let obj = {};
        for (let key of Object.keys(this.nodeList)) {
          obj[key] = {};
          obj[key].cur = this.nodeList[key].length;
          obj[key].total = this.nodeList[key].length;
        }
        return obj;
      },
      areaWidth() {
        return (this.areaList.length + 1) * 110;
      }
    }
    
  }
</script>
<style>
  .area-box {
    height: 65px;
    position: relative;
  }
  
  .area-item {
    border: 1px solid #ccc;
    min-width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-left: 5px;
  }
  
  .area-item:first-child {
    margin-left: 0;
  }
  
  .area-item-selected {
    border: 2px solid #04be02;
  }
</style>
