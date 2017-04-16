;(function ($) {
    "use strict";

    var dataList = [];
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

    //显示文章列表
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

    //绑定事件
    function bindEvents() {
        //去详情页面
        $("#list-container").on("click",".paperItem",function (e) {
            var ele = $(e.target).closest(".paperItem");
            var index = ele.data("index");
            window.location.hash = "#detail/" + index;
        });

        //点击投票
        $("#detail-container").on("click","button",function (e) {
            window.location.href = "./vote.html";
        });

        //监听锚点的改变
        window.addEventListener("hashchange", function(){
            document.documentElement.scrollTop = document.body.scrollTop =0;
            var hash = window.location.hash;
            //显示详情
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

    //显示详情页面
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
        dom += '</div></div><div class="detail-voteArea"><button class="detail-button">去点赞</button></div>';
        $("#detail-container").empty().append(dom);
    }

})(Zepto);
