<template>
    <div>
        <!-- 1.0首页效果 -->
        <div class="header">
            <!-- 1.0 导航栏头部 -->
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>买买买</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <span style="display: none;">
                            <a href="" class="">登录</a>
                            <strong>|</strong>
                            <a href="" class="">注册</a>
                            <strong>|</strong>
                        </span>
                        <span>
                            <a href="" class="">会员中心</a>
                            <strong>|</strong>
                            <a>退出</a>
                            <strong>|</strong>
                        </span>
                        <router-link id="shoppingCartCount" to="/site/shopcart" class="">
                            <i class="iconfont icon-cart"></i>购物车(
                            <span >
                                <span id="shopCartNumberId">{{count}}</span>
                            </span>)</router-link>
                    </div>
                </div>
            </div>

            <!--  2.0 导航条 -->
            <div class="head-nav">
                <div class="section">
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">首页</span>
                                </a>
                            </li>
                            <li class="news">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">每日精选</span>
                                </a>
                            </li>
                            <li class="photo">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">秒杀专区</span>
                                </a>
                            </li>
                            <li class="video">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">黑马超市</span>
                                </a>
                            </li>
                            <li class="down">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">会员权益</span>
                                </a>
                            </li>
                            <li class="goods">
                                <router-link to="/site/goodslist" class="router-link-exact-active ">
                                    <span class="out" style="top: 0px;">购物商城</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 2.1路由占位符 -->
        <router-view class="routerViewBg"></router-view>
        <!-- 3.0底部效果 -->
         <div class="footer">
        <div class="section">
            <div class="foot-nav">
                <a href="">关于我们</a>
                <strong>|</strong>
                <a href="">联系我们</a>
                <strong>|</strong>
                <a href="">联系客服</a>
                <strong>|</strong>
                <a href="">合作招商</a>
                <strong>|</strong>
                <a href="">商家帮助</a>
                <strong>|</strong>
                <a href="">营销中心</a>
                <strong>|</strong>
                <a href="">隐私政策</a>
            </div>
            <div class="foot-box">
                <div class="copyright">
                    <p>版权所有 黑马买买买 </p>
                    <p>公司地址： 联系电话：</p>
                    <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                </div>
                <div class="service">
                    <p>周一至周日 9:00-24:00</p>
                    <a href="#">
                        <i class="iconfont icon-phone"></i>在线客服</a>
                </div>
            </div>
        </div>
    </div>
    </div>




</template>



<style scoped>
/*scoped  这里私有的意思  服务于单个组件*/
@import "./statics/site/js/jqueryPlugins/hoverNav/css/style.css";

.routerViewBg {
  background-color: yellowgreen;
}
</style>

<script>
import {bus,GOODSNUMBERCHANGE} from './common/commonvue.js'

export default {
  //相当于 module export  的都是导出与这个组件相匹配的业务逻辑，而且还是对象  这个对象是Vue对象，并且必须导出
  data() {
    return {
        count:0
    };
  },
  created(){

    //   因为这里的this会执行window所以要做个处理
    // 方法一：const _this = this
    // 方法二：函数.bind(this)
    // 方法三：可以使用箭头函数
    bus.$on('GOODSNUMBERCHANGE', count => this.count+= count)
    // bus.$on('GOODSNUMBERCHANGE', function (count) {
    //     this.count+= count
    
    // }.bind(this))
  },
  mounted() {
    //这里有个难点，就是要等着这个组件的页面加载完毕后，在执行业务逻辑的，就要把逻辑写在生命周期的钩子里面，这是vue的写法，写在 mounted

    $("#menu2 li a").wrapInner('<span class="out"></span>');
    $("#menu2 li a").each(function() {
      $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
    });
    $("#menu2 li a").hover(
      function() {
        $(".out", this)
          .stop()
          .animate({ top: "48px" }, 300); // move down - hide
        $(".over", this)
          .stop()
          .animate({ top: "0px" }, 300); // move down - show
      },
      function() {
        $(".out", this)
          .stop()
          .animate({ top: "0px" }, 300); // move up - show
        $(".over", this)
          .stop()
          .animate({ top: "-48px" }, 300); // move up - hide
      }
    );
  }
};
</script>
