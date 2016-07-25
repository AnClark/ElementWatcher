/**
 * 网页元素变化监视模块
 * 跟踪一个网页元素（Element），当该元素的 innerHTML 发生变化时，运行用户所指定的函数，来响应元素的变化。
 * 现阶段只能监测 innerHTML 属性的变化，以后会考虑更上一层楼，在其他属性发生变化时，也能做出反应。
 *
 * 本模块使用阮一峰推荐的极简主义法编写。
 * Created by AnCla on 2016/7/23 0023.
 */

/**
 * 我的算法——踏步法
 * 设置两个字符串变量 stateLeft 和 stateRight，
 * 设置一个标志变量 stepState，为真时
 */

/**     注意！！！
 *  实例化本模块的代码必须放到</body>标签后面，使得实例化工作在网页主体完全加载后进行，否则会因网页元素未完全加载而出现空引用的问题！
 */

var ElementWatcher = {
    /** 构造函数
     * 在这里定义模块。在具体的程序中执行此构造函数，即可实例化本模块。
     * @param elementKeyword        用于定位元素的关键字。目前暂时只能为 id 属性。
     * @param checkInterval         监视模块监视的频率。
     * @param informerCallback      函数接口。指定在元素发生变化时要运行的用户函数。
     * @returns {{}}
     */
    createNew : function (elementKeyword, checkInterval, informerCallback) {
        var ew = {};        //定义一个实例对象。这相当于一块空的电路基板，所有的成员都要定义于其中。

        ew.targetElement = "";      //目标网页元素，由 getElementById 获取而成
        //将参数传递入本地变量
        ew.elementKeyword =elementKeyword;
        ew.checkInterval = checkInterval;
        ew.informerCallback = informerCallback;


        ew.stepState = false;
        ew.stepLeft = "";
        ew.stepRight = "";

        ew.timer = "";

        ew.init = function(){
            ew.targetElement = document.getElementById(ew.elementKeyword);

            ew.stepLeft = ew.targetElement.innerHTML;
            ew.stepRight = ew.targetElement.innerHTML;

            ew.timer = window.setInterval(ew.watcherCore, ew.checkInterval);
        };

        ew.watcherCore = function () {
            if(ew.stepState){
                ew.stepRight = ew.targetElement.innerHTML;
                if(ew.stepRight != ew.stepLeft)
                    ew.informerCallback();
                ew.stepLeft = ew.stepRight;
            }
            else{
                ew.stepLeft = ew.targetElement.innerHTML;
                if(ew.stepLeft != ew.stepRight)
                    ew.informerCallback();
                ew.stepRight = ew.stepLeft;
            }

            ew.stepState = !ew.stepState;
        }

        return ew;
    }  
};


