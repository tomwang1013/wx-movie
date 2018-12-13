const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const util = require('../../utils/util.js');
const app = getApp();

const UNPROMPTED = 0    // 未弹框
const UNAUTHORIZED = 1  // 用户拒绝授权
const AUTHORIZED = 2    // 用户已授权

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoAuthType: UNPROMPTED,
    logged: false,  // 用户是否曾经登录过

    movie: {
      id: 1,
      image: 'https://movie-1256681158.cos.ap-chengdu.myqcloud.com/images/p2517753454.jpg',
      title: '复仇者联盟3：无限战争',
    },
    comment: {
      id: 1,
      avatar: 'https://wx.qlogo.cn/mmopen/vi_32/PetqTaAkoQ9zAjknVnBMEnIhgSQuE8gPDxCrHsCgaypZ76kv8kQd7ViaoooqVwCdhLtLh3DUqJqTzQSVmU7N0CQ/132',
      userName: '王先统'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLogin();
    if (this.data.logged) {
      // TODO get comment & movie from server
    }
  },

  checkLogin() {
    if (qcloud.Session.get()) {
      this.setData({ logged: true })
    } else {
      this.setData({ logged: false })
    }
  },

  onTapLogin() {
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
        } else {
          // 已经授权
          this.userInfoAuthType = AUTHORIZED;
          qcloud.login({
            success: res => {
              this.setData({ logged: true });
              app.userInfo = res;
            },
            fail: err => this.setData({ logged: false })
          })
        }
      }
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

  }
})