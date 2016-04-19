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

var About = function (_React$Component) {
	_inherits(About, _React$Component);

	function About() {
		_classCallCheck(this, About);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(About).apply(this, arguments));
	}

	_createClass(About, [{
		key: "renderList",
		value: function renderList() {
			var abouts = this.props.abouts;

			var html = [];
			abouts.map(function (about, i) {
				html.push(_react2.default.createElement(
					"div",
					{ className: "form-group", key: i },
					_react2.default.createElement(
						"label",
						{ className: "label" },
						about.title
					),
					_react2.default.createElement("span", { className: "form-static", dangerouslySetInnerHTML: { __html: about.content } })
				));
			});
			return html;
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "content" },
				_react2.default.createElement(
					"form",
					{ className: "form" },
					this.renderList(),
					_react2.default.createElement("img", { className: "qrcode-weixin", src: "/img/weixin.png" })
				)
			);
		}
	}], [{
		key: "getMeta",
		value: function getMeta() {
			return {
				title: "廖仲武的个人信息 - Liaozhongwu's Personal Infomation",
				description: "廖仲武的个人信息 - Liaozhongwu's Personal Infomation",
				cssFile: ["/css/theme.css", "/css/about/index.css"]
			};
		}
	}]);

	return About;
}(_react2.default.Component);

exports.default = About;