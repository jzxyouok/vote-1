var config = require("../../util/config.js");
Page({
    data: {
        rankList: []
    },

    onLoad: function () {
        this.fetchList();

    },
    
    onPullDownRefresh: function(){
        wx.stopPullDownRefresh()
    },


    fetchList:function(){
        var that = this;
        wx.request({
            url: config.produce + "interface/rank.php",
            method:"GET",
            header: {
                'content-type': 'application/json',
                "dataType":"json"
            },
            success: function(resp) {
                that.setData({
                    rankList:resp.data.data
                });
            },
            fail: function() {
                wx.showToast({
                    title:"获取排名列表失败"
                })
            }
        });
    }

});