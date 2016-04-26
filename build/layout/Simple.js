"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = function (_React$Component) {
	_inherits(Base, _React$Component);

	function Base() {
		_classCallCheck(this, Base);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Base).call(this));
	}

	_createClass(Base, [{
		key: "renderTitle",
		value: function renderTitle() {
			if (this.props.title) {
				return _react2.default.createElement(
					"title",
					null,
					this.props.title
				);
			} else {
				return _react2.default.createElement(
					"title",
					null,
					"廖仲武的个人网站 - Liaozhongwu's Personal Website"
				);
			}
		}
	}, {
		key: "renderDescription",
		value: function renderDescription() {
			if (this.props.description) {
				return _react2.default.createElement("meta", { name: "description", content: this.props.description });
			} else {
				return _react2.default.createElement("meta", { name: "description", content: "廖仲武的个人网站 - Liaozhongwu's Personal Website" });
			}
		}
	}, {
		key: "renderMeta",
		value: function renderMeta() {
			var html = [];
			if (this.props.meta) {
				this.props.meta.map(function (meta, i) {
					html.push(_react2.default.createElement("meta", { key: i, name: meta.name, content: meta.content }));
				});
			}
			return html;
		}
	}, {
		key: "renderCss",
		value: function renderCss() {
			var html = [];
			if (this.props.style) {
				html.push(_react2.default.createElement(
					"style",
					{ key: "style" },
					this.props.styles
				));
			}
			if (this.props.cssFile) {
				this.props.cssFile.map(function (path, i) {
					html.push(_react2.default.createElement("link", { key: i, rel: "stylesheet", type: "text/css", href: path }));
				});
			}
			return html;
		}
	}, {
		key: "renderJs",
		value: function renderJs() {
			var html = [];
			if (this.props.APP_PROPS) {
				html.push(_react2.default.createElement("script", { type: "text/javascript", key: "APP_PROPS",
					dangerouslySetInnerHTML: { __html: "window.APP_PROPS = " + JSON.stringify(this.props.APP_PROPS) } }));
			}
			if (this.props.jsFile) {
				this.props.jsFile.map(function (path, i) {
					html.push(_react2.default.createElement("script", { key: i, type: "text/javascript", src: path }));
				});
			}
			return html;
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"html",
				null,
				_react2.default.createElement(
					"head",
					null,
					this.renderTitle(),
					_react2.default.createElement("meta", { charSet: "utf-8" }),
					_react2.default.createElement("meta", { httpEquiv: "Content-Type", content: "text/html; charset=UTF-8" }),
					_react2.default.createElement("meta", { name: "author", content: "liaozhongwu<liaozhongwu95@163.com>" }),
					_react2.default.createElement("meta", { name: "keywords", content: "廖仲武,个人网站,博客,liaozhongwu,blog" }),
					this.renderDescription(),
					_react2.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0, user-scalable=0" }),
					this.renderMeta(),
					_react2.default.createElement("link", { rel: "start", href: "http://www.liaozhongwu.com", title: "Home" }),
					this.renderCss(),
					_react2.default.createElement("script", { type: "text/javascript", src: "/vendor/ga.js" })
				),
				_react2.default.createElement(
					"body",
					null,
					_react2.default.createElement("div", { className: "app", id: "app",
						dangerouslySetInnerHTML: { __html: this.props.content || "" } }),
					this.renderJs()
				)
			);
		}
	}]);

	return Base;
}(_react2.default.Component);

exports.default = Base;