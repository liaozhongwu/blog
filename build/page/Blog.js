"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

	function Blog() {
		_classCallCheck(this, Blog);

		_get(Object.getPrototypeOf(Blog.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Blog, [{
		key: "render",
		value: function render() {
			var title = this.props.data.title || "";
			var content = this.props.data.content || "";
			var createTime = this.props.data.createTime || "";
			return _react2["default"].createElement(
				"div",
				{ className: "content" },
				_react2["default"].createElement(
					"div",
					{ className: "border-bottom" },
					_react2["default"].createElement(
						"p",
						{ className: "title" },
						title
					),
					"By ",
					_react2["default"].createElement(
						"a",
						{ href: "/about" },
						"liaozhongwu"
					),
					_react2["default"].createElement(
						"span",
						{ className: "time" },
						createTime
					)
				),
				_react2["default"].createElement("article", { dangerouslySetInnerHTML: { __html: converter.makeHtml(content) } })
			);
		}
	}], [{
		key: "getMeta",
		value: function getMeta() {
			return {
				cssFile: ["/css/theme.css"],
				jsFile: ["/page/blog.js"]
			};
		}
	}]);

	return Blog;
})(_react2["default"].Component);

exports["default"] = Blog;
module.exports = exports["default"];