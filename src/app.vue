<template>
    <div class="app-box">
        <!-- 头部组件 -->
        <v-header></v-header>
         <!--导航组件-->
        <ul class="nav">

            <li>
                <router-link to="/goods">商品</router-link>
            </li>
            <li>
                <router-link to="/ratings">评价</router-link>
            </li>
            <li>
                <router-link to="/seller">商家</router-link>
            </li>
        </ul>
         <!--路由内容 -->
        <router-view></router-view>
    </div>
</template>
<script>
    //  引入相关组件
    import header from "./components/header/header";
    import {
        getSeller
    } from "./utils/sellAPIs";
    export default {
        data () {
            return {
                seller:{

                }
            }
        },
        components:{
          'v-header' :header
        },
        mounted () {
            let _this = this;
//            let sellerUrl = 'http://localhost/api/seller';
//            this.$axios
//                .get(sellerUrl)
//                .then((resp)=>{
//                    _this.seller=resp.data.data;
//                })
            getSeller().then((resp)=>{
                //获取商家数据,修改全局状态的store
                _this.$store.state.seller=resp.data.data;
            })
        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
<style scoped lang="less">
    .app-box{
        .nav{
            height : 40px;
            border-bottom: 1px solid rgba(7,17,27,.1);
            list-style: none;
            display: flex;
            justify-content: center;
            align-items: center;
        
            li{
                flex:1;
                text-align: center;
                a{
                    font-size: 14px;
                    color: rgb(77,85,93);
                    line-height: 14px; 

                    &.router-link-active{
                         color: rgb(240,20,20) 
                    }
                } 
            }
        }
    }
</style>
