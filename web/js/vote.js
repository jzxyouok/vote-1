;(function ($) {
    "use strict";

    var dataList = [];
    var choicesStr = "";
    var choicesArr = [];
    var voter = "";
    onInit();

    //初始化
    function onInit() {
        getList();
        bindEvents();
    }

    //获取文章列表
    function getList() {
        window.UP.W.UI.showLoading("数据加载中");
        $.ajax({
            type: 'GET',
            url: 'https://weapp.zhanghao90.cn/vote/data/paper.json',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (resp) {
                window.UP.W.UI.dismiss();
                if(resp.code == '00') {
                    dataList = resp.data;
                    buildList(resp.data);
                }
                else{
                    window.UP.W.UI.showAlert("获取列表失败", null, null, null, null,"提示");
                }
            },
            error: function (resp) {
                window.UP.W.UI.showAlert("获取列表失败", null, null, null, null,"提示");
            }
        });
    }

    //显示投票列表
    function buildList(data) {
        var dom = "";
        dom += '<div class="hint">请选择1--5篇文章点个赞，每个微信号只能赞一次。</div><div class="checkbox">';
        for(var i=0;i<data.length;i++){
            dom += '<div class="listItem"><input type="checkbox" name="vote" value="'
                + data[i].index
                + '" />'
                + data[i].author
                + '：'
                + data[i].title
                + '</div>';
        }
        dom += '</div><div class="voteArea"><div class="voter">投票人姓名：<input type="text" class="voterInput"/></div><button class="voteButton">确认点赞</button></div>';
        $("#vote-container").append(dom);
    }



    //绑定事件
    function bindEvents() {
        //投票
        $("#vote-container").on("click","button",function () {
            getChoices();
            buildChoices();
            vote();
        });
    }

    //进行投票
    function vote(){
        voter = $(".voterInput").eq(0).val();
        if(voter!= ""){
            if(checkNum()){
                window.UP.W.UI.showLoading("数据加载中");
                $.ajax({
                    type: 'GET',
                    url: 'https://weapp.zhanghao90.cn/vote/interface/vote.php?choices=' + choicesStr + '&voter=' + voter,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (resp) {
                        window.UP.W.UI.dismiss();
                        if(resp.code == '00') {
                            window.UP.W.UI.showAlert(resp.msg, function(){
                                window.location.href = "./rankList.html";
                            }, null, null, null,"提示");
                        }
                        else{
                            window.UP.W.UI.showAlert(resp.msg, null, null, null, null,"提示");
                        }
                    },
                    error: function (resp) {
                        window.UP.W.UI.showAlert(resp.msg, null, null, null, null,"提示");
                    }
                });
            }
            else{
                window.UP.W.UI.showAlert("请选择1-5篇文章", null, null, null, null,"提示");
            }
        }
        else{
            window.UP.W.UI.showAlert("请填写姓名", null, null, null, null,"提示");
        }
    }

    //获取投票选项
    function getChoices() {
        var arr = [];
        var items = document.getElementsByName("vote");
        for (var i = 0; i < items.length; i++) {
            if (items[i].checked) {
                arr.push(items[i].value);
            }
        }
        choicesArr = arr;
    }

    //拼接字符串
    function buildChoices() {
        var value = choicesArr;
        var choices = "";
        for(var i=0;i<value.length-1;i++){
            choices += value[i];
            choices += "_";
        }
        choices += value[value.length - 1];
        choicesStr = choices;
    }

    //检查是否少于5项
    function checkNum() {
        var arr = choicesArr;
        if(arr.length <= 5 && arr.length > 0){
            return true;
        }
        else {
            return false;
        }
    }


})(Zepto);