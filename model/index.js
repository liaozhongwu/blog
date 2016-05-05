'use strict'
let mongoose = require('mongoose')
,	config = require('config')

mongoose.Promise = global.Promise || mongoose.Promise
mongoose.connect(config.db.url, {user: config.db.user, pass: config.db.pass})

let Schema = mongoose.Schema
,	blogSchema = new Schema({
	title: {type: String, index: true}
	, key: {type: String}
	, content: {type: String}
	, createTime: {type: Date, default: Date.now}
})
,	commentSchema = new Schema({
	bid: {type: String, index: true}
	, name: {type: String}
	, phone: {type: String}
	, email: {type: String}
	, content: {type: String}
	, createTime: {type: Date, default: Date.now}
})
,	aboutSchema = new Schema({
	title: {type: String}
	, content: {type: String}
	, createTime: {type: Date, default: Date.now}
})

let	BlogModel = mongoose.model('blog', blogSchema)
,	CommentModel = mongoose.model('comment', commentSchema)
,	AboutModel = mongoose.model('about', aboutSchema)

function toObject (doc) {
	return doc.toObject()
}

exports.getBlogs = function () {
	return BlogModel.find().sort({createTime: -1}).lean().exec()
}
exports.getBlog = function (_id) {
	return BlogModel.findOne({_id}).lean().exec()
}
exports.getBlogByKey = function (key) {
	return BlogModel.findOne({key}).lean().exec()
}
exports.addBlog = function (params) {
	return new BlogModel(params).save().then(toObject)
} 
exports.updateBlog = function (params) {
	return BlogModel.update({_id: params._id}, params)
}
exports.removeBlogs = function () {
	return BlogModel.remove().exec()
}
exports.getComments = function () {
	return CommentModel.find().sort({createTime: 1}).lean().exec()
}
exports.getComment = function (_id) {
	return CommentModel.findOne({_id}).lean().exec()
}
exports.getCommentsByBid = function (bid) {
	return CommentModel.find({bid}).lean().exec()
}
exports.countCommentsByBid = function (bid) {
	return CommentModel.count({bid}).lean().exec()
}
exports.addComment = function (params) {
	return new CommentModel(params).save().then(toObject)
}
exports.removeComments = function () {
	return CommentModel.remove().exec()
}
exports.getAbouts = function () {
	return AboutModel.find().lean().exec()
}
exports.addAbout = function (params) {
	return new AboutModel(params).save().then(toObject)
}
exports.removeAbouts = function () {
	return AboutModel.remove().exec()
}