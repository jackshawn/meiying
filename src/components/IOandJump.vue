<template>
    <div>
        <group title="选择出入口" v-show="permission">
            <popup-picker title="选择入口" :data="inOutData.nodeIn" v-model="nodeInSelected"></popup-picker>
            <popup-picker title="选择出口" :data="inOutData.nodeOut" v-model="nodeOutSelected"></popup-picker>
        </group>
        <divider v-show="jumpData.length||nodeInSelected[0]">跳转详情</divider>
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
            <x-button type="primary" @click.native="post" :showLoading="btnWait">确定</x-button>
        </div>
        <Toast v-model="showMsg" type="text" :time="1000"> {{msgText}}</Toast>
        <br>
    </div>
</template>
<script>
    import {PopupPicker, Group, Timeline, TimelineItem, XButton, Divider, Toast} from 'vux'
    export default {
        components: {
            PopupPicker, Group, Timeline, TimelineItem, XButton, Divider, Toast
        },
        data(){
            return {
                nodeInSelected: [''],
                nodeOutSelected: [''],
                showMsg: false,
                msgText: '',
                btnWait: false
            }
        },
        props: ['inOutData', 'jumpData', 'permission'],
        methods: {
            deleteNode(item){
                switch (item) {
                    case 'in':
                        this.nodeInSelected = [];
                        break;
                    case 'out':
                        this.nodeOutSelected = [];
                        break;
                    case '随机':
                        this.jumpData.pop();
                        let l = this.jumpData.length;
                        this.$emit('changeTimes', l);
                        break;
                    default:
                        this.$emit('deleteNode', item);
                        break;
                }
            },
            post(){
                let _this = this,
                    user = (function () {
                        let index = location.href.indexOf('?user=') + 6;
                        return location.href.substring(index);
                    })(),
                    postData = (function () {
                        let obj = {};
                        obj['in'] = _this.nodeInSelected[0];
                        obj.first = _this.jumpData[0] ? _this.jumpData[0].name : '';
                        obj.second = _this.jumpData[1] ? _this.jumpData[1].name : '';
                        obj.third = _this.jumpData[2] ? _this.jumpData[2].name : '';
                        obj['out'] = _this.nodeOutSelected[0];
                        return obj;
                    })(),
                    postFn = function () {
                        _this.btnWait = true;
                        _this.ajax({
                            url: '/createLink',
                            data: postData,
                            cbfn: function (data) {
                                if (data && data.result == 'SUCCESS') {
                                    _this.showMsg = false;
                                    location.href = './#/login/step3?user=' + user;
                                } else {
                                    _this.btnWait = false;
                                    _this.showMsg = true;
                                    _this.msgText = '创建链路失败';
                                }
                            }
                        })
                    };
                //初级用户
                if (this.permission == 0) {
                    if (this.jumpData.length > 0) {
                        postFn();
                    } else {
                        this.showMsg = true;
                        this.msgText = '未选择节点';
                    }
                }
                //中级用户
                if (this.permission == 1) {
                    if(this.nodeInSelected[0] && this.nodeOutSelected[0]){
                        postFn();
                    }else{
                        this.showMsg = true;
                        this.msgText = '中级用户出口与入口为必选';
                    }
                }
                //高级用户
                if (this.permission == 2) {
                    if (this.jumpData.length > 0) {
                        postFn();
                    } else {
                        if (this.nodeInSelected[0] && this.nodeOutSelected[0]) {
                            postFn();
                        } else {
                            this.showMsg = true;
                            if (!this.nodeInSelected[0] && !this.nodeOutSelected[0]) {
                                this.msgText = '未选择节点';
                            } else {
                                this.msgText = '不能仅选择入口或出口';
                            }
                        }
                    }
                }
            }
        }
    }
</script>

