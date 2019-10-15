/**
* 工具库函数
*/

const Library = {
    // 获取地址栏参数（#前）
    getQuery(name) {
        // @params: name => 想要获取的地址栏参数（eg: www.abc.com?id=2&type=museum; getQueryFn('type')）
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    },
    // 函数节流
    throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(context);
        }, 500)
    },
    // 正则类型验证
    typeValidate(str, type) {
        // @params: str => 验证字符串, type => 验证类型（email/idCard/phone/number/postalcode）
        let email = /^[\w|.]+[@]\w+[.][\w.]+$/;
        let idCard = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
        let phone = /^1[3|4|5|6|7|8|9]\d{9}$/;
        let postalcode = /^\d{6}$/;
        let chinese = /[^\a-zA-Z\u4E00-\u9FA5]/g; // 汉字/拼音
        let number = /\D/g;
        let a_num = /\W/g; // 仅限数字、字母、下划线 等价于[^A-Za-z0-9_]
        // ams 平台通用
        let password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,30}$/; // 密码为6～30位字符，且为字母和数字组合。（不能为纯数字或纯字母）
        let merchant_name = /^[\u4e00-\u9fa5_0-9A-Za-z]{1,50}$/; // 商户名正则 => 1～50个字符，支持中文/字母/数字/下划线
        // ***设备名正则 (2-30个字符，暂无正则)
        let real_name = /^[\u4e00-\u9fa5_0-9A-Za-z]{1,30}$/; // 真实姓名正则 => 1～30个字符，支持中文/字母/数字/下划线
        let login_name = /^(?![0-9]+$)[0-9A-Za-z@._]{1,50}$/; // 登录姓名正则 => 1～50个字符，支持字母/数字/下划线/@/.，不能为全数字
        let device_name = /^[\u4e00-\u9fa5_0-9A-Za-z]{1,50}$/; //摄像机名称正则 => 1～50字符，可包含字母/数字/中文/下划线，可为全字母，全数字，全下划线或者全中文，不支持表情
        let bool = false;
        switch (type) {
            case 'email':
                bool = email.test(str);
                break;
            case 'idCard':
                bool = idCard.test(str);
                break;
            case 'phone':
                bool = phone.test(str);
                break;
            case 'postalcode':
                bool = postalcode.test(str);
                break;
            case 'chinese':
                bool = !chinese.test(str);
                break;
            case 'number':
                bool = !number.test(str);
                break;
            case 'password':
                bool = !password.test(str);
                break;
            case 'merchant_name':
                bool = !merchant_name.test(str);
                break;
            case 'real_name':
                bool = !real_name.test(str);
                break;
            case 'login_name':
                bool = !login_name.test(str);
                break;
            case 'device_name':
                bool = !device_name.test(str);
                break;
            default:
                alert('未知类型');
        }
        return bool; //@return: true => 通过, false => 不通过返回
    },
    // 时间戳 ＝> 年－月－日 时：分
    timeToYMDHMS(time, type) {
        // @params: time => 时间戳（ms）
        let timeTranslate = function (num) {
            return num < 10 ? `0${num}` : num
        };
        let date = new Date(parseInt(time));
        let y = 1900 + date.getYear();
        let m = timeTranslate(date.getMonth() + 1);
        let d = timeTranslate(date.getDate());
        let h = timeTranslate(date.getHours());
        let min = timeTranslate(date.getMinutes());
        let s = timeTranslate(date.getSeconds());
        let str = '';
        switch (type) {
            case 'YY-MM-DD':
                str = `${y}-${m}-${d}`;
                break;
            case 'YY-MM-DD H:M:S':
                str = `${y}-${m}-${d} ${h}:${min}:${s}`;
                break;
            case 'H:M:S':
                str = `${h}:${min}:${s}`;
                break;
            case 'objDate':
                str = { y, m, d, h, min, s };
                break;
            default:
                str = `${y}-${m}-${d} ${h}:${min}:${s}`;
                break;
        }
        return str;
    },
    // 控制浏览器全屏函数
    //进入全屏
    enterFullScreen() {
        var ele = document.documentElement;
        if (ele.requestFullscreen) {
            ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullScreen) {
            ele.webkitRequestFullScreen();
        }
    },
    //退出全屏
    exitFullscreen() {
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    },
    // 动态控制元素进入全屏
    launchFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    },
    // arrary => object (eg: [label:'元素', value: 1] => {1: '元素'})，必须为lable & value
    arraryToObject(arrary, key) {
        let Obj = {};
        for (let i = 0; i < arrary.length; i++) {
            let item = arrary[i];
            Obj[item.value] = item.label;
        }
        return Obj[key];
    },
    // 获取n个月后的今天（没有当天的向前推）
    getDate(n) {
        // @params: n => 整数，表示n 个月后
        let baseMonthsDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //各月天数(默认2月为平年)
        let currentDate = new Date();
        let y = currentDate.getFullYear();
        let m = currentDate.getMonth() + 1;
        let d = currentDate.getDate();
        //判断平年（28）/闰年（29）
        function isRunYear(fullYear) {
            return (fullYear % 4 == 0 && (fullYear % 100 != 0 || fullYear % 400 == 0));
        };
        // n 个月后的时间
        let later_y = y;
        let later_m = (m + n) % 12;
        if (m + n > 12) {
            later_y = later_y + 1;
        }
        let later_d = d;
        // 闰年
        if (later_m === 2 && isRunYear(later_y)) {
            baseMonthsDay[1] = 29;
        }
        // 今天大于 28 号，则取n个月的最后一天（比如，今天 12-31，取 03-30）
        if (later_d > 28) {
            later_d = baseMonthsDay[later_m - 1];
        }
        return `${later_y}-${later_m}-${later_d}`;
    },
    //检测flash是否加载 By hq  
    flashChecker() {
        var hasFlash = false; // 是否安装了flash
        var isIE = /*@cc_on!@*/0; //是否IE浏览器
        if (isIE) {
            var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (swf) {
                hasFlash = true;
            }
        } else {
            if (navigator.plugins && navigator.plugins.length > 0) {
                var swf = navigator.plugins["Shockwave Flash"];
                if (swf) {
                    hasFlash = true;
                }
            }
        }
        return hasFlash;
    },
    // 生成不重复ID
    createRandomId() {
        return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
    }


};

export default Library;


