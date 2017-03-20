<template>
    <div>
        <headSteps :cur=2></headSteps>
        <br>
        <x-hr></x-hr>
        <msg title="登录成功" description="当前已经登录成功，可以上网。也可以修改当前用户密码，重新选择节点或退出登录"></msg>
        <div class="padding5">
            <x-button type="primary" @click.native="hrefTo('./#/login/step2')">重新选择节点</x-button>
            <x-button plain @click.native="hrefTo('./#/pwd')">修改密码</x-button>
            <x-button type="warn" @click.native="logout">退出登录</x-button>
        </div>
    </div>
</template>

<script>
    import {XButton, XHr, Msg} from 'vux'
    import headSteps from './components/Steps'
    
    export default {
        components: {
            XButton, XHr,
            Msg,
            headSteps
        },
        data(){
            return {
                user: ''
            }
        },
        methods: {
            hrefTo(url) {
                location.href = url+'?user='+ this.user;
            },
            logout(){
                let _this = this;
                this.ajax({
                    url: '/logout',
                    data: _this.user,
                    cbfn(data){
                        if(data&&data.result=='SUCCESS'){
                            this.hrefTo('./#/login/step1');
                        }
                    }
                })
            }
        },
        beforeMount(){
            this.user = (function () {
                let index = location.href.indexOf('?user=') + 6;
                return location.href.substring(index);
            })();
        }
    }
</script>

