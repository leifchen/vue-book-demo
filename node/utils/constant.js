const UPLOAD_PATH = 'D:/upload/admin-upload-ebook'
const UPLOAD_URL = 'http://vue-book.com:8089/admin-upload-ebook'

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  CODE_TOKEN_EXPIRED: -2,
  debug: true,
  PWD_SALT: 'LeifChen',
  PRIVATE_KEY: 'vue_book_leifchen',
  JWT_EXPIRED: 60 * 60, // token失效时间
  UPLOAD_PATH,
  UPLOAD_URL,
  MIME_TYPE_EPUB: 'application/epub+zip',
  UPDATE_TYPE_FROM_WEB: 1
}