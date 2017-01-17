Page({
  data: {
    defaultAct: 1, //1为定额0为材料
    showselect: true,
    emptyresult: true,
    history: [],
    result: {},
    pword: "",
    item: '',
    cid: '',
    name: ''
  },
  onLoad: function (options) {
    let that = this;
    let history = wx.getStorageSync('history') || [];
    that.setData({
      history: history,
      cid: options.cid,
      pword: options.pword,
      item: options.defaultAct,
      defaultAct: options.defaultAct
    });
    let mydata = {
      cid: that.data.cid,
      pword: that.data.pword,
      item: that.data.defaultAct
    }

    // 请求搜索结果
    that.queryResult(mydata);
  },
  submitForm: function (e) {
    let that = this;
    let keywords = e.detail.value;
    // record to history
    that.setHistory(keywords);

    let data = {
      cid: that.data.cid,
      pword: that.data.pword,
      item: that.data.defaultAct

    };
    // 请求搜索结果
    that.queryResult(data);

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
    if (this.data.pword.length > 0) {
      this.setHistory(this.data.pword);
      let mydata = {
        cid: this.data.cid,
        pword: this.data.pword,
        item: this.data.defaultAct
      }
      this.queryResult(mydata)
    }

  },
  godetail: function (e) {
    let that = this;
    let bookid = e.currentTarget.dataset.bookid;
    let itemid = e.currentTarget.dataset.itemsid;
    let viewname = e.currentTarget.dataset.viewname
    wx.navigateTo({
      url: '../detail/detail?book_id=' + bookid + '&item_id=' + itemid + '&viewname=' + viewname
    })
  },
  showAll: function (e) {
    let that = this;
    let bookid = e.currentTarget.dataset.bookid;
    let bookname = e.currentTarget.dataset.bookname;
    wx.navigateTo({
      url: '../searchall/searchall?book_id=' + bookid + '&pword=' + that.data.pword + '&item=' + that.data.defaultAct + '&name=' + bookname
    })
  },
  redirectIndex: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  setPword: function (e) {
    this.setData({
      pword: e.detail.value
    })
  },
  queryResult: function (data) {
    let that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: 'https://ssl.zhulong.com/?act=itemapi&serverid=75',
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        wx.hideToast();
        let data = res.data;
        if (data.errNo == 0) {
          that.setData({
            emptyresult: false,
            result: data.result
          });
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
  closeSelect: function (e) {
    this.setData({
      showselect: true
    });
  }
})