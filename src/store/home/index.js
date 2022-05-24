import { reqCategoryList,reqGetBannerList, reqFloorList } from '@/api'
// state 仓库存储数据的地方
const state = {
    // 根据接口返回值初始化的 服务区返回值为对象 接收值为数组, 服务器返回值为数组 接收值也为数组
    categoryList: [],
    // 轮播图的数据
    bannerList:[],
    // floot 组件的数据
    floorList:[]
};
// mutations 修改state 的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList.slice(0, categoryList.length - 2)
    },
    GETBANNERLIST(state,bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList) {
        state.floorList = floorList
    }
};
// actions 处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 这里可以书写业务逻辑，但是不能修改 state
    // 通过API里面的接口函数调用,向服务器发请求, 获取服务器的数据
    async categoryList(content) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            content.commit('CATEGORYLIST', result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}) {
        let result = await reqGetBannerList();
        if(result.code == 200) {
            commit('GETBANNERLIST',result.data)
        }
    },
    // 获取floor数据
    async getFloorList({commit}) {
        let result = await reqFloorList();
        if(result.code == 200) {
            commit('GETFLOORLIST',result.data)
        }
    }
};
// getters 理解为计算属性, 用于简化仓库数据, 让组件获取仓库的数据更加方便
const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}






