const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {
      id: '',
      image: 'https://movie-1256681158.cos.ap-chengdu.myqcloud.com/images/p2517753454.jpg',
      title: '复仇者联盟3：无限战争'
    },
    comment: {
      id: 1,
      avatar: 'https://wx.qlogo.cn/mmopen/vi_32/PetqTaAkoQ9zAjknVnBMEnIhgSQuE8gPDxCrHsCgaypZ76kv8kQd7ViaoooqVwCdhLtLh3DUqJqTzQSVmU7N0CQ/132',
      userName: '王先统',
      content: '电影特效不错，但是故事情节有点简单'
    }
  },

  addComment() {
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success: res => {
        wx.navigateTo({
          url: '/pages/comment-edit/comment-edit?type=' + res.tapIndex + '&' + util.stringifyQuery(this.data.movie)
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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