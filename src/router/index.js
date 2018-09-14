const routers = [
    {
        path: '/',
       redirect:'/goods'
    },
    {
        path: '/goods',
        meta: {
            title: '商品页面'
        },
        component: (resolve) => require(['../pages/goods/goods.vue'], resolve)  // webpack异步模块
        // function(){ return require([你的模块],resolve)  }
    },
    {
        path: '/ratings',
        meta: {
            title: '评价页面'
        },
        component: (resolve) => require(['../pages/ratings/ratings.vue'], resolve)  // webpack异步模块
    },
    {
        path: '/seller',
        meta: {
            title: '商家页面'
        },
        component: (resolve) => require(['../pages/seller/seller.vue'], resolve)  // webpack异步模块
    }
    
];
export default routers;