// pages/movies/more-movie/more-movie.js
var utils = require('../../../utils/utils.js');
var app = getApp();
Page({
  data: {
    navigateTitle: "",
  },
  //需要确定是哪个类型的更多，页面之间需要传递参数
  onLoad: function (options) {
    var category = options.category;
    this.setData({
      navigateTitle: category
    })
    var dataUrl = "";
    switch (category) {
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    utils.http(dataUrl, this.callBack)
  },
  
  callBack: function (data) {
    console.log(data);
  },
  //动态设置导航条，只能在这个页面函数中
  onReady: function () {
    var category = this.data.navigateTitle;
    wx.setNavigationBarTitle({
      title: category
    })
  }
})