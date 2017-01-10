Page({
    data: {
        history: [],
        hottopic: []
    },
    onLoad: function (options) {
        let history = wx.getStorageSync('history') || [];
        let hottopic = wx.getStorageSync('hottopic') || [];
        let that = this;
        that.setData({
            history: history,
            hottopic: hottopic
        });
        console.log(this.data.history);
        // 页面初始化 options为页面跳转所带来的参数
        wx.setStorage({
          key: 'history',
          data: ['asda','维护的我','范文芳','sdashuuh','dqwhduq','das','dq','d','dad']
        });
        wx.setStorage({
          key: 'hottopic',
          data: ['qwe','dqw','地区稳定','的请我厚度去外地','dqwdqwdqw']
        })
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    clearhistory: function () {
        let that=this;
        // 清除搜索历史
        wx.removeStorage({
          key: 'history',
          success: function(res){
            // that.setData({
            //     history: []
            // })
          }
        })
    },
    submitForm: function (e) {
        // 提交搜索
        wx.showToast({
            title: e.detail.value,
            icon: 'success',
            duration: 2000
        })
        console.log(e.detail.value)
    },
    getval:function(e){
        console.log(e);
    }
})