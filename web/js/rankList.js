;(function ($) {
    "use strict";

    var rankList = [];
    onInit();

    //初始化
    function onInit() {
        getList();
    }

    //获取文章列表
    function getList() {
        window.UP.W.UI.showLoading("数据加载中");
        $.ajax({
            type: 'GET',
            url: 'https://weapp.zhanghao90.cn/vote/interface/rank.php',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (resp) {
                window.UP.W.UI.dismiss();
                if(resp.code == '00') {
                    rankList = resp.data;
                    buildList(rankList);
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

    //显示列表
    function buildList(data) {
        var dom = "";
        for(var i=0;i<data.length;i++){
            dom += '<div class="rank-paperItem fl"><div class="rank-rankNum fl">'
                + (i+1)
                + '</div><div class="rank-title fl">'
                + data[i].name
                + '</div><div class="rank-voteNum fr">'
                + data[i].vote_num
                + '</div><img class="rank-star fr" src="../image/icons/star.png" /></div>';
        }
        $("#rank-container").append(dom);
    }

})(Zepto);