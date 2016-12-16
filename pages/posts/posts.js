Page({
    data: {
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var post_content1 = {
            date: "Nov 14 2016",
            title: "正是虾肥蟹壮时",
            post_img: "/images/posts/crab.png",
            content: "金秋九月囤虾时。中秋节前后，正是各家各户囤虾时。市民们少则几百元，动辄上千元地买虾囤起来，就是为了冬季还能吃上味美..",
            view_num: "112",
            collect_num: "96",
            author_img: "/images/avatar/1.png"
        }
        this.setData(post_content1);
    },
    onReady: function () {
        // 页面渲染完成
        console.log("onReady");

    },
    onShow: function () {
        // 页面显示
        console.log("onShow");

    },
    onHide: function () {
        // 页面隐藏
        console.log("onHide");

    },
    onUnload: function () {
        // 页面关闭
        console.log("onUnload");

    }
})