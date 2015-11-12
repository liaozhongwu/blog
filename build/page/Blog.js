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

var converter = new _showdown2["default"].Converter();

var Blog = (function (_React$Component) {
	_inherits(Blog, _React$Component);

	_createClass(Blog, null, [{
		key: "getMeta",
		value: function getMeta() {
			return {
				cssFile: ["/css/theme.css"],
				jsFile: ["/page/blog.js"]
			};
		}
	}]);

	function Blog(props) {
		_classCallCheck(this, Blog);

		_get(Object.getPrototypeOf(Blog.prototype), "constructor", this).call(this);
		this.state = {
			data: props.data,
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
			var self = this;
			if (!this.state.comment.name) {
				this.setState({
					commentMsg: "please input your name"
				});
				return;
			}
			if (!this.state.comment.content) {
				this.setState({
					commentMsg: "please input your content"
				});
				return;
			}
			var params = {
				id: this.state.data.id,
				name: this.state.comment.name,
				phone: this.state.comment.phone,
				email: this.state.comment.email,
				content: this.state.comment.content
			};
			$.ajax({
				url: "/comment/save",
				type: "post",
				data: params,
				datatype: "json",
				beforeSend: function beforeSend() {
					self.setState({
						commentMsg: "submiting..."
					});
				},
				success: function success(result) {
					var data = self.state.data;
					data.comments.push(result);
					self.setState({
						data: data,
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
					self.setState({
						commentMsg: "submit failure"
					});
				},
				complete: function complete() {
					setTimeout(function () {
						self.setState({
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
			var _this = this;

			var comments = this.state.data.comments || [];
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
						comment.createTime
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
							value: this.state.comment.name, onChange: function (e) {
								_this.handleCommentValueChange("name", e.target.value);
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
							value: this.state.comment.phone, onChange: function (e) {
								_this.handleCommentValueChange("phone", e.target.value);
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
							value: this.state.comment.email, onChange: function (e) {
								_this.handleCommentValueChange("email", e.target.value);
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
							value: this.state.comment.content, onChange: function (e) {
								_this.handleCommentValueChange("content", e.target.value);
							} })
					),
					_react2["default"].createElement(
						"div",
						{ className: "form-group" },
						_react2["default"].createElement("label", { className: "label" }),
						_react2["default"].createElement("input", { className: "btn", type: "button", value: "提交评论", onClick: function (e) {
								_this.handleSubmit();
							} }),
						_react2["default"].createElement(
							"span",
							{ className: "msg-btn" },
							this.state.commentMsg
						)
					)
				)
			));
			return html;
		}
	}, {
		key: "render",
		value: function render() {
			var title = this.state.data.title || "";
			var content = this.state.data.content || "";
			var createTime = this.state.data.createTime || "";
			return _react2["default"].createElement(
				"div",
				{ className: "content" },
				_react2["default"].createElement(
					"p",
					{ className: "title" },
					_react2["default"].createElement(
						"span",
						{ className: "time" },
						createTime
					),
					title
				),
				_react2["default"].createElement("article", { className: "article", dangerouslySetInnerHTML: { __html: converter.makeHtml(content) } }),
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