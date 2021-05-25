import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import reg from './components/reg.vue'
import roomModel from './components/roomModel.vue'
import showScripts from './components/showScripts.vue'
import rank from './components/rank.vue'
import cat from './components/cat.vue'
import prule from './components/prule.vue'
import pspace from './components/pspace.vue'
import psearch from './components/psearch.vue'
import ppost from './components/ppost.vue'
import npost from './components/npost.vue'
//import store from './store/index.js'
import sdetail from './components/sdetail.vue'
import adspace from './components/adspace.vue'



Vue.use(Router)

const router = new Router({
  mode:'hash', //“history”开发时消除地址栏“＃”用,“hash”生产环境正式调用
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/showScripts',
      alias: '/',
      name: 'showScripts',
      component: showScripts,
      
    },
    {
      path: '/pspace',
      name: 'pspace',
      component: pspace,
      
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      
    },
    {
      path: '/cat',
      name: 'cat',
      component: cat,
      
    },
    {
      path: '/prule',
      name: 'prule',
      component: prule,
      
    },
    {
      path: '/psearch',
      name: 'psearch',
      component: psearch,
      
    },
    {
      path: '/ppost',
      name: 'ppost',
      component: ppost,
      
    },
    {
      path: '/adspace',
      name: 'adspace',
      component: adspace,
      
    },
    {
      path: '/npost',
      name: 'npost',
      component: npost,
      
    },
    {
      path: '/sdetail',
      name: 'sdetail',
      component: sdetail,
      meta: {
        requireAuth: true,// 添加该字段，表示进入这个路由是需要登录的
        requireDTarget:true,
      }
    },
    {
      path:'/init',
      name:'init',
      component: roomModel,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ]
})

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.head
  const dTarget = window.sessionStorage.dtarget
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      console.log('该页面需要登陆')
      next({
        path: '/login'
        
      })
    }
  } else {
    next()
  }
  if(to.meta.requireDTarget){
    if(dTarget){
      next()
    }else{
      console.log('该页面需要从外部进入')
      next({
        path:'/showScripts'
      })
    }
  }else{
    next()
  }
})

export default router