import Vue from 'vue'
import Router from 'vue-router'
import Step1 from '../Step1'
import Step2 from '../Step2'
import Step3 from '../Step3'
import Pwd from '../Pwd'

Vue.use(Router);

const routes = [
  {path: '/', component: Step1},
  {path: '/login/step1', component: Step1},
  {path: '/login/step2', component: Step2},
  {path: '/login/step3', component: Step3},
  {path: '/pwd', component: Pwd}
];

export default new Router({
  routes
})
