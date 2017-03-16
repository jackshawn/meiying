<template>
  <div>
    <group title="选择出入口" v-show="permission">
      <popup-picker title="选择入口" :data="inOutData.nodeIn" v-model="nodeInSelected"></popup-picker>
      <popup-picker title="选择出口" :data="inOutData.nodeOut" v-model="nodeOutSelected" ></popup-picker>
    </group>
    <divider v-show="jumpData.length">跳转详情</divider>
    <timeline>
      <timeline-item v-show="nodeInSelected[0]&&permission">
        <h4>入口：{{nodeInSelected[0]}}
          <x-button v-if="permission==2" mini class="x-btn" @click.native="deleteNode('in')">-</x-button>
        </h4>
      </timeline-item>
      <timeline-item v-for="(item,index) in jumpData">
        <h4>第{{index+1}}跳：{{item.name}}
          <x-button mini class="x-btn" @click.native="deleteNode(item.name)">-</x-button>
        </h4>
      </timeline-item>
      <timeline-item v-if="nodeOutSelected[0]&&permission">
        <h4>出口：{{nodeOutSelected[0]}}
          <x-button v-if="permission==2" mini class="x-btn" @click.native="deleteNode('out')">-</x-button>
        </h4>
      </timeline-item>
    </timeline>
    <div class="padding5">
        <x-button type="primary" @click.native="post">确定</x-button>
    </div>
    <br>
  </div>
</template>
<script>
  import { PopupPicker, Group,Timeline, TimelineItem, XButton,Divider} from 'vux'
  export default {
    components: {
       PopupPicker, Group,Timeline, TimelineItem, XButton,Divider
    },
    data () {
      return {
        nodeInSelected: [],
        nodeOutSelected: [],
      }
    },
    props:['inOutData','jumpData','permission'],
    methods: {
      deleteNode(item){
          switch(item){
            case 'in':
              this.nodeInSelected=[];
                  break;
            case 'out':
              this.nodeOutSelected=[];
                  break;
            case '随机':
              this.jumpData.pop();
              let l = this.jumpData.length;
              this.$emit('changeTimes',l);
                  break;
            default:
              this.$emit('deleteNode',item);
                break;
          }
      },
      post(){
          console.log(this.jumpData);
          setTimeout(function () {
            location.href='./#/login/step3'
          },1000)
      }
    }
  }
</script>

