//导入对应的文件
var postData = require('../../data/posts-data.js')
Page({
    data: {
        //小程序总是
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            posts_key: postData.postList //取文件中导出的参数
        });
    }
})