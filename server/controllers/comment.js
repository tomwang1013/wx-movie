const DB = require('../utils/db.js');

module.exports = {
  add: async ctx => {

  },

  // 随机返回一条影评：简答起见，返回最后一条
  random: async ctx => {
    const lastComment = (await DB.query('SELECT user_name, avatar, content, movie_id FROM comments ORDER BY id DESC LIMIT 1'))[0];
    const movie = (await DB.query('SELECT title, image FROM movies WHERE id = ?', [lastComment.movie_id]))[0];

    ctx.state.data = {
      movieId: lastComment.movie_id,
      movieImg: movie.image,
      movieTitle: movie.title,
      userName: lastComment.user_name,
      avatar: lastComment.avatar,
      content: lastComment.content
    }
  }
}