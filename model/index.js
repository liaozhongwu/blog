var mongoose = require('mongoose')
,	config = require('config')

mongoose.Promise = global.Promise || mongoose.Promise
mongoose.connect(config.db.url, {user: config.db.user, pass: config.db.pass})

var Schema = mongoose.Schema
,	blogSchema = new Schema({
	title: {type: String, index: true}
	, key: {type: String}
	,	content: {type: String}
	,	createTime: {type: Date, default: Date.now}
})
,	commentSchema = new Schema({
	bid: {type: String, index: true}
	,	name: {type: String}
	,	phone: {type: String}
	,	email: {type: String}
	,	content: {type: String}
	,	createTime: {type: Date, default: Date.now}
})
,	noticeSchema = new Schema({
	title: {type: String}
	,	createTime: {type: Date, default: Date.now}
})
,	aboutSchema = new Schema({
	title: {type: String}
	, content: {type: String}
	,	createTime: {type: Date, default: Date.now}
})

var	BlogModel = mongoose.model('blog', blogSchema)
,	CommentModel = mongoose.model('comment', commentSchema)
,	NoticeModel = mongoose.model('notice', noticeSchema)
,	AboutModel = mongoose.model('about', aboutSchema)

exports.getBlogs = function () {
	return BlogModel.find().sort({createTime: -1}).exec()
}
exports.getBlog = function (_id) {
	return BlogModel.findOne({_id}).exec()
}
exports.getBlogByKey = function (key) {
	return BlogModel.findOne({key}).exec()
}
exports.addBlog = function (params) {
	return new BlogModel(params).save()
} 
exports.updateBlog = function (params) {
	return BlogModel.update({_id: params._id}, params)
}
exports.getComments = function () {
	return CommentModel.find().sort({createTime: 1}).exec()
}
exports.getComment = function (_id) {
	return CommentModel.findOne({_id}).exec()
}
exports.getCommentsByBid = function (bid) {
	return CommentModel.find({bid}).exec()
}
exports.addComment = function (params) {
	return new CommentModel(params).save()
}
exports.getAbouts = function () {
	return AboutModel.find().exec()
}
exports.addAbout = function (params) {
	return new AboutModel(params).save()
}
exports.getNotices = function () {
	return NoticeModel.find().sort({createTime: 1}).exec()
}
exports.addNotice = function (params) {
	return new NoticeModel(params).save()
}