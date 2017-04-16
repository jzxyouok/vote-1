;(function ($) {
    "use strict";

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



    //绑定事件
    function bindEvents() {



    }



})(Zepto);

Page({
    data: {
        userInfo: {},
        openId:"",
        listData: [],
        choices:"",
        choicesArr:[]
    },


    onLoad: function () {
        var that = this;
        app.userLogin(function(openId,userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo,
                openId:openId
            });
        });
        that.setData({
            listData:app.globalData.listData
        });
    },

    //点击按钮进行点赞
    vote:function () {
        var that = this;
        if(that.checkNum(that.data.choicesArr)){
            wx.request({
                url: config.produce + "interface/vote.php?choices=" + that.data.choices +"&voter=" + that.data.openId,
                method:"GET",
                header: {
                    'content-type': 'application/json',
                    "dataType":"json"
                },
                success: function(resp) {
                    if(resp.data.code == "00"){
                        wx.showToast({
                            title:"点赞成功",
                            complete:function () {
                                wx.switchTab({
                                    url: 'pages/rankList/rankList'
                                });
                            }
                        })
                    }
                    else{
                        wx.showToast({
                            title:resp.data.msg
                        })
                    }
                },
                fail: function() {
                    wx.showToast({
                        title:"点赞失败"
                    })
                }
            });
        }
        else{
            wx.showToast({
                title:"请选择1-5篇文章",
                icon:"loading"
            })
        }
    },

    //勾选某一项时触发
    checkboxChange: function(e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);
        this.setData({
            choicesArr:e.detail.value
        });
        this.buildChoices(e.detail.value);
    },

    //拼接字符串
    buildChoices:function (value) {
        var that = this;
        var choices = "";
        for(var i=0;i<value.length-1;i++){
            choices += value[i];
            choices += "_";
        }
        choices += value[value.length - 1];
        that.setData({
            choices:choices
        });
    },

    //检查是否少于5项
    checkNum:function (arr) {
        if(arr.length <= 5 && arr.length > 0){
            return true;
        }
        else {
            return false;
        }
    }
});
