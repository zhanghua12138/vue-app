import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './utils/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import './assets/styles/common.less';
// 引入ajax模块
import axios from 'axios';
// 安装插件
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Vuex);
// 把axios模块,挂到vue原型上(目的:让vue实例,随时可以访问axios)
Vue.prototype.$axios = axios;
// 路由配置
const RouterConfig = {
    // mode: 'history', // 使用传统页面跳转,默认就是hash路由
    routes: Routers
};
const router = new VueRouter(RouterConfig);

// iview效果增强
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});
// iview效果增强
router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
//定义初始化Vuex状态
const store = new Vuex.Store({
    state:{
        seller:{
            name:123
        }
    },
    mutaions: {
        loadSeller (state) {
            state.seller = seller;
        },
        // 传参数
        getSeller(state, params) {
            return seller
        }
    },
    actions: {
        loadSeller (context) {
            context.commit('loadSeller')
        },
        // 传参数
        getSeller(context) {
            return context.commit('getSeller')
        }
    }
})
// 核心: 创建vue实例
new Vue({
    el: '#app',
    router, // 使用路由
    store,//使用vuex状态
    render: h => h(App) // function(createElement){ return createElement(App) }  // Vu2.X 推荐方式 , jsx(先进\前言)
    // ,components:{ // Vue1.x 继承过来,现在还有在用!!
    //     App: APP
    // }
});
