Page({
  data: {
    cid:'',
    name:'',
    citys: [],
    majors: [],
    selectH: [],
    searchname: '',
    searchid: '',
    show:''
  },
  onLoad: function (options) {
    var that=this;
    if(options.name==undefined){
      options.name="北京";
      options.id="100000"
    }
    this.setData({
      cid:options.id,
      name:options.name
    });
    wx.request({
      url: 'https://ssl.zhulong.com/?act=getregion&serverid=75',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
         that.setData({
          citys: res.data.result.regions,
          majors: res.data.result.industrys
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });  
    this.getStorage();
  },
  selectCity: function (e) {
    if (e.currentTarget.dataset.show) {
      this.setData({
        searchname: e.currentTarget.dataset.name,
        searchid: e.currentTarget.id,
        show:e.currentTarget.dataset.show
      })
      this.setStorage();
      wx.setStorageSync('cityId', e.currentTarget.id);
      wx.redirectTo({
        url: '../index/index?name='+this.data.searchname+'&id='+this.data.searchid
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '此分类下暂无定额项目',
        confirmColor:'#017ec1',
        showCancel:false
      })
    }

  },
  setStorage: function () {
    // 储存数据得时候可以异步存储

    var selectH = wx.getStorageSync('selectH') || [];
    var arrId = this.isArray(selectH, this.data.searchname);

    if (selectH.length >= 6) {
      if (arrId !== undefined) {
        selectH.splice(arrId, 1);
      } else {
        selectH.pop();
      }
    } else {
      if (arrId !== undefined) {
        selectH.splice(arrId, 1);
      }
    }
    selectH.unshift({
      searchname: this.data.searchname,
      id: this.data.searchid,
      show:this.data.show
    });
    wx.setStorageSync('selectH', selectH)
  },
  getStorage: function () {
    var StorageselectH = wx.getStorageSync('selectH');
    this.setData({
      selectH: StorageselectH
    })
  },
  isArray: function (a, b) {
    for (var i = 0; i < a.length; i++) {
      if (a[i].searchname == b)
        return i;
    }
  }
})