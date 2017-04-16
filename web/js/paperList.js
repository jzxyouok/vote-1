;(function ($) {
    "use strict";

    var dataList = [];
    onInit();
    
    function onInit() {
        getList();
        bindEvents();
    }

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
            dom += '<div class="paperItem" data-index="'+ i +'"><div class="titleItem">'
                + data[i].title
                +  '<img class="titleArrow fr" src="../image/icons/arrow.png" /></div><div class="itemDetail"><div class="subTitle">'
                + data[i].subTitle
                + '</div><div class="author">作者：'
                + data[i].author
                + '</div></div></div>';
        }
        $("#list-container").append(dom);
    }
    
    function bindEvents() {
        $("#list-container").on("click",".paperItem",function (e) {
            var ele = $(e.target).closest(".paperItem");
            var index = ele.data("index");
            window.location.hash = "#detail/" + index;
        });

        //监听锚点的改变
        window.addEventListener("hashchange", function(){
            var hash = window.location.hash;
            if(hash.indexOf("#")>=0){
                hash = hash.substring(1);
                var hashArr = hash.split("/");
                var name = hashArr[0];
                var index = hashArr[1];
                $("#list-container").hide();
                buildDetail(index);
                $("#detail-container").show();
            }
            //显示列表
            else{
                $("#detail-container").hide();
                $("#list-container").show();
            }
        });
    }
    
    function buildDetail(index) {
        var obj = dataList[index];
        var dom = "";
        dom += '<div><div class="detail-paperItem"><div class="detail-titleItem">'
            + obj.title
            + '</div><div class="detail-itemDetail"><div class="detail-subTitle">'
            + obj.subTitle
            + '</div><div class="detail-author">作者：'
            + obj.author
            + '</div></div></div>'
            + '<div class="detail-textAreaBox">';

        for(var i=0;i<obj.content.length;i++){
            dom += '<div class="detail-paragraph">'+ "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
                + obj.content[i]
                + '</div>';
        }
        dom += '</div></div><div class="detail-voteArea"><button>去点赞</button></div>';
        $("#detail-container").empty().append(dom);
    }

})(Zepto);
