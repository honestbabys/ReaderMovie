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
    },
    
    onPostTap: function (event) {
        var postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
          url: 'posts-detail/posts-detail?id='+postId
        })
    },
    onSwiperTap: function (event) {
        //target 和 currentTargetarget
        //target指的是当前点击的组件 currentTarget指的是事件捕获的组件(事件是在swiper上捕获，但是点击的是imageimage )
        //target这里指的是imageimage 而currentTarget指的是swiper
        var postId = event.target.dataset.postid;
        wx.navigateTo({
          url: 'posts-detail/posts-detail?id='+postId
        })
    }
})