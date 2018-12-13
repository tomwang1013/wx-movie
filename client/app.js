//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

const UNPROMPTED = 0    // 未弹框
const UNAUTHORIZED = 1  // 用户拒绝授权
const AUTHORIZED = 2    // 用户已授权

App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl);
  },

  checkSession({ success, fail }) {
    wx.checkSession({
      success: res => {
        if (this.userInfo) {
          this.userInfoAuthType = AUTHORIZED;
          return success();
        }

        qcloud.request({
          url: config.service.userUrl,
          success: res => {
            this.userInfoAuthType = AUTHORIZED;
            this.userInfo = res.data.data;
            success();
          },
          fail: err => { throw err }
        })
      },
      fail: err => { /* need to re-login */ fail(err) },
    })
  },

  login({ success, fail }) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === false) {
          // 已拒绝授权
          this.userInfoAuthType = UNAUTHORIZED;
          wx.showModal({
            title: '提示',
            content: '请点击"授权登录"授权我们获取您的用户信息',
            showCancel: false
          });
          success();
        } else {
          // 已经授权
          this.userInfoAuthType = AUTHORIZED;
          qcloud.login({
            success: res => {
              this.userInfo = res;
              success();
            },
            fail: err => { throw err }
          })
        }
      }
    })
  },

  userInfoAuthType: UNPROMPTED,
  userInfo: null,

  // 当前页面展示的电影
  currentMovie: null,

  // 当前正在编辑的影评：进入编辑页初始化
  currentEditComment: {
    userName: '',
    avatar: '',
    content: ''
  },

  // 当前影评详情页应该展示的影评
  currentDisplayComment: {
    userName: '',
    avatar: '',
    content: ''
  }
})