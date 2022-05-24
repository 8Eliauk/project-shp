<template>
    <div>
        <TypeNav/>
        <ListContainer/> 
        <Recommend/>
        <Rank/>
        <Like/>
        <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
        <Brand/>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    // 引入其余的组件
    // 轮播图+右边栏
    import ListContainer from './LIstContainer';
    // 今日推荐
    import Recommend from './Recommend';
    // 热卖排行
    import Rank from './Rank';
    // 猜你喜欢
    import Like from './Like';
    // 家用商品+手机通讯
    import Floor from './Floor';
    // 底部logo
    import Brand from './Brand'

    export default {
        components:{
            ListContainer,
            Recommend,
            Rank,
            Like,
            Floor,
            Brand
        },
        mounted() {
            // 派发action, 获取floor组件的数据
            this.$store.dispatch('home/getFloorList');
        },
        computed: {
            ...mapState({
                floorList: (state) => state.home.floorList,
            })
        }
    }
</script>

<style lang="less" scoped>

</style>