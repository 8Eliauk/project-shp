module.exports = {
    productionSourceMap:false,
    // 关闭eslint
    lintOnSave:false,
    // 代理垮域
    devServer: {
        proxy: {
            '/api':{
                target:'http://gmall-h5-api.atguigu.cn',
            }
        }
    }
}