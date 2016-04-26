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

var Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  _createClass(Index, null, [{
    key: "getMeta",
    value: function getMeta() {
      return {
        title: "廖仲武的个人网站 - Liaozhongwu's Personal Website",
        description: "廖仲武的个人网站 - Liaozhongwu's Personal Website",
        cssFile: ["/css/theme.css", "/css/index/index.css"],
        jsFile: ["/js/index/index.js"]
      };
    }
  }]);

  function Index(props) {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Index).call(this));

    _this.state = {
      index: props.index,
      animationState: "enter"
    };
    return _this;
  }

  _createClass(Index, [{
    key: "random",
    value: function random() {
      var imgs = this.props.imgs;
      var index = this.state.index;

      while (true) {
        var tmp = Math.floor(imgs.length * Math.random());
        if (tmp !== index) {
          return tmp;
        }
      }
    }
  }, {
    key: "onChange",
    value: function onChange() {
      var _this2 = this;

      this.setState({
        animationState: "leave"
      }, function () {
        setTimeout(function () {
          _this2.setState({
            index: _this2.random(),
            animationState: "enter"
          });
        }, 300);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var imgs = this.props.imgs;
      var _state = this.state;
      var index = _state.index;
      var animationState = _state.animationState;

      return _react2.default.createElement(
        "div",
        { className: "main", onClick: function onClick(e) {
            return _this3.onChange();
          } },
        _react2.default.createElement("img", { className: "background background-fade-" + animationState, src: imgs[index] }),
        _react2.default.createElement(
          "div",
          { className: "box", onClick: function onClick(e) {
              return e.stopPropagation();
            } },
          _react2.default.createElement("img", { className: "avatar", src: "/img/avatar.png" }),
          _react2.default.createElement(
            "p",
            null,
            "stay hungry. stay foolish."
          ),
          _react2.default.createElement(
            "nav",
            { className: "nav" },
            _react2.default.createElement(
              "a",
              { href: "/" },
              "Home"
            ),
            _react2.default.createElement(
              "a",
              { href: "/blogs" },
              "Blog"
            ),
            _react2.default.createElement(
              "a",
              { href: "/about" },
              "About"
            )
          )
        )
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

exports.default = Index;