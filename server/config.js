let useLocal = false;

const CONF = {
  port: '5757',
  rootPathname: '',

  // 微信小程序 App ID
  appId: 'wxeca1b1addbd4197c',

  // 微信小程序 App Secret
  appSecret: '1f3af3919aced226a172e5beb263e1bd',

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: false,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: 'wxeca1b1addbd4197c',
    char: 'utf8mb4'
  },

  cos: {
    /**
     * 地区简称
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
    region: 'ap-guangzhou',
    // Bucket 名称
    fileBucket: 'qcloudtest',
    // 文件夹
    uploadFolder: ''
  },

  // 上传图片需要用
  qcloudAppId: '1256680925',
  qcloudSecretId: 'AKIDBB2e07KpOhldHgnrkOnxwhEVcbMsjD7m',
  qcloudSecretKey: 'YvAAvRlriJj27wWw73jEbjdIl00kJlzy',

  // 微信登录态有效期
  wxLoginExpires: 7200,
  wxMessageToken: 'abcdefgh'
}

if (useLocal) {
  Object.assign(CONF, {
    serverHost: 'localhost',
    tunnelServerUrl: '',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    networkTimeout: 30000
  });

  CONF.mysql.host = '192.168.1.4'
}

module.exports = CONF