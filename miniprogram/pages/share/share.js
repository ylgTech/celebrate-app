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
    province: null
  },

  onImgOK(e) {
    this.imagePath = e.detail.path;
    console.log(e);
  },

  saveImage() {
    console.log("我点了保存"),
      wx.saveImageToPhotosAlbum({
        filePath: this.imagePath,
        success: function () {
          wx.showToast({
            title: "图片已保存到系统相册，快到朋友圈分享吧~",
            icon: "none",
            duration: 3000,
            mask: false,
          })
        },
      fail: function () {
        wx.showToast({
          title: "呀图片丢失了。图片保存失败",
          icon: "none",
          duration: 3000,
          mask: false,
        })
        }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      template: new Card().palette(app.globalData.userInfo, app.globalData.province, app.globalData.count),
    });   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '来为中南大学组建20周年助力吧！',
      path: '/pages/nav/nav?id=' + 123,
      imageUrl: 'https://7265-release-rr1dn-1301509296.tcb.qcloud.la/minzhu.jpg?sign=f942d736de05279e603c33d2869bdc3c&t=1583934978',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  },
});
