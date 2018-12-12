const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: {
      id: 1,
      movieImg: 'https://movie-1256681158.cos.ap-chengdu.myqcloud.com/images/p2517753454.jpg',
      movieTitle: '复仇者联盟3：无限战争',
      avatar: 'https://wx.qlogo.cn/mmopen/vi_32/PetqTaAkoQ9zAjknVnBMEnIhgSQuE8gPDxCrHsCgaypZ76kv8kQd7ViaoooqVwCdhLtLh3DUqJqTzQSVmU7N0CQ/132',
      userName: '王先统'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // TODO get comment & movie from server
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