import Vue from 'vue'
import App from './App.vue'
// 三级联动
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';

import { Button,MessageBox} from 'element-ui';
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
// 全局侧边导航
Vue.component(TypeNav.name, TypeNav);
// 全局轮播图
Vue.component(Carousel.name, Carousel);
// 全局分页器
Vue.component(Pagination.name, Pagination);
// 注册全局组件
Vue.component(Button.name, Button);
// ElementUI 注册组件的时候，还有一种写法，挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入MockServer.js----mock数据
import '@/mock/mockServe';
// 引入swiper样式
import "swiper/css/swiper.css"
Vue.config.productionTip = false

// 统一接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api';

// 引入 懒加载 插件
import VueLazyload from 'vue-lazyload';
// 引入gif加载图
import pkq from '@/assets/pkq.gif';
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认图
  loading:pkq
});

// 引入表单校验插件
import "@/plugins/validate";

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
    Vue.prototype.$API = API
  },
  render: h => h(App),
  // 注册路由信息
  router,
  // 注册仓库：组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')
