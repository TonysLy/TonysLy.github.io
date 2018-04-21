import Vue from 'vue'

//创建公共bus对象
const bus = new Vue()

const GOODSNUMBERCHANGE = 'GOODSNUMBERCHANGE'
//   要导出去  给别的组件使用


// 这个导出有几个注意点 就是要看是按需导出 还是默认导出  如果是按需导出的话要是用export{成员1，成员2..}  
// 如果是默认导出就是会只能导出一个对象  
export{bus,GOODSNUMBERCHANGE}

