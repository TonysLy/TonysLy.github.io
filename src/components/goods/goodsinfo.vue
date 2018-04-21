<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section" v-if="goods.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
                            <div class="goods-spec">
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- 这里已经使用了双向数据绑定了，所以不要用change事件了 -->
                                              <!-- <el-input-number v-model="inputNumber" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number> -->
                                              <el-input-number size="small" v-model="goodsNumber" :min="1" :max="goods.goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button ref="addToShopCartBtn" @click="addToShopCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                             <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li @click="isShowContent=true">
                                            <a href="javascript:;" :class="isShowContent ? 'selected' : ''">商品介绍</a>
                                        </li>
                                        <li @click="isShowContent=false">
                                            <a href="javascript:;" :class="!isShowContent ? 'selected' : ''">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                                <div v-show="isShowContent" class="tab-content entry" style="display: block;">
                                <div v-html="goods.goodsinfo.content"></div>
                                </div>
                                <div v-show="!isShowContent" class="tab-content" style="display: block;">
                                    <div class="comment-box">
                                        <div id="commentForm" name="commentForm"
                                            class="form-box">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="conn-box">
                                                <div class="editor">
                                                    <textarea id="txtContent" ref="textAreaRef" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                    <span class="Validform_checktip"></span>
                                                </div>
                                                <div class="subcon">
                                                    <input id="btnSubmit" @click="postComment" name="submit" type="submit" value="提交评论" class="submit">
                                                    <span class="Validform_checktip"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <ul id="commentList" class="list-box">
                                            <p v-if="comment.totalcount == 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                            <li v-for="(item,index) in comment.message" :key="index">
                                                <div class="avatar-box">
                                                    <i class="iconfont icon-user-full"></i>
                                                </div> 
                                                <div class="inner-box">
                                                    <div class="info">
                                                        <span>{{item.user_name}}</span>
                                                        <span>{{item.add_time}}</span>
                                                    </div>
                                                    <p>{{item.content}}</p>
                                                </div>
                                            </li>
                                         
                                        </ul>
                                        <!-- 使用element-ui的分页组件 -->
                                        <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[5, 10, 20, 30]"
                                            :page-size="100"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="comment.totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goods.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/site/goodsinfo/`+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="`/site/goodsinfo/`+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time}}</span>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 被动画的元素 -->
        <transition  v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" >
            <div v-show="isShowAnimationImg" ref="animationRef" class="animation" v-if="goods.imglist">
                <img :src="goods.imglist[0].thumb_path" alt="" width="100%" height="100%">
            </div>
        </transition>
    </div>
</template>

<style scoped>
.animation {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 30px;
  top: 100px;
  transition: all 0.5s;
}
</style>


 <script>
//图钉（局部注册的方法）
import { Affix } from "iview"; //哪里用到就哪里导入组件  这样更符合模块化规则
import { bus,GOODSNUMBERCHANGE } from "../../common/commonvue.js";

export default {
  data() {
    return {
      goods: {}, //这里获得定义一个空对象  用来的接收获取的后台数据
      goodsNumber:1,   //商品的数量最低是为一的
      isShowContent: true,
      pageIndex: 1, //加载评论的页码数
      pageSize: 5, // 加载评论页容量数
      comment: {}, // 这里是用来接收分页的数据的
      addToShopCartOffset: null,
      shoppingCartCountOffset: null,
      isShowAnimationImg: false //是否显示购物车的动画缩略图 渲染完组件进来后 默认是隐藏的
    };
  },
  created() {
    this.getGoodsInfoData();
    this.getCommentData();
  },
  watch: {
    $route: function(newValue, oldValue) {
      this.getGoodsInfoData(); //这里的作用就是监听地址了有没发生变化，如有就调用数据请求方法从新给goods模型赋值新数据，相当于刷新数据，这样渲染在template的页面就重新刷新显示了
    }
  },
  methods: {
    getGoodsInfoData() {
      const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`;

      this.$axios.get(url).then(response => {
        this.goods = response.data.message;
        // 购物车的动画的偏移量代码
        setTimeout(() => {
          // 获取动画的开始位置
          this.addToShopCartOffset = $(this.$refs.addToShopCartBtn).offset();
          // console.log(this.addToShopCartOffset);

          // 获取动画结束的位置
          this.shoppingCartCountOffset = $("#shoppingCartCount").offset();
        //   console.log(this.shoppingCartCountOffset);
        

          // 设置div的top和left值
          $(this.$refs.animationRef)
            .css("left", this.addToShopCartOffset.left + "px")
            .css("top", this.addToShopCartOffset.top + "px");
        }, 200);
      });
    },
    getCommentData() {
      const url = `site/comment/getbypage/goods/${
        this.$route.params.goodsId
      }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;

      this.$axios.get(url).then(response => {
        this.comment = response.data;
      });
    },
    //和分页组件相关
    handleSizeChange(size) {
      // console.log(size);
      // 赋值给当前页的条数，然后重新渲染
      this.pageSize = size;
      this.pageIndex = 1;
      this.getCommentData();
    },
    handleCurrentChange(currentPageIndex) {
      // console.log(currentPageIndex);
      this.pageIndex = currentPageIndex;
      this.getCommentData();
    },
    // 这部分是提交评论
    postComment() {
      const commenttext = this.$refs.textAreaRef.value; //这一步就拿到了评论框里面的内容
      //评论框内不能为空
      if (commenttext.trim().length <= 0) {
        this.$message({
          message: "内容不能为空",
          type: "warning"
        });
        return;
      }
      const url = `site/validate/comment/post/goods/${
        this.$route.params.goodsId
      }`;
      this.$axios.post(url, { commenttxt }).then(response => {
        //   情况原先的内容
        this.$refs.textAreaRef.value = "";
        // 提示评论成功
        this.$message({
          message: "评论成功",
          type: "warning"
        });
        this.pageIndex = 1;
        this.getCommentData();
      });
    },
    addToShopCart() {
      // 加入购物车

      this.isShowAnimationImg = true;

      // 公共组件bus通过触发$emit事件来传递值（如现在就是要传递goodsNumber的值）
      bus.$emit("GOODSNUMBERCHANGE", this.goodsNumber);
    },
    // 动画相关的钩子
    beforeEnter: function(el) {
      // 设置动画开始时候的状态
      el.style.left = `${this.addToShopCartOffset.left}px`;
      el.style.top = `${this.addToShopCartOffset.top}px`;
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function(el, done) {
      // 刷新动画帧
      el.offsetWidth;

      el.style.left = `${this.shoppingCartCountOffset.left}px`;
      el.style.top = `${this.shoppingCartCountOffset.top}px`;

      done();
    },
    afterEnter: function(el) {
      //    隐藏飞到购物车的缩略图片
      this.isShowAnimationImg = false;
    },
    enterCancelled: function(el) {
      // ...
    }
  },
  components: {
    //这里就是局部注册组件的写法  组件是goodsinfo的组件的用的
    // Affix:Affix
    Affix //这种写法就是属性和值相同的请况下可以这样写
  }
};
</script>