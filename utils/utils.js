//将评分转化为数组形式，如三颗星，为为[1,1,1,0,0]
function covertToStarsArray(stars) {
    var num = stars.toString().substring(0, 1); //取首位确定几颗星
    var array = [];
    for (var i=1; i<=5; i++) {
        if (i <= num) {
            array.push(1);
        }
        else {
            array.push(0);
        }
    }
    return array;
}

//导出为covertToStarsArray
module.exports = {
    covertToStarsArray: covertToStarsArray
}
