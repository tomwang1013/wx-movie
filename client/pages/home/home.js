const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const util = require('../../utils/util.js');
const config = require('../../config.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoAuthType: -1,
    userInfo: null,
    movie: {},
    comment: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: config.service.homeCommentUrl,
      success: res => {
        const data = res.data.data;
        this.setData({
          movie: {
            id: data.movieId,
            image: data.movieImg,
            title: data.movieTitle,
            description: data.movieDesc
          },
          comment: {
            id: data.commentId,
            avatar: data.avatar,
            userName: data.userName,
            content: data.content
          }
        });
        app.currentMovie = this.data.movie;
        app.currentDisplayComment = this.data.comment;
      },
      fail: err => { throw err }
    })
  },

  onTapLogin() {
    app.login({
      success: res => this.setData({
        userInfoAuthType: app.userInfoAuthType,
        userInfo: app.userInfo
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
    app.checkSession({
      success: res => this.setData({
        userInfoAuthType: app.userInfoAuthType,
        userInfo: app.userInfo,
      }),
      fail: err => this.setData({
        userInfoAuthType: app.userInfoAuthType
      })
    })
  },

  // 跳到详情页
  goDetail() {
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail'
    })
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