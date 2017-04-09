var app = getApp();

Page({
    data: {
        listData:[]
    },

    onLoad: function() {
        this.setData({
            listData:app.globalData.listData
        });
    },

    goDetail:function(e){
        wx.setStorage({
            key: 'paperid',
            data: parseInt(e.currentTarget.dataset.paperid),
            success: function() {
                wx.navigateTo({
                    url: '../paperDetail/paperDetail'
                })
            }
        });
    }
});
