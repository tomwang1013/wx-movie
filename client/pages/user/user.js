const util = require('../../utils/util.js');
const app = getApp();
const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorites: [],
    mine: [],
    selectedTab: 'favorites',
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.userInfo
    })
    
    wx.showLoading({
      title: '',
    })

    qcloud.request({
      url: config.service.favoritesUrl,
      login: true,
      success: res => {
        this.setData({
          favorites: res.data.data.favorites,
          mine: res.data.data.mine
        })
      },
      fail: err => {
        util.showModel('获取失败', err)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  onTabClick(e) {
    this.setData({
      selectedTab: e.target.dataset.name
    });
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