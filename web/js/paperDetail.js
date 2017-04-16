var app = getApp();

Page({
    data:{
        paperid:"",
        author:"",
        title:"",
        subTitle:"",
        content:[]
    },
    
    onLoad:function(){
        var that = this;
        wx.getStorage({
            key: 'paperid',
            success: function(res) {
                that.setData({
                    paperid:res.data
                });
                that.fetchDetail();
            }
        });
    },

    onShow:function () {
        this.fetchDetail();
    },

    fetchDetail:function () {
        var detail = app.globalData.listData[this.data.paperid-1];
        this.setData({
            author:detail.author,
            title:detail.title,
            subTitle:detail.subTitle,
            content:detail.content
        });
    },

    goVote:function () {
        wx.navigateTo({
            url: '../vote/vote'
        });
    }
});
