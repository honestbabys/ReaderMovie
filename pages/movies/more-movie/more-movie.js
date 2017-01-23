// pages/movies/more-movie/more-movie.js
var utils = require('../../../utils/utils.js');
var app = getApp();
Page({
  data: {
    navigateTitle: "",
    movies: {}, //setData的时候不加空的对应的数据结构，会报错。为什么呐，未知
    requestUrl: "",
    totalCount: 0,
    isEmpty: 0
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
    this.data.requestUrl = dataUrl;
    utils.http(dataUrl, this.processDoubanData)
  },

  //动态设置导航条，只能在这个页面函数中
  onReady: function () {
    var category = this.data.navigateTitle;
    wx.setNavigationBarTitle({
      title: category
    })
  },
  //回调函数，处理数据
  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var tmp = {
        stars: utils.covertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieID: subject.id
      }
      movies.push(tmp);
    }
    var totalMovies = {};
    //如果要绑定新加载的数据，需要将原来的数据合并在一起
    if (!this.data.isEmpty) {
      console.log("movies=" + typeof (movies));
      console.log("this.data.movies=" + typeof (this.data.movies));
      //totalMovies = this.data.movies.concat(movies);编译不过，咱叔屏蔽
      totalMovies = movies;
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  //向下滚动，加载更多数据
  onScrollLower: function (event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    utils.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.movies = {};
    this.data.empty = true;
    utils.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  }
})