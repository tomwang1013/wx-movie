const util = require('../../utils/util.js');
const app = getApp();
const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: null,
    comment: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movie: app.currentMovie,
      comment: app.currentEditComment
    })
  },

  addComment() {
    util.showBusy('正在发布...');
    qcloud.request({
      url: config.service.addCommentUrl,
      method: 'POST',
      data: {
        movieId: this.data.movie.id,
        type: this.data.comment.type,
        content: this.data.comment.content
      },
      success: res => {
        util.showSuccess('发布成功');
        wx.navigateTo({
          url: '/pages/comment-list/comment-list'
        });
      },
      fail: err => util.showModel('发布失败', err)
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