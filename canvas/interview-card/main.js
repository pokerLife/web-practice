var option = {
    img: '111.jpg',
    width: 500,
    height: 350,
    fontSize: "20px Microsoft YaHei",
    color: "black",
    text: '守候',
    imgType: 'jpg',
    x: 30,
    y: 30,
    xCenter: false,
    yCenter: false,

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

}