Page({
  data: {
    logosrc: '../../image/de_logo.png',
    cid:'',
    name:''
  },
  onLoad: function (options) {
    // console.log(option.name); 获取获取 redirect 传过来的参数
    if(options.name==undefined){
      options.name="北京"
    }
    if(options.id==undefined){
      options.id="100000"
    }
    this.setData({
      cid:options.id,
      name:options.name
    })
  },
  directSearch: function () {
    wx.navigateTo({
      url: '../search/search?name='+this.data.name+'&id='+this.data.cid
    })
  },
  directCondition: function () {
    wx.redirectTo({
      url: '../condition/condition?name='+this.data.name+'&id='+this.data.cid
    })
  },
  onShareAppMessage: function () {
    return {
      title: '筑龙定额查询',
      desc: '筑龙定额查询（de.zhulong.com）-免费、高效的定额查询工具',
      path: '/pages/index/index'
    }
  }
})
