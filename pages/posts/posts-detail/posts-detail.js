var postsData = require('../../../data/posts-data.js')
var app = getApp(); //引入全局变量
Page({
    data: {
        isplayingMusic: false,
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

        /*假设保存的缓存形式
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
            });
        }
        else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_Collected', postsCollected);
        }
        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
            this.setData({
                isplayingMusic: true
            })
        }
        this.setMusicMonitor();
    },

    setMusicMonitor: function () {
        //function中的this不是当前的this了了，作用域发生了变化，还不是很理解
        var that = this;
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isplayingMusic: true
            })
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusicPostId = that.data.currentPostId;
        });
        wx.onBackgroundAudioPause(function () {
            that.setData({
                isplayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        })
    },

    onCollectionTap: function (event) {
        //同步操作 缓存获取 设置 清除 清除全部缓存
        //异步 对应4种
        this.getPostsCollectedSyc();
        //this.getPostsCollectedAsy();
    },

    getPostsCollectedSyc: function () {
        //同步操作 缓存获取 设置 清除 清除全部缓存
        //异步 对应4种
        var postsCollected = wx.getStorageSync('posts_Collected');
        console.log(postsCollected);
        var postCollected = postsCollected[this.data.currentPostId] //onLoad获取到的postid怎么传过来

        //收藏变未收藏
        postCollected = !postCollected;
        console.log(postCollected);
        console.log(postsCollected);
        postsCollected[this.data.currentPostId] = postCollected;
        wx.setStorageSync('posts_Collected', postsCollected);
        //更新数据绑定变量,从而实现切换图片
        this.setData({
            collected: postCollected
        })
        wx.showToast({
            title: postCollected ? "收藏成功" : "取消成功",
            duration: 1000,
            icon: "sucess"
        })
    },

    getPostsCollectedAsy: function () {
        var that = this;
        wx.getStorage({
            key: 'posts_Collected',
            success: function (res) {
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.currentPostId] //onLoad获取到的postid怎么传过来

                //收藏变未收藏
                postCollected = !postCollected;
                console.log(postCollected);
                postsCollected[that.data.currentPostId] = postCollected; //实际调试时报错
                that.showToast(postsCollected, postCollected);

            }
        })

    },

    onShareTap: function (event) {
        var itemList = [
            '分享到微信',
            '分享到QQ',
            '分享到微博'];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function (res) {
                if (!res.cancel) {
                    wx.showModal({
                        title: "用户" + itemList[res.tapIndex],
                        content: "无法实现分享功能"
                    })
                    console.log(res.tapIndex)
                }
            }
        })
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

    //封装成函数后调用有误，稍后再改
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
    },

    onMusicTap: function (event) {
        var currentPostId = this.data.currentPostId;
        var postData = postsData.postList[currentPostId]
        if (this.data.isplayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isplayingMusic: false
            });

        } else {
            wx.playBackgroundAudio({
                dataUrl: postData.music.url,
                title: postData.music.title,
                coverImgUrl: postData.music.coverImg
            });
            this.setData({
                isplayingMusic: true
            })
        }
    }
})