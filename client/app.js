//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
      qcloud.setLoginUrl(config.service.loginUrl);
      this.checkLogin();
    },

  userInfo: null,

    // 当前页面展示的电影
    currentMovie: null,

    // 当前正在编辑的影评：进入编辑页初始化
  currentEditComment: {
    userName: '',
    avatar: '',
    content: ''
  },

    // 当前影评详情页应该展示的影评
    currentDisplayComment: {
      userName: '',
      avatar: '',
      content: ''
    }
})