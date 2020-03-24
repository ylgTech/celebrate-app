//app.js
App({

  globalData: {
    userInfo: null,
    openid: null,
    avatarUrl: null,
    province: null
  },

  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    var _this = this;

    //获取用户登录信息(是否签到)
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求,由于是异步执行，需要加回调函数
          console.log(res.code)
          wx.getUserInfo({            
            success: function (res) {
              console.log(res.data);
              _this.userInfo = res.userInfo
              _this.avatarUrl= res.userInfo.avatarUrl             
            
            },
            fail: function () {
             
              console.log('fail')
            },
            
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },

    });

    //查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              _this.globalData.userInfo = res.userInfo;
              _this.globalData.avatarUrl = res.userInfo.avatarUrl;           

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (_this.userInfoReadyCallback) {
                _this.userInfoReadyCallback(res)
              }
            }
          })
        } 
      }
    });
  }
})
