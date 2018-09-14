<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <Rate allow-half disabled v-model="seller.score"></Rate>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <span class="iconfont icon-xinheart280" :class="{'active':favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <div class="deliver"></div>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper border-1px">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item border-1px" v-for="(item,index) in seller.supports" :key="index">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <div class="deliver"></div>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="pic in seller.pics" :key="pic">
                            <img :src="pic" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title border-1px">商家信息</h1>
                <ul>
                    <li class="info-item" v-for="info in seller.infos" :key="info">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    props: {
        // seller: {
        //   type: Object
        // }
    },
    data() {
        return {
            favorite:false
            // favorite: (() => {
            //   return loadFromLocal(this.seller.id, 'favorite', false);
            // })()
        };
    },
    computed: {
        //切换收藏状态的文字
        favoriteText() {
            return this.favorite ? '已收藏' : '收藏';
        },
        //使用vuex的状态管理中的商家数据,数据由app组件获取
        seller(){
            return this.$store.state.seller;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

        // alert(JSON.stringify(this))
        this.seller.id = this.$route.params.id;

        // 请求数据
        // let sellerUrl = 'http://localhost/api/seller?id='+ this.seller.id;
        // let _this = this;
        // this.$axios
        //       .get(sellerUrl)
        //       .then((resp)=>{
        //         _this .$nextTick(()=>{
        //             _this .seller = resp.data.data;
        //         })
        //       })
    },
    mounted(){
        alert('挂载成功！！')


    },
    watch: {
        'seller'() {
            this.$nextTick(() => {
                this._initScroll();
                this._initPics();
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            this._initScroll();
            this._initPics();
        });
    },
    methods: {
        //切换收藏状态
        toggleFavorite(event) {
            if (!event._constructed) {//在betterscroll中,点击事件成功会派发一个属性_constructed,所以通过判断它是否存在来确定是否进入点击
                return;
            }
            //将收藏状态取反
            this.favorite = !this.favorite;
            // saveToLocal(this.seller.id, 'favorite', this.favorite);
        },
        /*商家界面整体滚动初始化*/
        _initScroll() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.seller, {
                    click: true
                });
            } else {
                this.scroll.refresh();
            }
        },
        /*初始化商家实景滚动*/
        _initPics() {
            if (this.seller.pics) {
                let picWidth = 120;
                let margin = 6;
                let width = (picWidth + margin) * this.seller.pics.length - margin;
                this.$refs.picList.style.width = width + 'px';
                this.$nextTick(() => {
                    if (!this.picScroll) {
                        this.picScroll = new BScroll(this.$refs.picWrapper, {
                            scrollX: true,//开启横向滚动
                            eventPassthrough: 'vertical'
                        });
                    } else {
                        this.picScroll.refresh();
                    }
                });
            }
        }
    },
    components: {
        // star,
        // split
    }
}
</script>
<style scoped lang='less'>
    .seller{
        position: absolute;;
        top:179px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .overview{
            position: relative;;
            padding: 18px;
            // top:35px;
            .title{
                margin-bottom: 8px;
                line-height: 14px;
                color: rgb(7, 17, 27);
                font-size: 14px;
            }
            .desc{
                padding-bottom: 18px;
                border-bottom : 1px solid rgba(7, 17, 27, 0.1);
                font-size: 0;
                display: flex;
                align-items: center;
                .star{
                    display: inline-block;
                    margin-right: 8px;
                    vertical-align: top;
                }
                .text{
                    display: inline-block;
                    margin-right: 12px;
                    line-height: 18px;
                    vertical-align: top;
                    font-size: 10px;
                    color: rgb(77, 85, 93);
                }
            }
            .remark{
                display: flex;
                padding-top: 18px;
                list-style: none;
                .block{
                    flex: 1;
                    text-align: center;
                    border-right: 1px solid rgba(7, 17, 27, 0.1);
                    &:last-child{
                        border: none;
                    }
                    h2{
                        margin-bottom: 4px;
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .content{
                        line-height: 24px;
                        font-size: 10px;
                        color: rgb(7, 17, 27);}
                    .stress{
                        font-size: 24px;}
                }
            }
            .favorite{
                position: absolute;
                width: 50px;
                right: 11px;
                top: 18px;
                text-align: center;
                .icon-xinheart280{
                    display: block;
                    margin-bottom: 4px;
                    line-height: 24px;
                    font-size: 24px;
                    color: #d4d6d9;
                    &.active{
                        color: rgb(240, 20, 20);
                    }
                }
                .text{
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(77, 85, 93);
                }
            }
        }
        .deliver{
            height:20px;
            background-color: #f3f5f7;
        }
        // 活动公告
        .bulletin{
            position: relative;
            top:10px;
            // margin-top: 20px;
            padding: 18px;
            .title{
                margin-bottom: 8px;
                line-height: 14px;
                color: rgb(7, 17, 27);
                font-size: 14px;
            }
            .content-wrapper{
                padding: 0 12px 16px 12px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .content{
                    line-height: 24px;
                    font-size: 12px;
                    color: rgb(240, 20, 20);
                }
            }
            .supports{
                .support-item{
                    padding: 16px 12px;
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                    font-size: 0;
                    &:last-child{
                        border:none;
                    }
                }
                .icon{
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    vertical-align: top;
                    margin-right: 6px;
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                    &.decrease{
                        background-image: url('decrease_4@2x.png');
                    }
                    &.discount{
                        background-image: url('discount_4@2x.png');
                    }
                    &.guarantee{
                        background-image: url('guarantee_4@2x.png');
                    }
                    &.invoice{
                        background-image: url('invoice_4@2x.png');
                    }
                    &.special{
                        background-image: url('special_4@2x.png');
                    }
                }
                .text{
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
            }
        }
        .pics{
            padding: 18px;
            .title{
                margin-bottom: 12px;
                line-height: 14px;
                color: rgb(7, 17, 27);
                font-size: 14px;
            }
            .pic-wrapper{
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                .pic-list{
                    font-size: 0;
                    .pic-item{
                        display: inline-block;
                        margin-right: 6px;
                        width: 120px;
                        height: 90px;
                        &:last-child{
                            margin: 0;
                        }
                    }
                }
            }
        }
        .info{
            padding: 18px 18px 0 18px;
            color: rgb(7, 17, 27);
            ul{
                list-style: none;
            }
            .title{
                padding-bottom: 12px;
                line-height: 14px;
                border-bottom:1px solid rgba(7, 17, 27, 0.1);
                font-size: 14px;
            }
            .info-item{
                padding: 16px 12px;
                line-height: 16px;
                border-bottom:1px solid rgba(7, 17, 27, 0.1);
                font-size: 12px;
                &:last-child{
                    border:none;
                }
            }
        }
    }
</style>