/**
 * Created by zcyue on 2017/9/7.
 */

var global = global||window;

global.JSLoader = (function(){

    // 加载的脚本队列
    var queueScripts = [];

    var exports = {};

    /**
     * 加载脚本
     * @param url 脚本地址
     * @param callback 回调
     * @param bOrder 是否有序加载
     */
    exports.loadScript = function (url, callback, bOrder){
        var iQ = queueScripts.length;
        if(bOrder){
            var qNode = { response: null, onload: callback, done: false };
            queueScripts[iQ] = qNode;
        }
        var xhrObj = getXHROject();
        xhrObj.onreadystatechange = function(){
            if(xhrObj.readyState == 4){
                if(xhrObj.status == 200){
                    if(bOrder){
                        // 有顺序要求的脚本需要添加的队列，按添加顺序执行
                        queueScripts[iQ].response = xhrObj.responseText;
                        // 执行脚本队列
                        injectScripts();
                    }else{
                        eval(xhrObj.responseText);
                        callback && callback();
                    }
                }else{
                    callback && callback(xhrObj.responseText);
                }
            }
        };

        // xhrObj.open("POST",url,true);
        // xhrObj.setRequestHeader("Content-type","application/x-www-four-urlencoded");
        xhrObj.open("GET", url, true);
        xhrObj.send({});
    };

    /**
     * 按顺序执行队列中的脚本
     */
    function injectScripts(){
        var len = queueScripts.length;
        for(var i=0; i<len; i++){
            var qScript = queueScripts[i];
            if(!qScript.done){
                if(!qScript.response){
                    break;
                }else{
                    eval(qScript.response);
                    if(qScript.onload){
                        qScript.onload();
                    }
                    qScript.done = true;
                }
            }
        }
    }

    /**
     * 创建XMLHttpRequest 对象
     * @returns {*}
     */
    function getXHROject(){
        var xmlhttp;
        if (window.XMLHttpRequest){
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }else{
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlhttp;
    }

    return exports || {};

})();
