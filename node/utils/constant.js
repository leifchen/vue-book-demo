const { env } = require('./env')
const UPLOAD_PATH = env === 'dev' ? 'D:/upload/admin-upload-ebook' : '/home/upload/admin-upload-ebook'

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  CODE_TOKEN_EXPIRED: -2,
  debug: true,
  PWD_SALT: 'LeifChen',
  PRIVATE_KEY: 'vue_book_leifchen',
  JWT_EXPIRED: 60 * 60, // token失效时间
  UPLOAD_PATH
}