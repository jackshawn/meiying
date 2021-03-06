import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './assets/router'//路由
import fn from './assets/fn'//工具函数


FastClick.attach(document.body);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app-box')


