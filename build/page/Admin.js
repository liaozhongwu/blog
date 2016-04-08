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

var Admin = (function (_React$Component) {
	_inherits(Admin, _React$Component);

	function Admin() {
		_classCallCheck(this, Admin);

		_get(Object.getPrototypeOf(Admin.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Admin, [{
		key: "renderInput",
		value: function renderInput() {
			var blog = this.props.blog;

			var html = [];
			if (blog) {
				html.push(_react2["default"].createElement(
					"div",
					{ className: "form-group", key: "id" },
					_react2["default"].createElement("input", { className: "input block-level", type: "text", name: "id", placeholder: "id", defaultValue: blog.id, readOnly: true })
				));
				html.push(_react2["default"].createElement(
					"div",
					{ className: "form-group", key: "title" },
					_react2["default"].createElement("input", { className: "input block-level", type: "text", name: "title", placeholder: "title", defaultValue: blog.title })
				));
				html.push(_react2["default"].createElement(
					"div",
					{ className: "form-group", key: "content" },
					_react2["default"].createElement("textarea", { className: "textarea block-level", name: "content", placeholder: "content", defaultValue: blog.content })
				));
			} else {
				html.push(_react2["default"].createElement(
					"div",
					{ className: "form-group", key: "title" },
					_react2["default"].createElement("input", { className: "input block-level", type: "text", name: "title", placeholder: "title" })
				));
				html.push(_react2["default"].createElement(
					"div",
					{ className: "form-group", key: "content" },
					_react2["default"].createElement("textarea", { className: "textarea block-level", name: "content", placeholder: "content" })
				));
			}
			return html;
		}
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				{ className: "content" },
				_react2["default"].createElement(
					"form",
					{ className: "form", action: "/blog/save", method: "post" },
					this.renderInput(),
					_react2["default"].createElement(
						"div",
						{ className: "form-group" },
						_react2["default"].createElement("input", { className: "input", type: "password", name: "password", placeholder: "password" })
					),
					_react2["default"].createElement(
						"div",
						{ className: "form-group" },
						_react2["default"].createElement("input", { className: "btn", type: "submit", value: "保存" })
					)
				)
			);
		}
	}], [{
		key: "getMeta",
		value: function getMeta() {
			return {
				cssFile: ["/css/theme.css"]
			};
		}
	}]);

	return Admin;
})(_react2["default"].Component);

exports["default"] = Admin;
module.exports = exports["default"];