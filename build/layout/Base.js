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

var _componentHeader = require("../component/Header");

var _componentHeader2 = _interopRequireDefault(_componentHeader);

var _componentFooter = require("../component/Footer");

var _componentFooter2 = _interopRequireDefault(_componentFooter);

var Base = (function (_React$Component) {
	_inherits(Base, _React$Component);

	function Base() {
		_classCallCheck(this, Base);

		_get(Object.getPrototypeOf(Base.prototype), "constructor", this).call(this);
	}

	_createClass(Base, [{
		key: "renderMeta",
		value: function renderMeta() {
			var html = [];
			if (this.props.meta) {
				this.props.meta.map(function (meta, i) {
					html.push(_react2["default"].createElement("meta", { key: i, name: meta.name, content: meta.content }));
				});
			}
			return html;
		}
	}, {
		key: "renderCss",
		value: function renderCss() {
			var html = [];
			if (this.props.style) {
				html.push(_react2["default"].createElement(
					"style",
					{ key: "style" },
					this.props.styles
				));
			}
			if (this.props.cssFile) {
				this.props.cssFile.map(function (path, i) {
					html.push(_react2["default"].createElement("link", { key: i, rel: "stylesheet", type: "text/css", href: path }));
				});
			}
			return html;
		}
	}, {
		key: "renderJs",
		value: function renderJs() {
			var html = [];
			if (this.props.APP_PROPS) {
				html.push(_react2["default"].createElement("script", { type: "text/javascript", key: "APP_PROPS",
					dangerouslySetInnerHTML: { __html: "window.APP_PROPS = " + JSON.stringify(this.props.APP_PROPS) } }));
			}
			if (this.props.jsFile) {
				this.props.jsFile.map(function (path, i) {
					html.push(_react2["default"].createElement("script", { key: i, type: "text/javascript", src: path }));
				});
			}
			return html;
		}
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"html",
				null,
				_react2["default"].createElement(
					"head",
					null,
					_react2["default"].createElement(
						"title",
						null,
						"廖仲武的博客 - liaozhongwu's blog"
					),
					_react2["default"].createElement("meta", { chatSet: "utf-8" }),
					_react2["default"].createElement("meta", { name: "author", content: "liaozhongwu<liaozhongwu95@163.com>" }),
					_react2["default"].createElement("meta", { name: "description", content: "廖仲武的博客 - liaozhongwu's blog" }),
					_react2["default"].createElement("meta", { name: "keywords", content: "廖仲武,博客,liaozhongwu,blog" }),
					_react2["default"].createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0, user-scalable=0" }),
					this.renderMeta(),
					this.renderCss(),
					_react2["default"].createElement("script", { type: "text/javascript", src: "/js/ga.js" })
				),
				_react2["default"].createElement(
					"body",
					null,
					_react2["default"].createElement(_componentHeader2["default"], null),
					_react2["default"].createElement("div", { className: "app", id: "app",
						dangerouslySetInnerHTML: { __html: this.props.content || "" } }),
					_react2["default"].createElement(_componentFooter2["default"], null),
					this.renderJs()
				)
			);
		}
	}]);

	return Base;
})(_react2["default"].Component);

exports["default"] = Base;
module.exports = exports["default"];