<template>
  <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in goodsData.catelist" :key= "item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id" >
                                                {{subitem.title}}&nbsp; 
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a  v-for="subitem2 in item.subcates" :key="subitem2.id" href="/goods/43.html">{{subitem2.title}}</a>
                                               
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                                <el-carousel :interval="4000"  height="341px">     <!-- 这里可以加个type样式改变轮播图的样子 -->
                                    <el-carousel-item v-for="item in goodsData.sliderlist" :key="item.id">
                                        <img :src="item.img_url" alt="">
                                    </el-carousel-item>
                                </el-carousel>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in goodsData.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time}}</span>
                                </div>
                            </li>
                          
                        </ul>
                    </div>
                </div>
            </div>
        </div>
         <div v-for="item in goodsGroupData" :key="item.level1cateid" class="section">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="subitem in item.level2catelist" :key="subitem.subcateid" href="/goods/43.html">{{subitem.subcatetitle}}</a>
                   
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="subitem in item.datas" :key="subitem.artID">
                            <router-link :to="`/site/goodsinfo/`+subitem.artID" class="">
                                <div class="img-box">
                                    <img v-lazy="subitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{subitem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{subitem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{subitem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{subitem.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>


<style>
.el-carousel__container {
  height: 341px;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>


<script>
import axios from "axios";

import common from "../../common/common.js"; //这里导入的就是被抽离到公共js文件的api 这个公共的文件还有加入一些共用到的文件内容

export default {
  data() {
    return {
      //这里会返回后台的数据  定义一个空的对象来接收
      goodsData: {},        //首页头部部分展示（分类、轮播图、排行榜）
      goodsGroupData:[]
    };
  },
  created() {
    //这个钩子是表示这个组件执行完后再调用
    this.getGoodsData();
    this.getgoodsGroupData();
  },
  methods: {
    //获取购物商场商城上面部分展示需要的数据
    getGoodsData() {
      //   console.log(this);
      //   console.log(common);
      const url = "site/goods/gettopdata/goods";
      //   const url = site/goods/gettopdata/goods·;

      this.$axios.get(url).then(response => {
        // console.log(response);
        // console.log(response.data)
        this.goodsData = response.data.message
        // console.log(this);
      });
    },
    //获取首页商品列表的数据
    getgoodsGroupData(){
        console.log( this);
        const url = `site/goods/getgoodsgroup`
        this.$axios.get(url).then(response=>{
            this.goodsGroupData =response.data.message

        })
    }
  }
};
</script>
