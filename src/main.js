
/**
 * 导入根组件
 * 渲染根组件
 */

import Vue from 'vue'   //这一步导入 会自动直接从node_modules里面找vue这个文件夹里面dist文件夹的vue.runtime.common.js里面的内容要求指向的vue.js

import App from './App.vue'               //这里的APP是变量
//相当于以往的ES5写法的  var app = require（'./App.vue')

// 导入路由功能
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import Vuex from 'vuex'

//图钉（全局注册方法）
// import {Affix} from 'iview'
// Vue.component('Affix', Affix)   //这种写法是属于全局注册  还可以使用局部注册

Vue.use(VueRouter) //这里相当于  Vue.prototype.$route  Vue.prototype.$router    在Vue的原型上添加这两个属性
Vue.use(ElementUI)  
Vue.use(VueLazyload, {
    loading: require('./statics/site/images/01.gif')
  })
Vue.use(Vuex)  //Vue.prototype.$store


// 这里是使用axios内置的自动添加baseUrl的前缀
import axios from 'axios'
axios.defaults.baseURL = "http://39.108.135.214:8899/"
Vue.prototype.$axios = axios
 

// 导入项目中使用的到css （全局导入）
import 'element-ui/lib/theme-chalk/index.css'       //这个是饿了吗的ui框架css文件的导入   全局导入
import "./statics/site/css/style.css"

//全局过滤器
Vue.filter('fmtDate',(input,formatString="YYYY-MM-DD HH:mm:ss")=>{
    // const formatString = formatString || "YYYY-MM-DD HH:mm:ss"

    /**
     * 参数1：input是指，格式化的原始事件
     * 参数2：格式化的字符串
     */
   return moment(input).format(formatString)
})


// 这里要写路由的对象和路由其他的相关代码
import goodslist from './components/goods/goodslist.vue' 
import goodsinfo from './components/goods/goodsinfo.vue'  
import shopcart from './components/shopcart/shopcart.vue'   
  
const router = new VueRouter({   
    routes:[
        {path:'/',redirect:'/site/goodslist'},  //这里是重定向，就是打一开页面就是现显示到对应到的网址上
        {path:'/site/goodslist',component:goodslist},
        {path:'/site/goodsinfo/:goodsId',component:goodsinfo},
        {path:'/site/shopcart',component:shopcart}
    ]
})

//这里要先导入本地存储的模块的代码 localstoragHelpr的代码  因为里面是
import { getTotalCount } from './common/localStorageHelper.js'

//这里写vuex相关的代码
const store = new Vuex.Store({

    state:{
        buycount:0
    },
    getters:{  //仓库中获取数据  
        getBuyCount(state){
            if(state.buyCount > 0){  //没有刷新页面用它
                return state.buycount
            }else{  //如果重新刷新了， vuex仓库就清空了 ，那么就要重新在本地存储里面获取总数
                 
            }
        } 
    },
    mutations:{

        /**
         * 第一个参数是固定的state
         * 第二个参数是goodObj的载荷
         */
        addGoods(state,goodsObj){
            
        }
    }   
})


// 2.渲染根组件，所以要创建项目的实例，并且把App.vue中的template内容呈现出来
new Vue({
    // 这里就是解析app.vue里面的内容
    el:'#app',
    store,
    router,
    render:function(createElement){  // render函数 用来渲染根组件用的函数
        return createElement(App)
    }
})

