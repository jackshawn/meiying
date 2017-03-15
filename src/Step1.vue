<template>
  <div>
    <headSteps :cur=0></headSteps>
    <br>
    <x-hr></x-hr>
    <body-forms v-on:update="updateInfo"></body-forms>
    <div class="btn_wrap">
      <x-button type="primary" @click.native="post" :disabled="showBtn">下一步</x-button>
    </div>
    <loading v-model="showLoading" text="登录中..."></loading>
    <toast v-model="loginMsg" :time="1000" type="cancel" text="登录失败"></toast>
  </div>
</template>

<script>
  import {XButton, XHr, Loading, Toast} from 'vux'
  import headSteps from './components/Steps'
  import bodyForms from './components/Forms'
  
  export default {
    components: {XButton, XHr, Loading, headSteps, bodyForms, Toast},
    data () {
      return {
        showLoading: false,
        showBtn: false,
        postData: {},
        permission: 0,
        loginMsg: false
      }
    },
    methods: {
      post(){
        let _this = this;
        this.showLoading = true;
        this.ajax({
          url: '/login',
          data: this.postData,
          cbfn: function (data) {
            if (data) {
              if (data.result == 'SUCCESS') {
                window.location.href = '/#/login/step2?user=qwe'
              }
              if (data.result == 'FAILED') {
                _this.showLoading = false;
                _this.loginMsg = true;
              }
              if (data.result == 'CHANGE_PASSWORD') {
                window.location.href = '/#/pwd'
              }
              console.log(data);
            }
          }
        })
      },
      updateInfo(btnState, data){
        this.showBtn = !btnState;
        this.postData = data;
        
      }
    }
  }
</script>
<style scoped>
  .btn_wrap {
    padding: 0 1rem;
    margin-top: 2rem;
  }
</style>
