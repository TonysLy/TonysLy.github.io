//这个目的是封装等下用的本地存储的方法  因为会多次用到，所以 就要封装起来方便调用
// 把加入到购物车的数据存储到（buycount） localStorage中

// 这里还可以把购物车中的数据从localstorage中删除

// 把购物车中的商品数量进行更改

// 上面每一步操作完后，需要重新统计总数，返回给vuex的  buycount
   

// 这里还有一点就是存储到localstorage里面的数格式是，如：{87:2,89：3,91:4}

const KEY = 'GOODS'    //这里是常量 

const getLocalGoods = ()=>{   
    return JSON.parse(localStorage.getItem(KEY) || "{}")  //这样写的目的是 无论有没数据都转成对象格式 
}

// 这里要获取本地存储的内容


const getTotalCount = () =>{
    const goodsObj = getLocalGoods()

    let totalCount = 0;
    //遍历对象的每一个键值对（di：count）------（87:5）这样子
    for(const key in goodsObj){
        totalCount += goodsObj[key]

    }
    return totalCount;
}



// 因为这里用到的方法比较多 所以要用到按需导出的方法

/**
 * 增加商品
 * 参数：
 *      goods是个商品的对象，里面包含id和数量（count）就是你要买的商品数量加到购物车的那个数量
 */

export const addGoodsCount =(goods) =>{
        //获取原先保存的数据
    const goodsObj = getLocalGoods()    // 这一步的做法是获取原先保存的数据

    // 进行商品数量的累加,如果原先有就数量累加到后面的，如果没有就新加一个商品的id和数量进那个对象
    if(goodsObj[goods.goodsId]){
        goodsObj[goods.goodsId] += goods.count
    }else{
        console.log(goods.count);
        goodsObj[goods.goodsId] = goods.count 
    }
    // 3、把上面获取的数据就是设置回localStorage中
    localStorage.setItem(KEY,JSON.stringify(goodsObj))


    // 4、把最新的商品总数返回
    return  getTotalCount()
}   