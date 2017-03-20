<template>
    <div>
        <br>
        <divider>修改密码:{{username}}</divider>
        <group title="">
            <x-input title="原始密码" type="password" placeholder="password" v-model="password"></x-input>
        </group>
        <group title="">
            <x-input title="新密码" type="password" placeholder="new password" v-model="newPwd"></x-input>
        </group>
        <group title="">
            <x-input title="确认新密码" type="password" placeholder="new password again" v-model="newPwdAgain"></x-input>
        </group>
        <br>
        <br>
        <div class="padding5">
            <x-button type="primary" :showLoading="btnWait" @click.native="changePwd">确定</x-button>
        </div>
        <Toast v-model="showMsg" type="text" :time="1000"> {{msgText}}</Toast>
    </div>
</template>

<script>
    import {XButton, XInput, Group, Divider, Toast} from 'vux'
    export default {
        components: {
            XButton, XInput, Group, Divider, Toast
        },
        data(){
            return {
                username: '',
                password: '',
                newPwd: '',
                newPwdAgain: '',
                btnWait: false,
                msgText: '',
                showMsg: false
            }
        },
        methods: {
            changePwd(){
                let _this = this;
                if (this.password && this.newPwd && this.newPwdAgain && this.newPwd == this.newPwdAgain) {
                    this.btnWait = true;
                    this.ajax({
                        url: '/changePassword',
                        data: {
                            userName: _this.username,
                            oldPassword: _this.password,
                            newPassword: _this.newPassword
                        },
                        cbfn(data){
                            if (data.result == 'SUCCESS') {
                                
                            }
                        }
                    })
                }else{
                    this.showMsg = true;
                    this.msgText = '信息填写有误！'
                }
            }
        },
        beforeMount(){
            this.username = (function () {
                let index = location.href.indexOf('?user=') + 6;
                return location.href.substring(index);
            })()
        }
    }
</script>

