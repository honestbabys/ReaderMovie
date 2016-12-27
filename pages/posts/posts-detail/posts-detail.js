var postsData = require('../../../data/posts-data.js')
Page({
    onLoad:function(option){
        var postId = option.id;
        var postData = postsData.postList[postId];
        console.log(postData);
        //如果在onLoad方法中，不是异步的去执行一个数据绑定
        //则不需要使用this.setData方法
        //只需要对this.data赋值即可实行数据绑定
        this.data.postData = postData;
    }
})