const util = require('../../utils/util.js')
const config = require('../../config.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '',
    })

    this.getMovies(true)
  },

  getMovies(onload) {
    wx.request({
      url: config.service.hotMovieList,
      success: res => {
        this.setData({
          movies: res.data.data
        })
      },
      fail: err => {
        util.showModal({
          title: '加载失败',
          content: err,
        });
        setTimeout(() => wx.navigateBack(), 1500);
      },
      complete: () => {
        if (onload) {
          wx.hideLoading()
        } else {
          wx.stopPullDownRefresh();
        }
      }
    })
  },

  goDetail(e) {
    console.log(11, e)
    const selectedId = e.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?movieId=' + selectedId,
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
    this.getMovies(false);
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