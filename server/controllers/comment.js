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
    await DB.query('INSERT INTO comments(user, user_name, avatar, movie_id, type, content, duration) VALUES(?, ?, ?, ?, ?, ?, ?)', [userInfo.openId, userInfo.nickName, userInfo.avatarUrl, comment.movieId, comment.type || 0, comment.content, comment.duration]);
  },

  // 随机返回一条影评：简答起见，返回最后一条
  random: async ctx => {
    const lastComment = (await DB.query('SELECT id, user_name, avatar, type, content, movie_id, duration FROM comments ORDER BY id DESC LIMIT 1'))[0];
    const movie = (await DB.query('SELECT title, image, description FROM movies WHERE id = ?', [lastComment.movie_id]))[0];

    ctx.state.data = {
      movieId: lastComment.movie_id,
      movieImg: movie.image,
      movieTitle: movie.title,
      movieDesc: movie.description,
      commentId: lastComment.id,
      userName: lastComment.user_name,
      avatar: lastComment.avatar,
      type: lastComment.type,
      content: lastComment.content,
      duration: lastComment.duration
    }
  },

  // 影评列表
  list: async ctx => {
    const movieId = +ctx.query.movieId;
    ctx.state.data = await DB.query('SELECT id, user_name, avatar, type, content, duration FROM comments WHERE movie_id = ?', movieId);
  },

  // 收藏影评
  addToFavorite: async ctx => {
    const { loginState, userinfo: userInfo } = ctx.state.$wxInfo;
    if (loginState === LOGIN_STATE.FAILED) {
      ctx.throw(401, 'login required')
    }

    const commentId = +ctx.request.body.commentId;
    const add = ctx.request.body.add;

    if (add) {
      await DB.query('INSERT INTO favorites(user, comment_id) VALUES(?, ?)', [userInfo.openId, commentId]);
    } else {
      await DB.query('DELETE FROM favorites WHERE user = ? AND comment_id = ?', [userInfo.openId, commentId]);
    }
  },

  // 收藏的影评列表
  favorites: async ctx => {
    const { loginState, userinfo: userInfo } = ctx.state.$wxInfo;
    if (loginState === LOGIN_STATE.FAILED) {
      ctx.throw(401, 'login required')
    }

    const [favorites, mine] = await Promise.all([
      DB.query('SELECT user_name, avatar, type, content, duration, title, image FROM favorites INNER JOIN comments ON favorites.comment_id = comments.id INNER JOIN movies on comments.movie_id = movies.id WHERE favorites.user = ?', [userInfo.openId]),
      DB.query('SELECT type, content, duration, title, image FROM comments INNER JOIN movies ON comments.movie_id = movies.id WHERE comments.user = ?', [userInfo.openId])
    ]);

    ctx.state.data = {
      favorites,
      mine
    }
  },

  checkComment: async ctx => {
    const { loginState, userinfo: userInfo } = ctx.state.$wxInfo;
    if (loginState === LOGIN_STATE.FAILED) {
      ctx.throw(401, 'login required')
    }

    const movieId = +ctx.query.movieId;
    const comments = await DB.query('SELECT * FROM comments WHERE movie_id = ? AND user = ?', [movieId, userInfo.openId])

    ctx.state.data = comments[0]
  }
}