import Card from '../../palette/card';
const app = getApp();

// src/pages/xml2can/xml2can.js
Page({
  imagePath: '',

  /**
   * 页面的初始数据
   */
  data: {
    test: "test",
    template: {},
    userInfo: {},
  },

  onImgOK(e) {
    this.imagePath = e.detail.path;
    console.log(e);
  },

  saveImage() {
    console.log("我点了保存"),
      wx.saveImageToPhotosAlbum({
        filePath: this.imagePath,
      });
    wx.showToast({
      title: "图片已保存到系统相册，快到朋友圈分享吧~",
      /** 系统默认的icon样式
       * 
       * "success" -> 成功        此时 title 文本最多显示 7 个汉字长度
       * "loading" -> 加载中      此时 title 文本最多显示 7 个汉字长度
       * "none"    -> 纯文字展示   此时 title 文本最多可显示两行
      */
      icon: "none",

      /** 提示的延迟时间
       * 单位毫秒，默认：1500
      */
      duration: 3000,
      /** 是否显示透明蒙层
       * 防止触摸穿透，默认：false
      */
      mask: false,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      template: new Card().palette(app.globalData.userInfo),
    });
    
  }
});
