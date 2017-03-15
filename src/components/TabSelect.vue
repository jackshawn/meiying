<template>
  <div>
    <tab v-model="index" style="background: #fbf9fe">
      <tab-item selected>智能节点</tab-item>
      <tab-item>智能地域</tab-item>
      <tab-item>手工指定</tab-item>
    </tab>
    <div :is="curWay" :permission="permission" :areaList="areaList" :cityList="cityList" :nodeList="nodeList"
         :areaNodeList="areaNodeList" :inOutData="inOutData"></div>
  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux'
  import nodeRandom from './NodeRandom.vue'
  import areaRandom from './AreaRandom.vue'
  import nodeSet from './NodeSet.vue'
  
  export default {
    components: {
      Tab, TabItem, nodeRandom, areaRandom, nodeSet
    },
    data () {
      return {
        index: 0,
        curWay: 'nodeRandom',
        areaList: [],
        cityList: {},
        nodeList: {},
        areaNodeList: {},
        inOutData: {
          nodeIn: [['', '智能选择']],
          nodeOut: [['', '智能选择']],
        },
        permission: ''
      }
    },
    watch: {
      index: function () {
        this.curWay = ['nodeRandom', 'areaRandom', 'nodeSet'][this.index];
      }
    },
    created(){
      let index = location.href.indexOf('?user=') + 6,
          user  = location.href.substring(index),
          _this = this;
      console.log(user);
      setTimeout(function () {
        _this.ajax({
          url: '/getServers',
          data: user,
          cbfn: function (data) {
            if (data) {
              for (let i of data.list) {
                let cityNum  = i.city + i.line_index,
                    nodeInfo = {
                      name: cityNum,
                      delay: i.delay,
                      state: i.delay > 1000 ? '超时' : '正常'
                    };
                /*普通节点*/
                if (!i.limit) {
                  if (!_this.cityList[i.country]) {
                    _this.areaList.push(i.country);
                    _this.cityList[i.country] = [];
                    _this.areaNodeList[i.country] = [];
                  }
                  if (_this.cityList[i.country].indexOf(i.city) == -1) {
                    _this.cityList[i.country].push(i.city);
                    _this.nodeList[i.city] = []
                  }
                  _this.areaNodeList[i.country].push(nodeInfo);
                  _this.nodeList[i.city].push(nodeInfo)
                }
                /*入口*/
                if (i.limit == 1) {
                  _this.inOutData.nodeIn[0].push(cityNum)
                }
                /*出口*/
                if (i.limit == 2) {
                  _this.inOutData.nodeOut[0].push(cityNum)
                }
              }
              console.log(_this.areaList);
              console.log(_this.inOutData);
              /*中级用户删除出入口的空选项*/
              if (data.userType == 1) {
                _this.inOutData.nodeIn[0].shift();
                _this.inOutData.nodeOut[0].shift()
              }
              _this.permission = data.userType;
            }
          }
        })
      })
    }
  }
</script>

