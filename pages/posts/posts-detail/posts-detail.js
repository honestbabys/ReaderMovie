var postsData = require('../../../data/posts-data.js')
Page({
    data: {
    },
    onLoad: function (option) {
        var postId = option.id;
        this.data.currentPostId = postId;
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

        /*
        var postsCollectd ={
            1:"true",
            2:"false",
            3:"true"
        }*/
        var postsCollected = wx.getStorageSync('posts_Collected');
        if (postsCollected) {
            var postCollected = postsCollected[postId];
            this.setData({
                collected: postCollected //绑定到collected供前端调用
            })
        }
        else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_Collected', postsCollected)
        }
    },

    onCollectionTap: function (event) {
        //同步操作 缓存获取 设置 清除 清除全部缓存
        //异步 对应4种
        var postsCollected = wx.getStorageSync('posts_Collected');
        var postCollected = postsCollected[this.data.currentPostId] //onLoad获取到的postid怎么传过来

        //收藏变未收藏
        postCollected = !postCollected;
        console.log(postCollected);
        postsCollected[this.data.currentPostId] = postCollected; //实际调试时报错
        this.showToast(postsCollected, postCollected);
    },

    onShareTap: function (event) {

    },

    showModal: function (postsCollected, postCollected) {
        var that = this;
        wx.showModal({
            title: '收藏',
            content: postCollected ? '是否收藏该文章' : '取消收藏该文章',
            showCancel: 'true',
            cancelText: '取消',
            cancelColor: '#333',
            confirmText: '确认',
            confirmColor: '#405f80',
            success: function (res) {
                if (res.confirm) {
                    //更新文章缓存值
                    wx.setStorageSync('posts_Collected', postsCollected);
                    //更新数据绑定变量,从而实现切换图片
                    that.setData({
                        collected: postCollected
                    })
                }
            }
        })
    },

    showToast: function (postsCollected, postCollected) {
        wx.setStorageSync('posts_Collected', postsCollected);
        //更新数据绑定变量,从而实现切换图片
        that.setData({
            collected: postCollected
        })
        wx.showToast({
            title: postCollected ? "收藏成功" : "取消成功",
            duration: 1000,
            icon: "sucess"
        })
    }
})