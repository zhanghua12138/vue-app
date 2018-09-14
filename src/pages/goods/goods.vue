<template>
    <div class="foods-box">
        <div class="leftscroll" ref="leftscroll">
            <ul class="name" >
                <li v-for="(item,index) in goods" :key="item.name" @click="selectMenu($event,index)" :class="{current:(currentIndex===index)}">
                   <span class="text border-1px">
                      <!-- icon -->
                      <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                           <!-- 菜单导航标题 -->
                            {{item.name}}
                  </span>
                </li>
            </ul>
        </div>
        <div class="rightscroll" ref="rightscroll">
            <ul class="name-foods">
                <li v-if="goods" class="name-list" v-for="(item,index) in goods" :key="index" ref="foodList">
                    <p class="title">{{item.name}}</p>
                    <ul>
                        <li v-if="item.foods" v-for="(value) in item.foods">
                            <div><img :src="value.image" alt=""></div>

                            <div class="right">
                                <h4>{{value.name}}</h4>
                                <p>{{value.description}}</p>
                                <p>月售{{value.sellCount}}&ensp;好评率{{value.rating}}%</p>
                                <div class="price">
                                    <div>
                                        <span class="now">￥{{value.price}}</span><del v-if="value.oldPrice">￥{{value.oldPrice}}</del>
                                    </div>
                                    <div>
                                        <i class="iconfont icon-jia1"></i>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

    </div>

</template>
<script>
import {
    listGoods
} from "../../utils/sellAPIs";
// 引入滑动插件
import BScroll from 'better-scroll';
export default {
      data(){
        return {
            goods:[],
//            currentIndex:0,
            scrollY : 0, // y轴滚动坐标
            heightList : [] ,// 记录所有商品项目的起始高度
            classMap:['decrease', 'discount', 'special', 'invoice', 'guarantee']
        }
      },
    methods: {
        _initScroll(){
            // 初始化左侧滑动
            // 参数1: 需要滚动的父盒子
            // 参数2: 滑动插件的配置
            //初始化滚动插件
            this.menuScroll = new BScroll(this.$refs.leftscroll,{
                click:true // 开启事件点击(better scroll插件会阻碍click事件,需要在初始化时设置click为true)
            });
            this.foodsScroll = new BScroll(this.$refs.rightscroll,{
                probeType : 3 //scroll事件的触发时机(1.非实时,2.实时,3.实时+动画)
            })
            //监听右侧菜单滑动事件
            this.foodsScroll.on('scroll',(page)=>{
            //记录当前滑动的Y坐标
               this.scrollY=Math.abs(Math.round(page.y));
//               console.log(this.scrollY);
            })
        },
        // 选中菜单事件函数
        selectMenu(event, index){
            // 判断事件是否由插件触发
            if(!event._constructed){
                return; // 如果不是,则返回
            }
            // 1. 获取右侧食物内容的集合
            let foodList = this.$refs.foodList;

//             2. 通过左侧索引值,获取右侧对应的food展示板块
            let foodSection = foodList[index];
//             3. 直接在右侧视口顶部,展示内容
            this.foodsScroll.scrollToElement(foodSection,1000);
//             记录选中的索引号
//             this.currentIndex = index;//这里用过计算属性修改currentIndex的值,所有不用修改
        },
        //计算右侧每一个菜单所在的y坐标(高度)
        calcualateHeight(){
            let foodList = this.$refs.foodList;
            let height = 0;
            this.heightList.push(height);
            foodList.forEach((el)=>{
                height+= el.clientHeight;
                this.heightList.push(height);
            })
//            console.log(this.heightList)
        }
     },
    computed:{
        currentIndex(){
            for (let i=0;i<this.heightList.length;i++){
                let beginHeight = this.heightList[i];
                let endHeight = this.heightList[i+1];
                if(!endHeight||this.scrollY >= beginHeight&&this.scrollY <endHeight){
                    return i
                }
            }
        }
    },
    mounted (){
          //获取数据
        let _this = this;
        listGoods(222).then((resp)=>{
            _this.goods=resp.data.data;
            // 重新计算高度
            _this.$nextTick(()=>{
                _this.calcualateHeight()
            })
        })
        // 初始化左/右两侧滑动
        this._initScroll();
    }
}
</script>
<style scoped lang='less'>
    .foods-box{
        position: absolute;
        top:179px;
        overflow: hidden;
        display: flex;
        width: 100%;
        .leftscroll{
            height:480px;
            width: 20%;
            .name{
                box-sizing: border-box;
                width: 100%;
                li{
                    display: table;
                    width: 100%;
                    height: 54px;
                    padding: 0 10px;
                    line-height: 14px;
                    &.current {
                        position: relative;
                        z-index: 10;
                        margin-top: -1px;
                        background: #f60;
                        color: #fff;
                        // border-left: 2px solid greenyellow;
                        font-weight: 700;
                        .text {
                            border: none;
                        }
                    }
                    .text {
                        display: table-cell;
                        text-align: center;
                        width: 56px;
                        vertical-align: middle;
                        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                        font-size: 12px;
                        .icon {
                            display: inline-block;
                            vertical-align: top;
                            width: 12px;
                            height: 12px;
                            margin-right: 2px;
                            background-size: 12px 12px;
                            background-repeat: no-repeat;
                            &.decrease {
                                background-image: url('./decrease_3@2x.png');
                            }
                            &.discount {
                                background-image: url('./discount_3@2x.png');
                            }
                            &.guarantee{

                                background-image: url('./guarantee_3@2x.png');
                            }
                            &.invoice {
                                background-image: url('./invoice_3@2x.png');
                            }
                            &.special {
                                background-image: url('./special_3@2x.png');
                            }
                        }
                    }
                }
            }
        }

        .rightscroll{
            width: 80%;
            height:480px;
            .name-foods{
                list-style: none;
                width: 100%;
                .name-list{
                    width: 100%;
                    p.title{
                        border-left:4px solid #d9dde1;
                        font-size: 14px;
                        font-weight: bold;
                        background: #f3f5f7;
                        color: #9aa0a6;
                        text-indent: 12px;
                        line-height: 26px;
                        height: 26px;

                    }
                    ul{

                        padding: 18px;
                        width: 100%;
                        list-style: none;
                        box-sizing: border-box;
                        li{
                            height: 86px;
                            display: flex;
                            img{
                                width: 57px;
                                height: 57px;
                            }
                            .right{
                                width: 60%;
                                h4{
                                    font-size: 14px;
                                    color:rgb(7,17,27);
                                }
                                p{
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    font-size: 12px;
                                    margin-top: 2px;
                                }
                                .price{
                                    line-height: 24px;
                                    height: 24px;
                                    width: 100%;
                                    display: flex;
                                    justify-content: space-between;
                                    .now{
                                        font-size: 14px;
                                        color: red;
                                        margin-right: 8px;
                                    }
                                    del{
                                        font-size: 12px;
                                        color:rgb(147,153,159);
                                    }
                                    i{
                                        color: #00a0dc;
                                        font-size: 16px;
                                    }
                                }
                                margin-left: 8px;
                            }
                        }
                    }
                }

                box-sizing: border-box;
            }
        }

    }
</style>