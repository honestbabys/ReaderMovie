var postsData = require('../../../data/posts-data.js')
Page({
    onLoad: function (option) {
        var postId = option.id;
        /*版本更新后后 这种赋值方式已失效
        var postData = postsData.postList[postId];
        this.data.postData = postData;
        //console.log( this.data.postData);
        */
        //如果在onLoad方法中，不是异步的去执行一个数据绑定
        //则不需要使用this.setData方法
        //只需要对this.data赋值即可实行数据绑定
        this.setData({
            postData: postsData.postList[postId]
        })
    }
})