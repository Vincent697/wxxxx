Page({
    data: {
        history: [],
        hottopic: [],
        defaultAct: 1,
        showselect: true,
        cid: '',
        cname: '',
        pword: ''
    },
    onLoad: function (options) {

        // 动态设置当前页标题
        wx.setNavigationBarTitle({
            title: '查询'
        });
        let history = wx.getStorageSync('history') || [];
        let hottopic = wx.getStorageSync('hottopic') || [];
        let that = this;
        that.setData({
            history: history,
            hottopic: hottopic,
            cid: options.id || '100000',
            cname: options.name
        });
        // 获取热门搜索
        wx.request({
            url: 'https://ssl.zhulong.com/index.php?act=getnewlist&serverid=75',
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            success: function (res) {
                // success
                let data = res.data;
                if (data.errNo == 0) {
                    let hottopic = [];
                    for (let i = 0; i < data.result.newlists.length; i++) {
                        hottopic.push(data.result.newlists[i])
                    }

                    that.setData({
                        hottopic: hottopic
                    })
                }
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
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
        // navigateTo serachlist
        if (keywords.length > 0) {
            // record to history
            this.setHistory(keywords);
            wx.navigateTo({
                url: '../searchlist/searchlist?pword=' + keywords + '&cid=' + this.data.cid + '&defaultAct=' + this.data.defaultAct
            });
        }
    },
    selectSubmit: function (e) {
        let keywords = e.currentTarget.dataset.val;
        // record to history
        this.setHistory(keywords);
        // navigateTo serachlist
        wx.navigateTo({
            url: '../searchlist/searchlist?pword=' + keywords + '&cid=' + this.data.cid + '&defaultAct=' + this.data.defaultAct
        });
    },
    goDetail: function (e) {
        let bookid = e.currentTarget.dataset.bookid;
        let itemid = e.currentTarget.dataset.itemsid;
        let viewname=e.currentTarget.dataset.viewname
        wx.navigateTo({
            url: '../detail/detail?book_id=' + bookid + '&item_id=' + itemid +'&viewname=' + viewname
        })
    },
    showSelect: function () {
        this.setData({
            showselect: false
        })
    },
    selectAct: function (e) {
        this.setData({
            defaultAct: e.currentTarget.dataset.val,
            showselect: true
        });
    },
    setPword: function (e) {
        this.setData({
            pword: e.detail.value
        })
    },
    redirectIndex: function () {
        wx.redirectTo({
            url: '../index/index'
        })
    },
    setHistory: function (keywords) {
        let history = this.data.history;
        for (let i = 0, length = history.length; i < length; i++) {
            if (history[i] == keywords) {
                history.splice(i, 1);
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
    },
    gereralArrR: function (arr) {// 从一个数组中随机返回任意n个值组成新的数组
        var tempArr = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            var randomIndex = parseInt(Math.random() * i);
            var temp = arr[randomIndex];
            arr[randomIndex] = arr[i];
            arr[i] = temp;
        }
        this.setData({
            hottopic: arr
        })
    },
    randomSelect: function () {
        let arr = this.data.hottopic;
        this.gereralArrR(arr);
    },
    closeSelect:function(e){
        this.setData({
            showselect: true
        });
    }
})