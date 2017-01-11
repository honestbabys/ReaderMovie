App({
    globalData: {
        g_isPlayingMusic: false,
        g_currentMusicPostId: null
    },
    onLaunch: function () {
        wx.clearStorageSync();
        console.log("清除缓存");
    }
})

