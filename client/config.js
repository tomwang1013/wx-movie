/**
 * 小程序配置文件
 */

let useLocal = false;

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://rgqt3qkv.qcloud.la';

if (useLocal) {
  host = 'http://localhost:5757'
}

var config = {
  // 登录状态过期时间
  sessionTimeout: 14 * 24 * 3600,

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        userUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

      // 首页获取随机影评
      homeCommentUrl: `${host}/weapp/comment/random`,

      // 发布影评
      addCommentUrl: `${host}/weapp/comment`,

      // 影评列表
      commentListUrl: `${host}/weapp/comment`,

      // 热门电影
      hotMovieList: `${host}/weapp/movie/hot`,

      // 收藏影评
      addToFavoriteUrl: `${host}/weapp/comment/favorite`,

      // 收藏列表
      favoritesUrl: `${host}/weapp/comment/favorite`,

      // 判断用户是否已经评论过
      checkCommentUrl: `${host}/weapp/comment/check-status`,
    }
};

module.exports = config;
