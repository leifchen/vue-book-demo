const express = require('express')
const multer = require('multer')
const { UPLOAD_PATH } = require('../utils/constant')
const Result = require('../models/Result')
const Book = require('../models/Book')
const boom = require('boom')
const { decode } = require('../utils')
const bookService = require('../services/book')

const router = express.Router()

router.post(
  '/upload',
  multer({ dest: `${UPLOAD_PATH}/book` }).single('file'),
  function (req, res, next) {
    if (!req.file || req.file.length === 0) {
      new Result('上传电子书失败').fail(res)
    } else {
      const book = new Book(req.file)
      book.parse()
        .then(book => {
          new Result(book.toJson(), '上传电子书成功').success(res)
        })
        .catch(err => {
          console.log('/book/upload', err)
          next(boom.badImplementation(err))
          book.reset()
        })
    }
  }
)

router.post(
  '/create',
  function (req, res, next) {
    const decoded = decode(req)
    if (decoded && decoded.username) {
      req.body.username = decoded.username
    }
    const book = new Book(null, req.body)
    bookService.insertBook(book)
      .then(() => {
        new Result('添加电子书成功').success(res)
      })
      .catch(err => {
        console.log('/book/create', err)
        next(boom.badImplementation(err))
      })
  }
)

router.post(
  '/update',
  function (req, res, next) {
    const decoded = decode(req)
    if (decoded && decoded.username) {
      req.body.username = decoded.username
    }
    const book = new Book(null, req.body)
    bookService.updateBook(book)
      .then(() => {
        new Result('更新电子书成功').success(res)
      })
      .catch(err => {
        console.log('/book/create', err)
        next(boom.badImplementation(err))
      })
  }
)

router.get(
  '/get',
  function (req, res, next) {
    const { fileName } = req.query
    if (!fileName) {
      next(boom.badImplementation(new Error('参数fileName不能为空')))
    } else {
      bookService.getBook(fileName)
        .then(book => {
          new Result(book, '获取图书信息成功').success(res)
        })
        .catch(err => {
          next(boom.badImplementation(err))
        })
    }
  }
)

module.exports = router  