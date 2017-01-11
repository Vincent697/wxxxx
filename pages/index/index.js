//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    logosrc: '../../image/de_logo.png'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  directSearch: function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  directCondition: function(){
    console.log("a");
    wx.navigateTo({
      url: '../condition/condition'
    })
  }
})
