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

var Notice = (function (_React$Component) {
  _inherits(Notice, _React$Component);

  function Notice() {
    _classCallCheck(this, Notice);

    _get(Object.getPrototypeOf(Notice.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Notice, [{
    key: "render",
    value: function render() {
      var notices = this.props.notices;

      return _react2["default"].createElement(
        "div",
        { className: "content" },
        _react2["default"].createElement(
          "div",
          { className: "magic" },
          _react2["default"].createElement(
            "div",
            { className: "magic-block" },
            _react2["default"].createElement("img", { src: "/img/node.png", alt: "node", title: "node" })
          ),
          _react2["default"].createElement(
            "div",
            { className: "magic-block" },
            _react2["default"].createElement("img", { src: "/img/mongo.png", alt: "mongo", title: "mongo" })
          ),
          _react2["default"].createElement(
            "div",
            { className: "magic-block" },
            _react2["default"].createElement("img", { src: "/img/npm.png", alt: "npm", title: "npm" })
          ),
          _react2["default"].createElement(
            "div",
            { className: "magic-block" },
            _react2["default"].createElement("img", { src: "/img/react.png", alt: "react", title: "react" })
          ),
          _react2["default"].createElement(
            "div",
            { className: "magic-block" },
            _react2["default"].createElement("img", { src: "/img/gulp.png", alt: "gulp", title: "gulp" })
          ),
          _react2["default"].createElement(
            "div",
            { className: "magic-block" },
            _react2["default"].createElement("img", { src: "/img/webpack.png", alt: "webpack", title: "webpack" })
          ),
          _react2["default"].createElement(
            "div",
            { className: "magic-block" },
            _react2["default"].createElement("img", { src: "/img/html5.png", alt: "html5", title: "html5" })
          ),
          _react2["default"].createElement(
            "div",
            { className: "magic-block" },
            _react2["default"].createElement("img", { src: "/img/css3.png", alt: "css3", title: "css3" })
          )
        )
      );
    }
  }], [{
    key: "getMeta",
    value: function getMeta() {
      return {
        title: "廖仲武的个人网站 - Liaozhongwu's Personal Website",
        description: "廖仲武的个人网站 - Liaozhongwu's Personal Website",
        cssFile: ["/css/theme.css", "/css/index.css"]
      };
    }
  }]);

  return Notice;
})(_react2["default"].Component);

exports["default"] = Notice;
module.exports = exports["default"];