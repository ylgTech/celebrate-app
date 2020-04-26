// miniprogram/pages/nav.js

const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMusic()
    var that = this
    backgroundAudioManager.onPlay(() => {
      that.setData({
        isPlay: true
      })
    })
    backgroundAudioManager.onPause(() => {
      that.setData({
        isPlay: false
      })
    })
    backgroundAudioManager.onEnded(() => {
      that.setData({
        isPlay: false
      })
    })
    backgroundAudioManager.onStop(() => {
      that.setData({
        isPlay: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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

  nav: function() {
    wx.navigateTo({
      url: '../index/index'
    })
  },

  /**
   * 加载背景音乐
   */
  loadMusic: function () {
    backgroundAudioManager.title = 'intro'
    backgroundAudioManager.singer = '王备'
    backgroundAudioManager.coverImgUrl = 'http://p1.music.126.net/I0ME5FKTUqvXmn1k2-qKQA==/109951162865708042.jpg?param=130y130'
    backgroundAudioManager.src = 'http://music.163.com/song/media/outer/url?id=457492084.mp3'
    backgroundAudioManager.startTime = 32

  },

})