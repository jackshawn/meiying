<template>
  <div>
    <headSteps :cur=0></headSteps>
    <br>
    <x-hr></x-hr>
    <body-forms v-on:update="updateInfo"></body-forms>
    <div class="btn_wrap">
      <x-button type="primary" @click.native="post" :disabled="showBtn">下一步</x-button>
    </div>
    <loading v-model="showLoading"  text="登录中..."></loading>
    <br>

  </div>
</template>

<script>
  import {XButton, XHr, Loading} from 'vux'
  import headSteps from './components/Steps'
  import bodyForms from './components/Forms'

  export default {
    components: {
      XButton,
      XHr,
      Loading,
      headSteps,
      bodyForms

    },
    data () {
      return {
        showLoading: false,
        showBtn: false,
        postData:{},
        permission:0
      }
    },
    methods: {
      post(){
          this.showLoading = true;
          this.ajax({
              url:'qwe.com',
            data:this.postData,
            cbfn:function (data) {
              if(data){
                  console.log(data);
              }
            }
          })
          setTimeout(function () {
            this.showLoading = false;
            window.location.href='/#/login/step2'
          },1000)
      },
      updateInfo(btnState,data){
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
