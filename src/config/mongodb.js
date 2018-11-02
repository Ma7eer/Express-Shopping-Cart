/* setting up enviroment variables */
require('dotenv/config');

module.exports = {
  'local': 'mongodb://localhost:27017/shopping',
  'mlab': process.env.MLAB_KEY
}