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

    // this.innerAudioContext = wx.createInnerAudioContext();
    // this.innerAudioContext.onError((res) => {
    //   // 播放音频失败的回调
    // })
    // this.innerAudioContext.src = this.data.src;  // 这里可以是录音的临时路径
    // this.innerAudioContext.play()
  },

  onInput(e) {
    this.setData({
      content: e.detail.value.trim()
    })
  },

  previewComment() {
    if (this.data.content) {
      app.currentEditComment = {
        userName: app.userInfo.nickName,
        avatar: app.userInfo.avatarUrl,
        content: this.data.content
      };
      wx.navigateTo({
        url: '/pages/comment-preview/comment-preview'
      })
    }
  },

  record() {
    if (this.data.recording) {
      this.recorderManager.stop();
      this.recorderManager.onStop(res => {
        console.log(res.tempFilePath)
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: res.tempFilePath,
          name: 'file',
          success: res => {
            console.log(111, res.data)
            // this.setData({
            //   content: res.tempFilePath
            // })
          },
          fail: err => {
            console.error('上传失败：', err)
          }
        })
      })
    } else {
      this.recorderManager.start({
        format: 'mp3'
      });
      this.recorderManager.onError(err => {
        wx.showModal({
          title: 'record error',
          content: err,
        })
      })
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