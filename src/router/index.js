// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from "./routes";
// 使用插件
Vue.use(VueRouter);
// 引入store
import store from '@/store';

// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.Replace;

// 重写push|replace
// 第一个参数：告诉原来push方法, 你往哪里跳转 (传递那些参数)
// call || apply区别
// 相同点: 都可以调用函数一次, 都可以篡改函数的上下文一次
// 不同点: call与apply传递参数：call传递参数用逗号隔开,apply方法执行,传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router = new VueRouter({
    // 配置路由
    routes,
    scrollBehavior() {
        // return 期望滚动到哪个的位置
        // 返回的这个y=0,代表的轮动条在最上方
        return { y: 0 }
    }
})

// 全局守卫：前置守卫 (在路由跳转之间进行判断)
router.beforeEach(async (to, from, next) => {
    // to: 可以获取到你要跳转到那个路由信息
    // from: 可以获取到你从那个路由而来的信息
    // next: 放行函数  next()放行  next('/login') 放行到指定的路由  next(false)
    // next();

    // 用户登录了,才会有token,未登录一定不会有token
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    // 用户已经登录了
    if (token) {
        // 用户已经登录了 就休想去login组件了
        if (to.path == '/login') {
            // 不能去,停留在首页
            next('/home')
        } else {
            // 登录了，但是去的不是login
            // 如果用户名有
            if (name) {
                next()
            } else {
                // 没有用户信息，派发action让仓库存储用户信息在跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('user/getUserInfo')
                    next();
                } catch (error) {
                    // token失效了,获取不到用户信息 从新登录
                    // 清除token,及用户信息
                    store.dispatch('user/userLogout');
                    next('/login');
                }
            }
        }
    } else {
        // 未登录：不能去交易相关，不能去支付相关【pay|paysuccess】,不能去个人中心
        // 未登录去上面这些路由 --- 登录
        let toPath = to.path;
        if(toPath.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
            console.log(toPath);
            // 把未登录的时候 想去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect='+toPath)
        }else {
            // 去的笔试上面这些路由 (home|search|shopCart) --- 放行
            next();
        }
    }

});

export default router