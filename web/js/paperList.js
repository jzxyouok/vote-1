;(function ($) {
    "use strict";

    getList();

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
                    buildList(resp.data);
                }
                else{
                    window.UP.W.UI.showAlert(resp.msg, null, null, null, null,"错误提示");
                }
            },
            error: function (resp) {
                window.UP.W.UI.showAlert(resp.msg, null, null, null, null,"错误提示");
            }
        });
    }
    
    function buildList(data) {
        var dom = "";
        for(var i=0;i<data.length;i++){
            dom += '<div class="paperItem"><div class="titleItem">'
                + data[i].title
                +  '<img class="titleArrow fr" src="../image/icons/arrow.png" /></div><div class="itemDetail"><div class="subTitle">'
                + data[i].subTitle
                + '</div><div class="author">作者：' +
                + data[i].author
                + '</div></div></div>';
        }
        $("#list-container").append(dom);
    }

})(Zepto);
