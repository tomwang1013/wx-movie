const util = require('../../utils/util.js');
const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const config = require('../../config.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: null,
    comment: null,
  },

  addComment() {
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success: res => {
        wx.navigateTo({
          url: '/pages/comment-edit/comment-edit?type=' + res.tapIndex
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movie: app.currentMovie,
      comment: app.currentDisplayComment
    })
  },

  // 收藏
  addToFavorite() {
    wx.showLoading({
      title: '正在收藏...',
    })
    qcloud.request({
      url: config.service.addToFavoriteUrl,
      method: 'POST',
      login: true,
      data: { commentId: this.data.comment.id },
      success: res => {
        util.showSuccess('收藏成功')
      },
      fail: ctx => {
        util.showModel('收藏失败', err);
      },
      complete: () => {
        wx.hideLoading()
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