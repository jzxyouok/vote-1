var config = require("./util/config.js");
var listData = require("./util/paper.js");

App({
    onLaunch: function () {
        this.fetchList();
    },

    //全局登录函数
    userLogin:function(cb){
        var that = this;
        if(that.globalData.userInfo && that.globalData.openId){
            typeof cb == "function" && cb(that.globalData.openId,that.globalData.userInfo)
        }
        else{
            wx.login({
                success: function (resp) {
                    //根据code获取openId
                    wx.request({
                        url: config.produce + 'interface/userInfo.php?code=' + resp.code,
                        method:"GET",
                        header: {
                            'content-type': 'application/json;charset=utf-8'
                        },
                        dataType:"json",
                        success: function(resp) {
                            //记录openId
                            that.globalData.openId = resp.data.data.openId;
                            //获取用户信息
                            wx.getUserInfo({
                                success: function (res) {
                                    that.globalData.userInfo = res.userInfo;
                                    typeof cb == "function" && cb(that.globalData.openId,that.globalData.userInfo)
                                }
                            });

                        },
                        fail: function() {
                            wx.showToast({
                                title:"获取openId失败"
                            })
                        }
                    });
                }
            });
        }
    },

    //获取文章数据
    fetchList:function(){
        var that = this;
        that.globalData.listData = listData;
        /*wx.request({
            url: config.produce + 'data/paper.json',
            method:"GET",
            header: {
                'content-type': 'application/json',
                "dataType":"json"
            },
            success: function(resp) {
                that.globalData.listData = resp.data;
            },
            fail: function() {
                wx.showToast({
                    title:"获取列表失败"
                })
            }
        });*/
    },

    //全局数据
    globalData:{
        userInfo:null,
        openId:null,
        listData:[]
    }
});



