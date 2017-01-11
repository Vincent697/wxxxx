Page({
    data: {
        history: [],
        hottopic: [],
        defaultAct: '查项目',
        showselect: true
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
        // wx.setStorage({
        //     key: 'history',
        //     data: ['asda', '维护的我', '范文芳', 'sdashuuh', 'dqwhduq', 'das', 'dq', 'd', 'dad']
        // });
        // wx.setStorage({
        //     key: 'hottopic',
        //     data: ['qwe', 'dqw', '地区稳定', '的请我厚度去外地', 'dqwdqwdqw']
        // })
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
        let that = this;
        // 清除搜索历史
        wx.removeStorage({
            key: 'history',
            success: function (res) {
                // 清除历史记录
                that.setData({
                    history: []
                })
            }
        })
    },
    submitForm: function (e) {

        let keywords = e.detail.value;
        // record to history
        let history = this.data.history;
        for (let i = 0, length = history.length; i < length; i++) {
            if (history[i] == keywords) {
                history.splice(keywords);
                return;
            }
        }
        history.unshift(keywords);
        if (history.length > 5) {
            history.length = 5
        }
        this.setData({
            history: history
        });
        wx.setStorage({
            key: 'history',
            data: history
        });
        // navigateTo serachlist
        wx.navigateTo({
            url: '../searchlist/searchlist'
        });
    },
    showSelect: function () {
        this.setData({
            showselect: false
        })
    },
    selectAct: function (e) {
        this.setData({
            defaultAct: e.target.dataset.val,
            showselect: true
        });
    }
})