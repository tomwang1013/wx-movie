const DB = require('../utils/db.js');
const { ERRORS, LOGIN_STATE } = require('wafer-node-sdk/lib/constants')

module.exports = {
  // 添加一条影评
  add: async ctx => {
    const { loginState, userinfo: userInfo } = ctx.state.$wxInfo;
    if (loginState === LOGIN_STATE.FAILED) {
      ctx.throw(401, 'login required')
    }

    const comment = ctx.request.body;
    await DB.query('INSERT INTO comments(user, user_name, avatar, movie_id, type, content) VALUES(?, ?, ?, ?, ?, ?)', [userInfo.openId, userInfo.nickName, userInfo.avatarUrl, comment.movieId, comment.type || 0, comment.content]);
  },

  // 随机返回一条影评：简答起见，返回最后一条
  random: async ctx => {
    const lastComment = (await DB.query('SELECT user_name, avatar, content, movie_id FROM comments ORDER BY id DESC LIMIT 1'))[0];
    const movie = (await DB.query('SELECT title, image, description FROM movies WHERE id = ?', [lastComment.movie_id]))[0];

    ctx.state.data = {
      movieId: lastComment.movie_id,
      movieImg: movie.image,
      movieTitle: movie.title,
      movieDesc: movie.description,
      userName: lastComment.user_name,
      avatar: lastComment.avatar,
      content: lastComment.content
    }
  },

  // 影评列表
  list: async ctx => {
    const movieId = +ctx.query.movieId;
    ctx.state.data = await DB.query('SELECT id, user_name, avatar, content FROM comments WHERE movie_id = ?', movieId);
  }
}