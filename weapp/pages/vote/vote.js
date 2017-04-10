var app = getApp();
var config = require("../../util/config.js");

Page({
    data: {
        userInfo: {},
        openId:"",
        listData: [],
        choices:"",
        choicesArr:[]
    },
    
    onPullDownRefresh: function(){
        wx.stopPullDownRefresh()
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

    //点击按钮进行投票
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
                            title:"投票成功",
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
                        title:"投票失败"
                    })
                }
            });
        }
        else{
            wx.showToast({
                title:"请选择1-5篇文章进行投票",
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
