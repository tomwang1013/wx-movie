const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const util = require('../../utils/util.js');
const config = require('../../config.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: null,
    type: 0, // 0: 文字; 1: 音频
    content: '', // 评论内容：可能是一段录音的url或一段文字,
    recording: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movie: app.currentMovie,
      type: options.type
    })

    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(err => {
      wx.showModal({
        title: '录音失败',
        content: err,
      })
    });
    this.recorderManager.onStop(res => {
      this.audioDuration = Math.floor(res.duration / 1000);
      this.uploadAudio(res.tempFilePath)
    });
  },

  // 上传录音
  uploadAudio(tempFilePath) {
    wx.uploadFile({
      url: config.service.uploadUrl,
      filePath: tempFilePath,
      name: 'file',
      success: res => {
        const data = JSON.parse(res.data).data
        this.setData({
          content: data.imgUrl
        });
      },
      fail: err => {
        console.error('上传失败：', err)
      }
    })
  },

  // 文字输入
  onInput(e) {
    this.setData({
      content: e.detail.value.trim()
    })
  },

  // 预览评论
  previewComment() {
    if (this.data.content) {
      app.currentEditComment = {
        user_name: app.userInfo.nickName,
        avatar: app.userInfo.avatarUrl,
        type: this.data.type,
        content: this.data.content,
        duration: this.audioDuration
      };
      wx.navigateTo({
        url: '/pages/comment-preview/comment-preview'
      })
    }
  },

  // 录制或停止录制
  record() {
    if (this.data.recording) {
      this.recorderManager.stop();
    } else {
      this.recorderManager.start({
        format: 'mp3'
      });
    }

    this.setData({
      recording: !this.data.recording
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