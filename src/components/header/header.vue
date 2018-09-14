<template>
  <div ref="header" class="header">
      <!-- 头部内容 -->
      <div class="content-box">
          <!-- 左侧图片 -->
          <div class="avatar">
              <img :src="seller.avatar" alt="">
          </div>
          <!-- 右侧内容 -->
          <div class="content">
                <!-- 标题 -->
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>     
                <!-- 描述 -->
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟
                </div>
                <!-- 支持活动 -->
                <div v-if="seller.supports" class="support">
                    
                    <li class="support-item">
                        <!-- 小icon -->
                        <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                        <!-- 文本 -->
                        <span class="text">{{seller.supports[0].description}}</span>
                    </li>
                </div>
                <!-- 活动个数 -->
                <div v-if="seller.supports" class="support-count"  @click="showDetail">
                    <span class="count">{{seller.supports.length}}个</span>
                    <Icon type="ios-arrow-forward" />
                </div>
          </div>
      </div>
       <!--背景图 -->
      <div class="background">
          <img :src="seller.avatar" alt="">
      </div>
      <!-- 公告栏 -->
      <div class="bulletin-box"  @click="showDetail"> 
          <span class="bulletin-title"></span>
          <span class="bulletin-text">{{seller.bulletin}}</span>
          <Icon type="ios-arrow-forward" />
      </div>
      <!-- 弹出层 -->
      <transition name="fade">
          <div class="detail" v-if="detailShow">
                <!-- 弹出详情内容-->
                <div class="detail-box">
                    <!-- 商家名称 -->
                    <h1 class="name">{{seller.name}}</h1>
                    <!-- 评分组件 -->
                    <div class="star-box">
                        <Rate allow-half disabled v-model="seller.score"/>    
                    </div>
                    
                    <!-- 优惠信息标题 -->
                    <!-- <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div> -->
                    <Divider class="divider">优惠信息</Divider>

                    <!-- 活动列表 -->
                    <div class="supports" v-if="seller.supports">
                        <li class="support-item" v-for="(item) in seller.supports">
                            <!--图标-->
                            <span class="icon" :class="classMap[item.type]"></span>
                            <!-- 文本 -->
                            <span class="text">{{item.description}}</span>
                        </li>
                    </div>

                    <!-- 商家公告标题 -->
                    <Divider class="divider">商家公告</Divider>
                    <!-- <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div> -->
                    <!-- 商家公告内容 -->
                    <div class="bulletin">
                        <p class="conten">{{seller.bulletin}}</p>
                    </div>
                </div>

                <!-- 关闭按钮 -->
                <div class="detail-close"   @click="hideDetail">
                    <Icon type="ios-close" />
                </div>
          </div>
      </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
//  props: {
//    seller: {
//      type: Object
//    }
//  },
  data() {
    return {
      detailShow: false
    };
  },
  computed:{
        seller(){
            return this.$store.state.seller;
        }
    },
  components: {},
  methods:{
      showDetail(){
          // 显示详情框
          this.detailShow = true;
      },
      hideDetail(){

          // 隐藏详情框
          this.detailShow = false;
      }
  },
  created(){
      // 准备样式集合，用于获取商家活动类型（翻译）
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
     
  }
};
</script>

<style lang="less">

    .header {
        position: relative;
        // overflow: hidden;
        color: #fff;
        background: rgba(7, 17, 27, 0.5);
        // 头部所有内容
        .content-box {
            padding: 24px 12px 18px 24px;
            
            display: flex;
            flex-direction: row;
            // align-items: center;
            // 头像
            .avatar {
                display: inline-block;
                img {
                    height: 64px;
                    width: 64px;
                    border-radius: 4px;
                }
            }
            // 内容
            .content {
                margin-left: 16px;
                // 标题
                .title {
                    margin: 2px 0 8px 0;
                    .brand {
                        display: inline-block;
                        vertical-align: top;
                        width: 30px;
                        height: 18px;
                        background-image: url('./brand@2x.png');
                        background-size: 30px 18px;
                        background-repeat: no-repeat;
                    }
                    .name {
                        margin-left: 6px;
                        font-size: 16px;
                        color:#fff;
                        line-height: 18px;
                        font-weight: bold;
                    }
                }
                // 描述
                .description {
                    margin-bottom: 10px;
                    line-height: 12px;
                    font-size: 12px;
                }
                // 支持活动
                .support {
                    list-style: none;
                    line-height: 18px;
                    .icon {
                        display: inline-block;
                        vertical-align: middle;
                        width: 14px;
                        height: 14px;
                        margin-right: 4px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                        &.decrease {
                            background-image: url('./decrease_1@2x.png');
                        }
                        &.discount {
                            background-image: url('./discount_1@2x.png');
                        }
                        &.guarantee{

                            background-image: url('./guarantee_1@2x.png');
                        }
                        &.invoice {
                            background-image: url('./invoice_1@2x.png');
                        }
                        &.special {
                            background-image: url('./special_1@2x.png');
                        }
                    }
                    .text {
                        line-height: 18px;
                        font-size: 12px;
                    }
                }
                // 活动个数
                .support-count {
                    position: absolute;
                    right: 12px;
                    bottom: 38px;
                    padding: 0 8px;
                    height: 24px;
                    line-height: 24px;
                    border-radius: 14px;
                    background: rgba(0, 0, 0, 0.2);
                    text-align: center;
                     .count {
                        vertical-align: top; 
                        font-size: 10px;
                     }
                    .icon-keyboard_arrow_right {
                        margin-left: 2px;
                        line-height: 24px;
                        font-size: 10px;
                    }
                }
            }
        }
        // 背景图
         .background {
             position: absolute;
             top: 0;
             left: 0;
             width: 100%;
             height: 100%;
             z-index: -1;
             filter: blur(10px);//图片模糊值
             img{
                 width: 100%;
                 height: 100%;
             }
         }
        //  公告栏
        .bulletin-box {
            height: 28px;
            padding: 0 22px 0 12px;
            background: rgba(7, 17, 27, 0.2);

            display: flex;
            align-items: center;
            
            .bulletin-title {
                display: inline-block;
                width: 22px;
                height: 12px;
                background-image: url('./bulletin@2x.png');
                background-size: 22px 12px;
                background-repeat: no-repeat;
            }
            .bulletin-text {
                flex: 1;
                margin: 0 4px;
                font-size: 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

        }
        // 弹出层
        .detail {
            position: fixed;
            z-index: 100;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background: rgba(7, 17, 27, 0.8);
            &.fade-enter-active, &.fade-leave-active {
                transition: all 0.5s;
            }
            &.fade-enter, &.fade-leave-active {
                opacity: 0;
                background: rgba(255, 17, 27, 0);
            }

            display: flex;
            flex-direction: column;


            // 详情内容
            .detail-box {
                width: 100%;
                    margin-top: 64px;
                    padding-bottom: 64px;
                    // 标题
                    .name {
                        line-height: 16px;
                        text-align: center;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    // 星级评分
                    .star-box {
                        margin-top: 18px;
                        padding: 2px 0;
                        text-align: center;
                    }
                    // 优惠信息
                    .divider{
                        width: 80%;
                        margin: 28px auto 24px auto;
                        color:#fff;
                        font-size: 14px;
                        span.ivu-divider-inner-text{
                            font-weight: 700;
                            padding: 0 12px;
                        }
                        
                    }
                    .ivu-divider-horizontal.ivu-divider-with-text-center:before,.ivu-divider-horizontal.ivu-divider-with-text-center:after{
                        border-top: 1px solid rgba(255,255,255,.2)!important;
                    }
                    //  支持活动列表
                    .supports {
                        width: 80%;
                        margin: 0 auto;
                        .support-item {
                            padding: 0 12px;
                            margin-bottom: 12px;
                            font-size: 0;
                            &:last-child {
                                margin-bottom: 0;
                            }
                            .icon {
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                vertical-align: top;
                                margin-right: 6px;
                                background-size: 16px 16px;
                                background-repeat: no-repeat;
                                &.decrease {
                                   background-image: url('./decrease_2@2x.png');
                                }
                                &.discount {
                                   background-image: url('./discount_2@2x.png');
                                }
                                &.guarantee {
                                   background-image: url('./guarantee_2@2x.png');
                                }
                                &.invoice {
                                   background-image: url('./invoice_2@2x.png');
                                }
                                &.special {
                                   background-image: url('./special_2@2x.png');
                                }
                            }
                            .text {
                                line-height: 16px;
                                font-size: 12px;
                            }
                        }
                    } 

                    // 商家公告详情
                    .bulletin {
                        width: 80%;
                        margin: 0 auto;
                        .content {
                            padding: 0 12px;
                            line-height: 24px;
                            font-size: 12px;
                        }
                      }
            }
            
            // 关闭按钮
            .detail-close {
                position: relative;
                width: 32px;
                height: 32px;
                margin: 0 auto 0 auto;
                clear: both;
                font-size: 32px;
            }
        }
    }
</style>
