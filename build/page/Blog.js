"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _showdown = require("showdown");

var _showdown2 = _interopRequireDefault(_showdown);

var _clientAjax = require("client-ajax");

var _clientAjax2 = _interopRequireDefault(_clientAjax);

require("../../lib/date");

var converter = new _showdown2["default"].Converter();

var Blog = (function (_React$Component) {
	_inherits(Blog, _React$Component);

	_createClass(Blog, null, [{
		key: "getMeta",
		value: function getMeta() {
			return {
				title: "廖仲武的博客 - Liaozhongwu's Blog",
				description: "廖仲武的博客 - Liaozhongwu's Blog",
				cssFile: ["/css/theme.css", "/css/blog.css"],
				jsFile: ["/page/blog.js"]
			};
		}
	}]);

	function Blog(props) {
		_classCallCheck(this, Blog);

		_get(Object.getPrototypeOf(Blog.prototype), "constructor", this).call(this);
		this.state = {
			blog: props.blog,
			comments: props.comments,
			comment: {
				name: "",
				phone: "",
				email: "",
				content: ""
			},
			commentMsg: ""
		};
	}

	_createClass(Blog, [{
		key: "handleSubmit",
		value: function handleSubmit() {
			var _this = this;

			var _state = this.state;
			var blog = _state.blog;
			var comments = _state.comments;
			var comment = _state.comment;

			if (!comment.name) {
				this.setState({
					commentMsg: "please input your name"
				});
				return;
			}
			if (!comment.content) {
				this.setState({
					commentMsg: "please input your content"
				});
				return;
			}

			(0, _clientAjax2["default"])({
				url: "/comment/save",
				method: "post",
				data: {
					bid: blog._id,
					name: comment.name,
					phone: comment.phone,
					email: comment.email,
					content: comment.content
				},
				before: function before() {
					_this.setState({
						commentMsg: "submiting..."
					});
				},
				success: function success(resp) {
					comments.push(resp.body);
					_this.setState({
						comments: comments,
						comment: {
							name: "",
							phone: "",
							email: "",
							content: ""
						},
						commentMsg: "submit success"
					});
				},
				error: function error() {
					_this.setState({
						commentMsg: "submit failure"
					});
				},
				complete: function complete() {
					setTimeout(function () {
						_this.setState({
							commentMsg: ""
						});
					}, 2000);
				}
			});
		}
	}, {
		key: "handleCommentValueChange",
		value: function handleCommentValueChange(key, value) {
			var comment = this.state.comment;

			comment[key] = value;
			this.setState({
				comment: comment
			});
		}
	}, {
		key: "renderComments",
		value: function renderComments() {
			var _this2 = this;

			var _state2 = this.state;
			var comments = _state2.comments;
			var comment = _state2.comment;
			var commentMsg = _state2.commentMsg;

			var html = [];
			comments.map(function (comment, i) {
				html.push(_react2["default"].createElement(
					"li",
					{ className: "item comment", key: i },
					_react2["default"].createElement(
						"span",
						{ className: "comment-label" },
						comment.name,
						":"
					),
					_react2["default"].createElement(
						"span",
						{ className: "time" },
						comment.createTime.toString()
					),
					_react2["default"].createElement(
						"span",
						{ className: "comment-content" },
						comment.content
					)
				));
			});
			html.push(_react2["default"].createElement(
				"li",
				{ className: "item", key: "add" },
				_react2["default"].createElement(
					"form",
					{ className: "form" },
					_react2["default"].createElement(
						"div",
						{ className: "form-group" },
						_react2["default"].createElement(
							"label",
							{ className: "label" },
							"name*:"
						),
						_react2["default"].createElement("input", { className: "input", type: "text", name: "name", placeholder: "name", required: true,
							value: comment.name, onChange: function (e) {
								return _this2.handleCommentValueChange("name", e.target.value);
							} })
					),
					_react2["default"].createElement(
						"div",
						{ className: "form-group" },
						_react2["default"].createElement(
							"label",
							{ className: "label" },
							"phone:"
						),
						_react2["default"].createElement("input", { className: "input", type: "text", name: "phone", placeholder: "phone",
							value: comment.phone, onChange: function (e) {
								return _this2.handleCommentValueChange("phone", e.target.value);
							} })
					),
					_react2["default"].createElement(
						"div",
						{ className: "form-group" },
						_react2["default"].createElement(
							"label",
							{ className: "label" },
							"email:"
						),
						_react2["default"].createElement("input", { className: "input", type: "text", name: "email", placeholder: "email",
							value: comment.email, onChange: function (e) {
								return _this2.handleCommentValueChange("email", e.target.value);
							} })
					),
					_react2["default"].createElement(
						"div",
						{ className: "form-group" },
						_react2["default"].createElement(
							"label",
							{ className: "label" },
							"content*:"
						),
						_react2["default"].createElement("textarea", { className: "textarea", name: "content", placeholder: "content", required: true,
							value: comment.content, onChange: function (e) {
								return _this2.handleCommentValueChange("content", e.target.value);
							} })
					),
					_react2["default"].createElement(
						"div",
						{ className: "form-group" },
						_react2["default"].createElement("label", { className: "label" }),
						_react2["default"].createElement("input", { className: "btn", type: "button", value: "提交评论", onClick: function (e) {
								return _this2.handleSubmit();
							} }),
						_react2["default"].createElement(
							"span",
							{ className: "msg-btn" },
							commentMsg
						)
					)
				)
			));
			return html;
		}
	}, {
		key: "render",
		value: function render() {
			var blog = this.state.blog;

			return _react2["default"].createElement(
				"div",
				{ className: "content" },
				_react2["default"].createElement(
					"p",
					{ className: "title" },
					blog.title,
					_react2["default"].createElement(
						"span",
						{ className: "time" },
						blog.createTime.toString()
					)
				),
				_react2["default"].createElement("article", { className: "article", dangerouslySetInnerHTML: { __html: converter.makeHtml(blog.content) } }),
				_react2["default"].createElement(
					"ul",
					{ className: "list" },
					this.renderComments()
				)
			);
		}
	}]);

	return Blog;
})(_react2["default"].Component);

exports["default"] = Blog;
module.exports = exports["default"];