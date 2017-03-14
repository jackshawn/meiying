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
        areaList: ['中国', '香港(中国)', '美国', '韩国', '日本'],
        cityList: {
          '中国': ['上海', '北京', '南京'],
          '香港(中国)': ['香港'],
          '美国': ['纽约'],
          '韩国': ['首尔'],
          '日本': ['东京']
        },
        nodeList: {
          '上海': [
            {
              name: '上海01',
              delay: '111',
              state: '正常'
            },
            {
              name: '上海02',
              delay: '222',
              state: '超时'
            },
            {
              name: '上海03',
              delay: '1113',
              state: '正常'
            },
            {
              name: '上海04',
              delay: '1114',
              state: '正常'
            },
            {
              name: '上海05',
              delay: '1115',
              state: '正常'
            },
            {
              name: '上海06',
              delay: '1116',
              state: '正常'
            },
            {
              name: '上海07',
              delay: '1117',
              state: '正常'
            },
            {
              name: '上海08',
              delay: '1118',
              state: '正常'
            }
          ],
          '南京': [
            {
              name: '南京01',
              delay: '333',
              state: '正常'
            },
            {
              name: '南京02',
              delay: '444',
              state: '超时'
            }
          ],
          '香港': [
            {
              name: '香港01',
              delay: '555',
              state: '正常'
            },
            {
              name: '香港03',
              delay: '1555',
              state: '正常'
            },
            {
              name: '香港02',
              delay: '666',
              state: '超时'
            }
          ],
          '北京': [
            {
              name: '北京01',
              delay: '777',
              state: '正常'
            },
            {
              name: '北京02',
              delay: '888',
              state: '超时'
            }
          ],
          '纽约': [
            {
              name: '纽约01',
              delay: '777',
              state: '正常'
            },
            {
              name: '纽约02',
              delay: '888',
              state: '超时'
            }
          ],
          '首尔': [
            {
              name: '首尔01',
              delay: '777',
              state: '正常'
            },
            {
              name: '首尔02',
              delay: '888',
              state: '超时'
            }
          ],
          '东京': [
            {
              name: '东京01',
              delay: '777',
              state: '正常'
            },
            {
              name: '东京02',
              delay: '888',
              state: '超时'
            }
          ]
        },
        areaNodeList: {
          '中国': [
            {
              name: '上海01',
              delay: '111',
              state: '正常'
            },
            {
              name: '上海02',
              delay: '222',
              state: '超时'
            },
            {
              name: '上海03',
              delay: '1113',
              state: '正常'
            },
            {
              name: '上海04',
              delay: '1114',
              state: '正常'
            },
            {
              name: '上海05',
              delay: '1115',
              state: '正常'
            },
            {
              name: '上海06',
              delay: '1116',
              state: '正常'
            },
            {
              name: '上海07',
              delay: '1117',
              state: '正常'
            },
            {
              name: '上海08',
              delay: '1118',
              state: '正常'
            },
            {
              name: '南京01',
              delay: '333',
              state: '正常'
            },
            {
              name: '南京02',
              delay: '444',
              state: '超时'
            },
            {
              name: '北京01',
              delay: '777',
              state: '正常'
            },
            {
              name: '北京02',
              delay: '888',
              state: '超时'
            }
          ],
          '香港(中国)': [
            {
              name: '香港01',
              delay: '555',
              state: '正常'
            },
            {
              name: '香港03',
              delay: '1555',
              state: '正常'
            },
            {
              name: '香港02',
              delay: '666',
              state: '超时'
            }
          ],
          '美国': [
            {
              name: '纽约01',
              delay: '777',
              state: '正常'
            },
            {
              name: '纽约02',
              delay: '888',
              state: '超时'
            }
          ],
          '韩国': [
            {
              name: '首尔01',
              delay: '777',
              state: '正常'
            },
            {
              name: '首尔02',
              delay: '888',
              state: '超时'
            }
          ],
          '日本': [
            {
              name: '东京01',
              delay: '777',
              state: '正常'
            },
            {
              name: '东京02',
              delay: '888',
              state: '超时'
            }
          ]
        },
        inOutData: {
          nodeIn: [['', '智能选择', '香港1', '香港2']],
          nodeOut: [['', '智能选择', '香港3', '香港4']],
        }
      }
    },
    props: ['permission'],
    watch: {
      index: function () {
        this.curWay = ['nodeRandom', 'areaRandom', 'nodeSet'][this.index];
      }
    }
  }
</script>

