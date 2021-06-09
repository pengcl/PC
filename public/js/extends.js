function preventDefault(event) {
    if (document.all) {
        window.event.returnValue = false;
    } else {
        event.preventDefault();
    }
}


//获取对象或数组中选中对象的index
function getIndex(jsonArray, keyName, value) {
    for (var i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i][keyName] == value) {
            return i;
        }
    }
};

function findIndex(jsonArray, keyName1, value1, keyName2, value2) {
    for (var i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i][keyName1] == value1 && jsonArray[i][keyName2] == value2) {
            return i;
        }
    }
};

function getCurrentMenu(id) {
    var menu;
    appMenus.forEach(function (item) {
        if (item.id == id) {
            item.content = item.content ? marked(item.content) : ''
            menu = item;
        }
    })
    return menu
}

function getCurrentMenus(id) {
    var menus = [];
    appMenus.forEach(function (menu) {
        if (menu.menu && menu.menu.id === id) {
            menus.push(menu)
        }
    })
    return menus
}

//回到页面顶部
function toTop() {
    $("html,body").animate({
        scrollTop: $("body").offset().top
    }, 500, 'swing');
}

function formData(body) {
    var form = new FormData();
    for (var kn in body) {
        if (body) {
            form.set(kn, body[kn] === undefined ? '' : body[kn]);
        }
    }
    return form;
}

function formDataToUrl(body, ifFist) {
    var str = '';
    for (var keyName in body) {
        if (!str && ifFist) {
            str = '?' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(body[keyName]));
        } else {
            str = str + '&' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(body[keyName]));
        }
    }
    return str;
}

var ua = navigator.userAgent;


var SKUResult = {};

function getObjKeys(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj)
        if (Object.prototype.hasOwnProperty.call(obj, key))
            keys[keys.length] = key;
    return keys;
}

//把组合的key放入结果集SKUResult
function add2SKUResult(combArrItem, sku) {
    var key = combArrItem.join(";");
    if (SKUResult[key]) {//SKU信息key属性·
        SKUResult[key].id += sku.id;
        SKUResult[key].price = sku.price;
    } else {
        SKUResult[key] = {
            id: sku.id,
            price: sku.price
        };
    }
}

//初始化得到结果集
function initSKU() {
    var i, j, skuKeys = getObjKeys(data);
    for (i = 0; i < skuKeys.length; i++) {
        var skuKey = skuKeys[i];//一条SKU信息key
        var sku = data[skuKey];	//一条SKU信息value
        var skuKeyAttrs = skuKey.split(";"); //SKU信息key属性值数组
        var len = skuKeyAttrs.length;


        //对每个SKU信息key属性值进行拆分组合
        var combArr = arrayCombine(skuKeyAttrs);
        for (j = 0; j < combArr.length; j++) {
            add2SKUResult(combArr[j], sku);
        }

        //结果集接放入SKUResult
        SKUResult[skuKey] = {
            id: sku.id,
            price: sku.price
        }
    }
}

/**
 * 从数组中生成指定长度的组合
 */
function arrayCombine(targetArr) {
    if (!targetArr || !targetArr.length) {
        return [];
    }

    var len = targetArr.length;
    var resultArrs = [];

    // 所有组合
    for (var n = 1; n < len; n++) {
        var flagArrs = getFlagArrs(len, n);
        while (flagArrs.length) {
            var flagArr = flagArrs.shift();
            var combArr = [];
            for (var i = 0; i < len; i++) {
                flagArr[i] && combArr.push(targetArr[i]);
            }
            resultArrs.push(combArr);
        }
    }

    return resultArrs;
}


/**
 * 获得从m中取n的所有组合
 */
function getFlagArrs(m, n) {
    if (!n || n < 1) {
        return [];
    }

    var resultArrs = [],
        flagArr = [],
        isEnd = false,
        i, j, leftCnt;

    for (i = 0; i < m; i++) {
        flagArr[i] = i < n ? 1 : 0;
    }

    resultArrs.push(flagArr.concat());

    while (!isEnd) {
        leftCnt = 0;
        for (i = 0; i < m - 1; i++) {
            if (flagArr[i] == 1 && flagArr[i + 1] == 0) {
                for (j = 0; j < i; j++) {
                    flagArr[j] = j < leftCnt ? 1 : 0;
                }
                flagArr[i] = 0;
                flagArr[i + 1] = 1;
                var aTmp = flagArr.concat();
                resultArrs.push(aTmp);
                if (aTmp.slice(-n).join("").indexOf('0') == -1) {
                    isEnd = true;
                }
                break;
            }
            flagArr[i] == 1 && leftCnt++;
        }
    }
    return resultArrs;
}

function listToTree(list) {
    var copyList = list.slice(0);
    var tree = [];
    // tslint:disable-next-line:prefer-for-of
    for (var i = 0; i < copyList.length; i++) {
        // 找出每一项的父节点，并将其作为父节点的children
        // tslint:disable-next-line:prefer-for-of
        for (var j = 0; j < copyList.length; j++) {
            if (copyList[i].parentId === copyList[j].id) {
                if (copyList[j].children === undefined) {
                    copyList[j].children = [];
                }
                copyList[j].children.push(copyList[i]);
            }
        }
        // 把根节点提取出来，parentId为null的就是根节点
        if (copyList[i].parentId === 0) {
            tree.push(copyList[i]);
        }
    }
    return tree;
}

//根据开始日期和结束日期获取所有日期的方法
function get(day1, day2) {
    var date1 = getDate(day1);
    var date2 = getDate(day2);
    if (date1.getTime() > date2.getTime()) {
        var tempDate = date1;
        date1 = date2;
        date2 = tempDate;
    }
    if (day1 > day2) {
        var tempDate = day1;
        day1 = day2;
        day2 = tempDate;
    }
    if (date1.getTime() === date2.getTime()) {
        date1.setDate(date1.getDate() - 1);
    }
    date1.setDate(date1.getDate() + 1);
    var dateArr = [];
    var i = 0;
    while (!(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate())) {
        var dayStr = date1.getDate().toString();
        if (dayStr.length == 1) {
            dayStr = "0" + dayStr;
        }
        var monthStr = (date1.getMonth() + 1).toString();
        if (monthStr.length == 1) {
            monthStr = "0" + monthStr;
        }
        dateArr[i] = date1.getFullYear() + "-" + monthStr + "-" + dayStr;
        i++;
        date1.setDate(date1.getDate() + 1);
    }
    if (day1 !== day2) {
        dateArr.splice(0, 0, day1);
    }
    dateArr.push(day2);
    return dateArr;
}

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//时间戳转换成日期格式
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    /*var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();*/
    return Y + M + D;
}

function minDate() {
    var now = new Date();
    return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
}

function tick() {
    var today;
    today = new Date();
    document.getElementById("timesss").innerHTML = showLocale(today);
    window.setTimeout("tick()", 1000);
}

function slide() {
    $(function () {
        var flag = true; //防止用户快速多次点击
        var zoom_n = 1;//鼠标滚轮缩放

        init(); //初始化
        //点击切换图片
        $(".move-img").click(function () {
            $(".move-img").removeClass('active');
            $(this).addClass('active');
            var thisSrc = $(this).attr('src');
            $(".big-img img").attr('src', thisSrc);//获取点击图片的地址并赋值
            $(".big-img .img-parent").attr('style', '');//切换图片从正位开始
            zoom_n = 1;
            $(".big-img .img-parent img").css('transform', 'scale(1)');
        });
        //左右移动
        $(".smallimg .move-left").on('click', function () {
            flag ? left() : "";
        });

        $(".smallimg .move-right").on('click', function () {
            flag ? right() : "";
        });

        function left() {
            flag = false;
            //计算最后
            var imgPosition = $(".move-img:last").offset().left + $(".move-img:last").width();
            var boxPosition = $(".smallimg").offset().left + $(".smallimg").width();
            if (imgPosition >= boxPosition) {
                $('.smallimg ul').animate({
                    left: '-=105'
                }, 500, function () {
                    flag = true;
                });
            } else {
                flag = true;
            }
        }

        function right() {
            flag = false;
            //计算第一个
            var imgPosition = $(".move-img:first").offset().left;
            var boxPosition = $(".smallimg").offset().left;
            if (imgPosition < boxPosition) {
                $('.smallimg ul').animate({
                    left: '+=105'
                }, 500, function () {
                    flag = true;
                });
            } else {
                flag = true;
            }
        }

        function init() {
            var numImg = $('.move-img').length;
            //重新定义ul 宽度
            $(".smallimg ul").css('width', numImg * 105 + 'px');
            $($('.move-img')[0]).addClass('active'); //第一个给默认选中
            $(".big-img img").attr('src', $($('.move-img')[0]).attr('src'));
        }


        //图片拖拽
        var $div_img = $(".big-img .img-parent");
        //绑定鼠标左键按住事件
        $div_img.bind("mousedown", function (event) {
            event.preventDefault && event.preventDefault(); //去掉图片拖动响应
            //获取需要拖动节点的坐标
            var offset_x = $(this)[0].offsetLeft;//x坐标
            var offset_y = $(this)[0].offsetTop;//y坐标
            //获取当前鼠标的坐标
            var mouse_x = event.pageX;
            var mouse_y = event.pageY;
            //绑定拖动事件
            //由于拖动时，可能鼠标会移出元素，所以应该使用全局（document）元素
            $(".big-img .img-parent").bind("mousemove", function (ev) {
                // 计算鼠标移动了的位置
                var _x = ev.pageX - mouse_x;
                var _y = ev.pageY - mouse_y;
                //设置移动后的元素坐标
                var now_x = (offset_x + _x) + "px";
                var now_y = (offset_y + _y) + "px";
                //改变目标元素的位置
                $div_img.css({
                    top: now_y,
                    left: now_x
                });
            });
        });
        //当鼠标左键松开，接触事件绑定
        $(".big-img .img-parent").bind("mouseup", function () {
            $(this).unbind("mousemove");
        });


        //旋转
        var spin_n = 0;
        $(".img-rotate.left").click(function () {
            spin_n -= 15;
            $(".big-img .img-parent").css({
                "transform": " rotate(" + spin_n + "deg)",
                "-moz-transform": " rotate(" + spin_n + "deg)",
                "-ms-transform": " rotate(" + spin_n + "deg)",
                "-o-transform": " rotate(" + spin_n + "deg)",
                "-webkit-transform": " rotate(" + spin_n + "deg)"
            });
        });
        $(".img-rotate.right").click(function () {
            spin_n += 15;
            $(".big-img .img-parent").css({
                "transform": " rotate(" + spin_n + "deg) ",
                "-moz-transform": " rotate(" + spin_n + "deg) ",
                "-ms-transform": " rotate(" + spin_n + "deg)",
                "-o-transform": " rotate(" + spin_n + "deg)",
                "-webkit-transform": " rotate(" + spin_n + "deg)"
            });
        });


        //鼠标滚轮缩放图片
        function zoomImg(o, delta) {
            if (delta == 'up') {
                zoom_n -= 0.1;
                zoom_n = zoom_n <= 0.1 ? 0.1 : zoom_n;
            } else {
                zoom_n += 0.1;
            }
            $(".big-img .img-parent img").css({
                "transform": "scale(" + zoom_n + ")",
                "-moz-transform": "scale(" + zoom_n + ")",
                "-ms-transform": "scale(" + zoom_n + ")",
                "-o-transform": "scale(" + zoom_n + ")",
                "-webkit-transform": "scale(" + zoom_n + ")"
            });
        }

        //绑定鼠标滚轮缩放图片
        $(".big-img .img-parent img").bind("mousewheel DOMMouseScroll", function (e) {
            console.log(1231);
            e = e || window.event;
            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail;
            var dir = delta > 0 ? 'up' : 'down';
            zoomImg(this, dir);
            return false;
        });
    });

}

function swiper() {
    $(function () {

            var swiper = document.querySelector(".swiper");
            var pic = swiper.querySelectorAll(".pic li");
            var btns = swiper.querySelector(".btns");
            var cricle = swiper.querySelector(".cricle");
            var leftbtn = swiper.querySelector(".leftbtn");
            var rightbtn = swiper.querySelector(".rightbtn");
            var leftBox = swiper.querySelector(".leftBox");
            var rightBox = swiper.querySelector(".rightBox");

            //获取元素


            //清除图片类名
            function clearPicName() {
                // pic.forEach(function (ele) {
                //   ele.className = "";
                // });
                for (var i = 0; i < pic.length; i++) {
                    pic[i].className = "";
                }
            }

            function leave() {
                btns.style.display = "none";
                timer = setInterval(function () {
                    rightbtn.click();
                }, 2000);
            }

            var timer = setInterval(function () {
                rightbtn.click();
            }, 3000);
            swiper.addEventListener("mouseenter", function () {
                btns.style.display = "block";
                clearInterval(timer);
                swiper.removeEventListener("mouseleave", leave);
                swiper.addEventListener("mouseleave", leave);
            });
            //动态生成小圆点
            var lili = "";
            // pic.forEach(function () {
            //   lis += "<li></li>";
            // });
            for (var j = 0; j < pic.length; j++) {
                lili += "<li></li>";
            }
            cricle.innerHTML = lili;
            //获取动态生成的小圆点
            var lis = cricle.querySelectorAll("li");
            lis[0].className = "_bg";

            //清楚小圆点类名
            function clearCricleName() {
                // lis.forEach(function (ele) {
                //   ele.className = "";
                // });
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                }
            }

            var pic_index = 0;
            //满足ie的特殊癖好
            var lisArr = [];
            for (var i = 0; i < lis.length; i++) {
                lisArr.push(lis[i]);
            }

            lisArr.forEach(function (ele, i) {
                ele.addEventListener("mouseenter", function () {
                    clearCricleName();
                    ele.className = "_bg";
                    //记住索引值
                    var index = i;
                    clearPicName();

                    //上一张
                    i = i == 0 ? lisArr.length : i;
                    pic[i - 1].className = "prev";
                    //恢复索引
                    i = index;

                    //当前
                    pic[i].className = "now";

                    //下一张
                    i = i == lisArr.length - 1 ? -1 : i;
                    pic[i + 1].className = "next";
                    //恢复索引
                    i = index;
                    pic_index = i;
                });
            });

            //左按钮
            leftbtn.addEventListener("click", function () {
                pic_index--;
                pic_index = pic_index < 0 ? pic.length - 1 : pic_index;

                var index = pic_index;
                clearPicName();

                //上一张;
                pic_index = pic_index == 0 ? pic.length : pic_index;
                pic[pic_index - 1].className = "prev";
                pic_index = index;

                //当前
                pic[pic_index].className = "now";
                clearCricleName();
                lis[pic_index].className = "_bg";

                //下一张
                pic_index = pic_index == pic.length - 1 ? -1 : pic_index;
                pic[pic_index + 1].className = "next";
                pic_index = index;
            });

            //右按钮
            rightbtn.addEventListener("click", function () {
                pic_index++;
                pic_index = pic_index == pic.length ? 0 : pic_index;
                var index = pic_index;
                clearPicName();
                //上一张
                pic_index = pic_index == 0 ? pic.length : pic_index;
                pic[pic_index - 1].className = "prev";
                pic_index = index;
                //当前
                pic[pic_index].className = "now";
                clearCricleName();
                lis[pic_index].className = "_bg";

                //下一张
                pic_index = pic_index == pic.length - 1 ? -1 : pic_index;
                pic[pic_index + 1].className = "next";
            });
            //点击图片轮播
            leftBox.addEventListener("click", function () {
                leftbtn.click();
            });
            rightBox.addEventListener("click", function () {
                rightbtn.click();
            });
    });


}

function adds() {
    var items = document.querySelectorAll('.animatedNum');
    var start = [0, 0, 0];
    //要累加的数值
    var end = [6000, 4500, 1200];
    var set = null;
    var speed = 20;
    // 每次累加的数值 分情况如果两个数值相差过多 不同的阶段累加不同的数值完成
    var addNum1 = 20;
    var addNum2 = 50;
    set = setInterval(function () {
        for (var i = 0; i < items.length; i++) {
            // 进行对比
            if (start[i] >= end[i]) {
                start[i] = end[i];
                items[i].innerHTML = start[i] + '+';
                // 当大于所有数值中最大的一个时结束累加
                if (items[i].innerHTML >= 6001) {
                    clearInterval(set);
                }
            } else {
                start[i] += addNum1;
                // 对比是否要分不同的累加阶段
                if (start >= 5000) {
                    start[i] += addNum2;
                }
            }
            items[i].innerHTML = start[i] + '+';
        }
    }, speed);
}






