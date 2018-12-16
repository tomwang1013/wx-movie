let useLocal = true;

const CONF = {
  port: '5757',
  rootPathname: '',

  // 微信小程序 App ID
  appId: 'wx22880cdc3d8d56ab',

  // 微信小程序 App Secret
  appSecret: '4d2c400abcfa8b7e5aa4083b9da58bcc',

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
    pass: 'wx22880cdc3d8d56ab',
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
  qcloudAppId: '1256681158',
  qcloudSecretId: 'AKIDueCXdWHZjKkwsZsGEwToukW4NQEqt2lE',
  qcloudSecretKey: 'MSL3d2CRUL0QeVCeqthGdnmY6OULxKSP',

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

  CONF.mysql.host = '192.168.1.7'
}

module.exports = CONF