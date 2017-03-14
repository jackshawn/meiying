<template>
  <div>
    <br>
    <divider>修改密码</divider>
    <group title="">
      <x-input title="用户名" placeholder="username" v-model="info.username" @on-change="update"></x-input>
    </group>
    <group title="">
      <x-input title="原始密码" placeholder="password" v-model="info.password" @on-change="update"></x-input>
    </group>
    <group title="">
      <x-input title="新密码" placeholder="new password" v-model="info.password" @on-change="update"></x-input>
    </group>
    <group title="">
      <x-input title="确认新密码" placeholder="new password again" v-model="info.password" @on-change="update"></x-input>
    </group>
    <br>
    <br>
    <div class="padding5">
      <x-button type="primary">确定</x-button>
    </div>
  </div>
</template>

<script>
  import {XButton, XInput, Group,Divider} from 'vux'
  export default {
    components: {
  XButton, XInput,
      Group,Divider
    },
    data () {
      return {
        ip1: '',
        ip2: '',
        info: {
          username: '',
          password: '',
          ip1: '',
          ip2: ''
        },
        btnState: false
      }
    },
    methods: {
      checkIp(t){
        let value = this.info[t],
          reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        if (reg.test(value)) {
          this[t] = 'success';
        } else {
          this[t] = 'error';
        }
        if(!this.info[t]){
          this[t] = '';
        }
        
        this.update()
      },
      update(){
        let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        this.btnState = (reg.test(this.info.ip1)&&reg.test(this.info.ip2)&&this.info.username&&this.info.password)
        console.log('updated')
        this.$emit('update',this.btnState,this.info)
      }
    }
  }
</script>

