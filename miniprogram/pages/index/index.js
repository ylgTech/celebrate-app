//index.js
//获取应用实例
const app = getApp();
// const backgroundAudioManager = wx.getBackgroundAudioManager()

// 中国地图的最东西南北端经纬度信息
var chinaRegion = [{
  longitude: 135.04166666666666,
  latitude: 3.8666666666666667,
}, {
  longitude: 73.66666666666667,
  latitude: 53.55,
}];

function proItem(proName) {
  this.proName = proName;
}

function markerItem(id, longitude, latitude, iconPath) {
  this.id = id;
  this.longitude = longitude;
  this.latitude = latitude;
  this.iconPath = iconPath;
}

function markerItem(id, longitude, latitude, iconPath, isUser) {
  this.id = id;
  this.longitude = longitude;
  this.latitude = latitude;
  this.iconPath = iconPath;
  this.zIndex = 999;
}

Page({
  data: {
    // 屏幕高度
    windowHeight: 0,
    // 经纬度信息
    longitude: null,
    latitude: null,
    //地图缩放级别
    scale: 3,
    // 标点信息
    markers: [],
    userInfo: null,
    openid: app.globalData.openid,
    province: null,
    avatarUrl: app.globalData.avatarUrl,
    total: 0,
    popup: null,
    // 标记音乐是否播放
    isPlay: false,
    // 按钮是否禁用 防止多次点击
    disabled: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this;
    //判断是否已经有用户授权登录
    if (app.globalData.userInfo) {
      console.log("yes");
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
      console.log(this.data.userInfo);
    } else if (_this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        _this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          _this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    }

    this.getAvatarUrl()
    this.onGetOpenid()
    // this.loadMusic()
    var that = this
    // backgroundAudioManager.onPlay(() => {
    //   that.setData({
    //     isPlay: true
    //   })
    // })
    // backgroundAudioManager.onPause(() => {
    //   that.setData({
    //     isPlay: false
    //   })
    // })
    // backgroundAudioManager.onEnded(() => {
    //   that.setData({
    //     isPlay: false
    //   })
    // })
    // backgroundAudioManager.onStop(() => {
    //   that.setData({
    //     isPlay: false
    //   })
    // })
  },
  /**
   * 右上角分享功能实现
   */
onShareAppMessage:function(res){
  var that = this;
  return {
    title:'来为中南大学组建20周年助力吧！',
    path:'/pages/nav/nav?id='+123,
    imageUrl: 'https://7265-release-rr1dn-1301509296.tcb.qcloud.la/minzhu.jpg?sign=f942d736de05279e603c33d2869bdc3c&t=1583934978',
    success:function(res){

    },
    fail:function(res){

    }
  }
},
  /**
   * 加载背景音乐
   */
  // loadMusic: function () {
  //   backgroundAudioManager.title = 'intro'
  //   backgroundAudioManager.singer = '王备'
  //   backgroundAudioManager.coverImgUrl = 'http://p1.music.126.net/I0ME5FKTUqvXmn1k2-qKQA==/109951162865708042.jpg?param=130y130'
  //   backgroundAudioManager.src = 'http://music.163.com/song/media/outer/url?id=457492084.mp3'
  //   backgroundAudioManager.startTime = 32
    
  // },

  /**
   * 获取头像url
   */
  getAvatarUrl: function(){
    var that = this
    // 获取用户头像
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              app.globalData.avatarUrl = res.userInfo.avatarUrl
              that.data.avatarUrl = res.userInfo.avatarUrl
              // console.log(that.data.avatarUrl)
            }
          })
        }
      }
    })
  },

  /**
   * 点击button获取用户信息
   */
  onGotUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
    that.data.avatarUrl = e.detail.userInfo.avatarUrl
  },

  /**
   * 获取openid
   */
  onGetOpenid: function () {
    var that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        that.data.openid = res.result.openid
        this.getFlagLocation()
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.popup = this.selectComponent("#popup");
    this.getWindowHeight()
    this.mapCtx = wx.createMapContext('myMap')
    this.showChinaRegion()
  },

  showPopup: function() {
    this.popup.showPopup();
  },

  //取消事件
  _error() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
    wx.navigateTo({
      url: '../share/share',
    })
  },

  /** 
   * 获取用户设备屏幕高度
   */
  getWindowHeight: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      },
    })
  },

  /**
   * 展示中国地图
   */
  showChinaRegion: function () {
    var that = this
    this.mapCtx.includePoints({
      padding: [80],
      points: chinaRegion
    })
  },

  /**
   * 从云数据库获取已献过旗的经纬度
   */
  getFlagLocation: function () {
    const db = wx.cloud.database()
    
    var that = this
    var markers = []

    //小程序端调用方法
    wx.cloud.callFunction({
      // 需要调用的云函数名
      name: 'getRecord',
      
      success: function (res) {
        // console.log(res.result.data) 
        for (var i = 0; i < res.result.data.length; i++) {
          // console.log(res.result.data[i]._openid, that.data.openid)
          // console.log(that.data.markers)
          // 在地图上渲染国旗
          if(res.result.data[i]._openid==that.data.openid){

            that.data.markers[i] = new markerItem(2, res.result.data[i].longitude, res.result.data[i].latitude, 'smallButFlag.png', true);
            
          }else{
            that.data.markers[i] = new markerItem(2, res.result.data[i].longitude, res.result.data[i].latitude, 'flag.png');
            
          }
        }
        that.setData({
          markers: that.data.markers
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
  * 获取用户经纬度信息
  */
  getLocation: function () {
    var that = this
    this.setData({
      disabled: true
    })
    setTimeout(function () {
      that.setData({
        disabled: false
      })
    }.bind(this), 3000);
    wx.getLocation({
      type: 'wgs84',   //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
      success: function (res) {
        // success  
        var longitude = res.longitude
        var latitude = res.latitude

        that.locationToProvince(longitude, latitude)

        //获取成功就调用addFlag
        // that.addFlag(longitude, latitude)
      }
    })
  },


  /**
   * 为祖国献旗
   */
  addFlag: function (longitude, latitude, province, provinces) {
    var that = this
    console.log(app.globalData.userInfo)
    const db = wx.cloud.database()
    for (var j = 0; j < provinces.length; j++) {
      // console.log(province,provinces[j].proName)
      //不能献旗
      if (province == provinces[j].proName) {
        db.collection('user').count({
          success: res => {
            console.log('FUCKYOU'+res.total)
          wx.showToast({
            title: '您已经在该省份助过力了（//▽//）现在已有'+res.total+'个标志了哦',
            duration: 3000,
            icon: 'none',
            mask: true
          });
          setTimeout(function () {
            // this.showPopup()
            wx.showModal({
              content: '是否要生成分享图片',
              confirmText: '是',
              cancelText: '否',
              success: function (res) {
                if (res.confirm) {
                  wx.getUserInfo({
                    success: function (res) {
                      // console.log(res)
                      app.globalData.userInfo = res.userInfo
                      app.globalData.avatarUrl = res.userInfo.avatarUrl
                      that.data.avatarUrl = res.userInfo.avatarUrl
                    },
                    fail: function () {
                      wx.showToast({
                        title: '无法获取信息来制作分享卡片',
                        duration: 3000,
                        icon: 'none'
                      })
                      return
                    }
                  })
                  wx.navigateTo({
                    url: '../share/share',
                  })
                }
              }
            })
            }.bind(this), 3000);
          }
        })
        return false
      }
    }
    
    //能献旗
    this.insert(longitude, latitude, province)

  },

  /**
   * 将经纬度信息转化为省份信息
   */
  locationToProvince: function (longitude, latitude) {
    var _this = this
    var province = null

    wx.request({
      url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak=KFcMCEctjSuqlptir6olztdn3g5ANjHT&output=json&coordtype=wgs84ll&location=' + latitude + ',' + longitude,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res);       
        province = res.data.result.addressComponent.province
        app.globalData.province = res.data.result.addressComponent.province
        _this.getFlagProvince(longitude, latitude, province)
        // _this.addFlag(longitude, latitude, province)
      },
      fail: function () {
        wx.showToast({
          title: '获取定位失败',
          icon: 'none'
        })
      }
    });   
  },


  /**
   * 用openId在云数据库上查询用户在哪些省份献过旗
   * 返回省份list
   * 无则返回空list
   */
  getFlagProvince: function (longitude, latitude, province) {
    const db = wx.cloud.database()
    var _this = this
    var provinces = []

    wx.cloud.callFunction({
      // 需要调用的云函数名
      name: 'getRecord',

      success: function (res) {
        // console.log(res.result.data) 
        for(var i = 0; i < res.result.data.length; i++){
          if(res.result.data[i]._openid==_this.data.openid){
            var pro = new proItem(res.result.data[i].province);
            provinces.push(pro)
          }
        }
        _this.addFlag(longitude, latitude, province, provinces)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '数据获取失败'
        })
      }
    }) 
  },

  /**
   * 插入献旗信息到数据库
   * 
   */
  insert: function (lon, lat, pro){
    var that = this
    const db = wx.cloud.database()
    db.collection('user').add({
      data: {
        longitude:lon,
        latitude: lat,
        province: pro

      },
      success: res => {
        this.querySum()
        
        // 在地图上渲染国旗
        var info = new markerItem(2, lon, lat, 'smallButFlag.png', true)
       
        this.data.markers.push(info)
        
        this.setData({
          markers: this.data.markers
        })
        setTimeout(function () {
          // this.showPopup()
          wx.showModal({
            content: '是否要生成分享图片',
            confirmText: '是',
            cancelText: '否',
            success: function (res) {
              if (res.confirm) {
                wx.getUserInfo({
                  success: function (res) {
                    // console.log(res)
                    app.globalData.userInfo = res.userInfo
                    app.globalData.avatarUrl = res.userInfo.avatarUrl
                    that.data.avatarUrl = res.userInfo.avatarUrl
                  },
                  fail: function () {
                    wx.showToast({
                      title: '无法获取信息来制作分享卡片',
                      duration: 3000,
                      icon: 'none'
                    })
                    return
                  }
                })
                wx.navigateTo({
                  url: '../share/share',
                })
              }
            }
          })
        }.bind(this), 3000);
    
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '操作失败'
        })
       
      }
    })
  },
  /**
   * 查询当前献出了多少旗
   */
   querySum: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('user').count({
      success: res => {
        app.globalData.count = res.total
        wx.showToast({
          icon: 'none',
          duration: 3000,
          title: '我是第' + res.total +'个点亮校徽为母校庆生的中南人！'
        })

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '数据获取失败'
        })
        
      }
    })

  },

  test: function(){
    const db = wx.cloud.database()
    db.collection('user').add({
      data: {
        longitude: 105.93886,
        latitude: 23.22778,
        province: 'x2省'

      },
      success: res => {
        this.querySum()

        // 在地图上渲染国旗
        var info = new markerItem(2, 105.93886, 23.22778, 'smallButFlag.png')

        this.data.markers.push(info)

        this.setData({
          markers: this.data.markers
        })
        wx.showToast({
          title: '成功',
        })
      }
    })
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    console.log(e.detail.userInfo.avatarUrl);
  },

  /**
   * 点击音乐按钮
   */
  // hitMusicBtn: function () {
  //   if (this.data.isPlay) {
  //     backgroundAudioManager.pause()
  //   } else {
  //     backgroundAudioManager.play()
  //   }
  //   this.setData({
  //     isPlay: !this.data.isPlay
  //   })
  // },
  headimag(){
    wx.navigateTo({
      url: '../select/select',
    })
  },

})
