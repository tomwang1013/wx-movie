const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const util = require('../../utils/util.js');
const config = require('../../config.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.options = options;
    if (options.movieId) {
      wx.showLoading({
        title: '',
      })
      wx.request({
        url: `${config.service.host}/weapp/movie/${options.movieId}`,
        success: res => {
          this.setData({ movie: res.data.data[0] });
          app.currentMovie = this.data.movie;
        },
        fail: err => {
          util.showModel('获取失败', err)
          setTimeout(() => wx.navigateBack(), 1500)
        },
        complete: () => wx.hideLoading()
      })
    } else {
      this.setData({
        movie: app.currentMovie
      })
    }
  },

  goCommentList() {
    wx.navigateTo({
      url: '/pages/comment-list/comment-list?movieId=' + (this.options.movieId || ''),
    })
  },

  addComment() {
    wx.showLoading({
      title: '',
    })

    qcloud.request({
      url: config.service.checkCommentUrl,
      data: {
        movieId: this.data.movie.id
      },
      success: res => {
        wx.hideLoading();

        const data = res.data.data;
        if (data.id) {
          app.currentDisplayComment = data;
          wx.showToast({ title: '你已经评论过了', })
          wx.navigateTo({
            url: '/pages/comment-detail/comment-detail',
          })
        } else {
          wx.showActionSheet({
            itemList: ['文字', '音频'],
            success: res => {
              wx.navigateTo({
                url: '/pages/comment-edit/comment-edit?type=' + res.tapIndex
              })
            }
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