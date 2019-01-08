var option = {
    img: '111.jpg',
    width: 500,
    height: 350,
    fontSize: "20px Microsoft YaHei",
    color: "#fff",
    text: '守候',
    imgType: 'jpg',
    x: 30,
    y: 30,
    xCenter: false,
    yCenter: false
};

/**
 * 画图
 * @param obj 画图选项
 */
function draw(obj) {
    var canvas = document.getElementById('thecanvas');
    canvas.width = obj.width;
    canvas.height = obj.height;
    var ctx = canvas.getContext('2d');
    //设置图片
    var img = new Image();
    img.src = obj.img;
    //设置字体坐标
    var _x = obj.x;
    var _y = obj.y;
    // 是否居中显示
    if (obj.xCenter) {
        _x = obj.width / 2;
    }
    if (obj.yCenter) {
        _y = obj.height / 2;
    }
    // 图片加载后
    img.onload = function () {
        //先画图片
        ctx.drawImage(img, 0, 0);
        //设置文字大小
        ctx.font = obj.fontSize;
        //设置文字的颜色
        ctx.fillStyle = obj.color;
        //设置文字坐标
        if (obj.xCenter) {
            ctx.textAlign = "center";
        }
        //画文字
        ctx.fillText(obj.text, _x, _y);
    }
}

window.onload = function () {
    draw(option);
}

//画布尺寸
var size = document.getElementById("size");
size.addEventListener("blur", function () {
        //根据空格，区分高宽
        var _width = parseInt(size.value.replace(/(^\s*)|(\s*$)/g,"").split(/\s+/)[ 0]),
            _height = parseInt(size.value.replace(/(^\s*)|(\s*$)/g,"").split(/\s+/)[1]);
        //把参数的width和height改掉
        option.width = _width || 100;
        option.height = _height || 100;
        //重新画图
        draw(option);
});