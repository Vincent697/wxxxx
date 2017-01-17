Page({
  data: {
    result: [],
    book_id: '',
    pword: '',
    item: '1',
    page: 1, // 当前页
    pullmore: true,
    bookname:''
  },
  onLoad: function (options) {
    console.log(options);
    let that = this;
    // 动态设置当前页标题
    that.setData({
      book_id: options.book_id,
      pword: options.pword,
      item: options.item,
      bookname:options.name,
    });
    wx.setNavigationBarTitle({
      title: this.data.bookname
    });
    // 页面初始化 options为页面跳转所带来的参数
    // 获取查询列表
    wx.request({
      url: 'https://ssl.zhulong.com/?act=itemlistapi&serverid=75',
      data: {
        book_id: that.data.book_id,
        pword: that.data.pword,
        item: that.data.item,
        p: '1'
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        // success
        let data = res.data;
        if (data.errNo == 0) {
          that.setData({
            emptyresult: false,
            result: data.result.book.items||data.result.book.materials
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
  godetail: function (e) {
    let that = this;
    let bookid = this.data.book_id;
    let itemid = e.currentTarget.dataset.itemsid;
    let viewname=e.currentTarget.dataset.viewname
    wx.navigateTo({
      url: '../detail/detail?book_id=' + bookid + '&item_id=' + itemid +'&viewname=' + viewname
    });
  },
  onReachBottom: function () {
    if (this.data.pullmore) {
      let obj = this;
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      });
      // 获取查询列表
      wx.request({
        url: 'https://ssl.zhulong.com/?act=itemlistapi&serverid=75',
        data: {
          book_id: obj.data.book_id,
          pword: obj.data.pword,
          item: obj.data.item,
          p: (obj.data.page + 1)
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          // success
          let data = res.data;
          if (data.errNo == 0) {
            let result = obj.data.result.concat(data.result.book.items||data.result.book.materials);
            obj.setData({
              page: obj.page + 1,
              result: result
            });
          } else if (data.errNo == 2) {
            obj.setData({
              pullmore: false
            });
            wx.showToast({
              title: '最后一页了!',
              icon: 'success',
              duration: 10000
            });
          }
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      });
    }
  },
  onShareAppMessage: function () {
    return {
      title: '筑龙定额查询',
      desc: this.data.bookname,
      path: '/pages/searchall/searchall?book_id=' + this.data.book_id + '&pword=' + this.data.pword + '&item=' + this.data.item + '&name=' + this.data.bookname
    }
  }
})