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
    <group title="节点列表">
      <scroller lock-x scrollbar-y style="max-height: 320px" v-if="showScroll">
        <div>
          <cell v-for="item in areaNodeList[areaSelected]" :title="item.name+',延迟:'+item.delay+'ms,状态:'+item.state">
            <x-button :disabled="item.used" mini @click.native="addNode(item.name,index)">+</x-button>
          </cell>
        </div>
      </scroller>
      <div v-if="!showScroll">
        <cell v-for="(item,index) in areaNodeList[areaSelected]" :title="item.name+',延迟:'+item.delay+'ms,状态:'+item.state">
          <x-button :disabled="item.used" mini @click.native="addNode(item.name,index)">+</x-button>
        </cell>
      </div>
    </group>
    <IOandJump :inOutData="inOutData" :jumpData="jumpData" :permission="permission" @deleteNode="delNode"></IOandJump>
    <alert v-model="msgShow">{{msgText}}</alert>
  </div>
</template>
<script>
  import {Checker, CheckerItem, Divider, Cell, Group, XButton, Alert, Scroller} from 'vux'
  import IOandJump from './IOandJump'
  export default {
    components: {Checker, CheckerItem, Divider, Cell, Group, XButton, Alert, Scroller, IOandJump},
    data () {
      return {
        msgShow: false,
        areaSelected: '',
        totalNum: 0,
        msgText: '',
        showScroll: false,
        jumpData: []
      }
    },
    props: ['permission', 'areaList', 'areaNodeList', 'inOutData'],
    methods: {
      addNode(city,index){
        if (this.totalNum < 3) {
          this.jumpData.push({name: city});
          this.totalNum++;
          this.areaNodeList[this.areaSelected][index].used = true;
        } else {
          this.msgText = '最多共可以添加3个节点';
          this.msgShow = true
        }
      },
      delNode(city){
        this.totalNum--;
        this.jumpData = this.jumpData.remove({name: city});
        for (let i = 0; i < this.areaNodeList[this.areaSelected].length; i++) {
          if (this.areaNodeList[this.areaSelected][i].name == city) {
            this.areaNodeList[this.areaSelected][i].used = false;
            break
          }
        }
      },
    },
    
    watch: {
      areaSelected() {
        let _this = this;
        this.showScroll = (this.areaSelected && this.areaNodeList[_this.areaSelected].length > 7);
      }
    },
    beforeMount(){
      this.areaSelected = this.areaList[0];
    },
    computed: {
      areaWidth() {
        return (this.areaList.length + 1) * 110;
      }
    }
  }
</script>
