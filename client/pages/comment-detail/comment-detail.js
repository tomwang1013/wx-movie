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
    hasFavorited: false
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
        if (data) {
          this.setData({ comment: data });
          wx.showToast({ title: '你已经评论过了',})
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.favoriteKey = `favorite_${app.userInfo.openId}_${app.currentDisplayComment.id}`
    let hasFavorited = !!wx.getStorageSync(this.favoriteKey);

    this.setData({
      movie: app.currentMovie,
      comment: app.currentDisplayComment,
      hasFavorited 
    })
  },

  // 收藏
  addToFavorite() {
    wx.showLoading({
      title: this.data.hasFavorited ? '正在取消收藏...' : '正在收藏...',
    });

    qcloud.request({
      url: config.service.addToFavoriteUrl,
      method: 'POST',
      login: true,
      data: { commentId: this.data.comment.id, add: !this.data.hasFavorited },
      success: res => {
        // 缓存结果
        if (this.data.hasFavorited) {
          wx.setStorageSync(this.favoriteKey, '')
        } else {
          wx.setStorageSync(this.favoriteKey, this.data.comment.id)
        }

        this.setData({
          hasFavorited: !this.data.hasFavorited
        })
        util.showSuccess('操作成功');
      },
      fail: ctx => {
        util.showModel('操作失败', err);
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