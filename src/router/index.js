import Vue from 'vue'
import Router from 'vue-router'
import Login from '../Login'
import Home from '../Home'
import index from '../index'

import addVisitor from '@/components/addVisitor'
import inquirySymptem from '@/components/inquirySymptem'
import statistics from '@/components/statistics'

//optionsManagment
import consultType from '@/components/OptionsManagment/consultType'
import visitorSource from '@/components/OptionsManagment/visitorSource'

import inquiryDetail from '@/components/inquiryDetail'


Vue.use(Router)



const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login',
      component: Login,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/index',
      // name: 'index',     //可以理解为，只有一个子路由作为默认路由的时候，父级路由不能有name，否则会报警告
      component: Home,
      meta: { title: '我的主页' },
      children:
        [
          { path: '', name: 'index', component: index, },
        ]
    },
    {
      path: '/addVisitor',
      // name: 'addVisitor',
      component: Home,
      meta: { title: '新增访客' },
      children:
        [
          { path: '', name: 'addVisitor', component: addVisitor },
        ]
    },
    {
      path: '/inquirySymptem',
      name: 'inquirySymptem',
      component: Home,
      meta: { title: '查诊' },
      children:
        [
          { path: '', name: 'inquirySymptem', component: inquirySymptem },
          { path: 'inquiryDetail', name: 'inquiryDetail', component: inquiryDetail },
          //     { path: 'NewEvent', name: 'NewEvent', component: NewEvent, meta: { title: '新建事件' } },
          //     { path: 'ManualEntry', name: 'ManualEntry', component: ManualEntry, meta: { title: '手工录入' } },
          //     { path: 'Announce', name: 'Announce', component: Announce, meta: { title: '公告发布' } },
          //     { path: 'Operation', name: 'Operation', component: Operation, meta: { title: '运维事件' } },
          //     { path: 'PastEvents', name: 'PastEvents', component: PastEvents, meta: { title: '往日事件' } },
          //     { path: 'DepartmentEvents', name: 'DepartmentEvents', component: DepartmentEvents, meta: { title: '本部待办' } },
        ]
    },
    {
      path: '/statistics',
      // name: 'statistics',
      component: Home,
      meta: { title: '统计' },
      children:
        [
          { path: '', name: 'statistics', component: statistics },
        ]
    },
    //optionsManagment
    {
      path: '/optionsManagment',
      component: Home,
      meta: { title: '选项管理' },
      children:
        [
          { path: 'consultType', name: 'consultType', component: consultType, meta: { title: '咨询类型' } },
          { path: 'visitorSource', name: 'visitorSource', component: visitorSource, meta: { title: '访客来源' } },
        ]
    },


  ]
})



router.beforeEach((to, from, next) => {


  // to 和 from 都是 路由信息对象
  // console.log(to)
  // console.log(from)

  // let spanColor = document.getElementsByTagName('span')
  // if (to.name == 'inquiryDetail' || to.name == 'inquirySymptem') {
  // if (spanColor) {
  //   spanColor[1].style.color = 'rgb(255, 208, 75)'
  //   spanColor[1].previousElementSibling.style.color = 'rgb(255, 208, 75)'
  //   // }
  // }else{
  // spanColor[1].style.color = 'rgb(255, 255, 255)'
  // spanColor[1].previousElementSibling.style.color = 'rgb(255, 255, 255)'
  // }
  // if (from.name == 'inquiryDetail' || to.name == 'inquirySymptem') {
  //   spanColor[1].style.color = 'rgb(255, 255, 255)'
  //   spanColor[1].previousElementSibling.style.color = 'rgb(255, 255, 255)'

  // }
  // console.log(this.$route)
  // console.log(router.currentRoute.fullPath)
  
  next()
})





export default router