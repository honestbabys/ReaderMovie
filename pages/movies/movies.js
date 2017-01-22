var utils = require('../../utils/utils.js')
var app = getApp();
//不指定data中的key为空值会报错
Page({
    data: ({
        inTheaters: {},
        commingSoon: {},
        top250: {}
    }),
    onLoad: function (event) {
        var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?start=0&count=3";
        var commingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon?start=0&count=3";
        var top250Url = app.globalData.doubanBase + "/v2/movie/top250?start=0&count=3";
        this.getMovieList(inTheatersUrl, "inTheaters", "正在热映");
        this.getMovieList(commingSoonUrl, "commingSoon", "即将上映");
        this.getMovieList(top250Url, "top250", "豆瓣top250");
    },

    getMovieList: function (url, settedKey, categoryTitle) {
        var that = this;
        wx.request({
            url: url, //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'json' //application/json无法调用成功
            },
            success: function (res) {
                console.log(res.data);
                that.processDoubanData(res.data, settedKey, categoryTitle)
            }
        })
    },

    processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
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
        var readyData = {};
        readyData[settedKey] = ({
            categoryTitle: categoryTitle,
            movies: movies
        })
        this.setData(readyData)
    }
})