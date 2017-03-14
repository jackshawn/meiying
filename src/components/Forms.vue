<template>
  <div>
    <group title="">
      <x-input title="用户名" placeholder="username" v-model="info.username" @on-change="update"></x-input>
    </group>
    <group title="">
      <x-input title="密码" placeholder="password" v-model="info.password" @on-change="update"></x-input>
    </group>
    <group title="">
      <x-input title="网关地址" novalidate placeholder="ip" v-model="info.ip1" @on-change="update" @on-blur="checkIp('ip1')"
               :icon-type="ip1"></x-input>
    </group>
    <group title="">
      <x-input title="管理中心地址" novalidate placeholder="ip" v-model="info.ip2" @on-change="update" @on-blur="checkIp('ip2')"
               :icon-type="ip2"></x-input>
    </group>
  </div>
</template>

<script>
  import {XInput, Group} from 'vux'
  export default {
    components: {
      XInput,
      Group
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

