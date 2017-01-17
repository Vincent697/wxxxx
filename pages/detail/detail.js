Page({
  data: {
    itemrow: {},
    arraymars: [],
    book_id:'',
    item_id:'',
    viewname:''
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    that.setData({
      book_id: options.book_id,
      item_id: options.item_id,
      viewname:options.viewname
    });
    wx.setNavigationBarTitle({
      title: this.data.viewname
    });
    wx.request({
      url: 'https://ssl.zhulong.com/index.php?act=itemdetailapi&serverid=75',
      data: {
        book_id: that.data.book_id,
        item_id: that.data.item_id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        that.setData({
          itemrow: res.data.result.itemrow,
          arraymars: res.data.result.arraymars
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '筑龙定额查询',
      desc: this.data.viewname,
      path: '/pages/detail/detail?book_id=' + this.data.book_id + '&item_id=' + this.data.item_id +'&viewname='+ this.data.viewname
    }
  }
})