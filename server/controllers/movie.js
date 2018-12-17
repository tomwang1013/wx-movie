const DB = require('../utils/db.js');

module.exports = {
  hot: async ctx => {
    ctx.state.data = await DB.query('SELECT id, title, image, category, description FROM movies WHERE id >= 10 limit 5');
  },

  detail: async ctx => {
    const id = +ctx.params.id;
    ctx.state.data = await DB.query('SELECT id, title, image, category, description FROM movies WHERE id = ?', [id]);
  }
}