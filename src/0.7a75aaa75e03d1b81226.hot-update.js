webpackHotUpdate(0,{

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _reactRouter = __webpack_require__(179);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Title = __webpack_require__(238);
	
	var _Title2 = _interopRequireDefault(_Title);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //js
	
	
	//own files
	
	
	/**
	 * @author Kasper Nadrajkowski
	 * this class represents a simple header
	 */
	var Header = function (_React$Component) {
		_inherits(Header, _React$Component);
	
		function Header() {
			_classCallCheck(this, Header);
	
			var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));
	
			_this.logout = _this.logout.bind(_this);
			return _this;
		}
	
		_createClass(Header, [{
			key: "logout",
			value: function logout() {
				window.sessionStorage.accessToken = undefined;
				window.sessionStorage.displayName = '';
				document.location.href = '/';
			}
		}, {
			key: "render",
			value: function render() {
				var margin = { marginRight: 10 };
				var loginString = 'nicht angemeldet';
				if (window.sessionStorage.displayName !== undefined && window.sessionStorage.displayName != '') {
					loginString = 'Angemeldet als: ' + window.sessionStorage.displayName;
				}
				return _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(
						"nav",
						{ className: "navbar navbar-default navbar-fixed-top" },
						_react2.default.createElement(
							"div",
							null,
							_react2.default.createElement(
								"ul",
								{ className: "nav navbar-nav" },
								_react2.default.createElement(
									"a",
									{ style: margin, className: "navbar-brand", href: "#" },
									"Kieback & Peter"
								)
							),
							_react2.default.createElement(
								"button",
								{ style: margin, onClick: this.logout, className: "btn btn-default navbar-btn navbar-right" },
								"Logout"
							),
							_react2.default.createElement(
								"button",
								{ className: "btn btn-default navbar-btn navbar-right" },
								loginString
							)
						)
					)
				);
			}
		}]);
	
		return Header;
	}(_react2.default.Component);
	
	exports.default = Header;

/***/ }

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL0hlYWRlci5qcz9mZjFlIl0sIm5hbWVzIjpbIkhlYWRlciIsImxvZ291dCIsImJpbmQiLCJ3aW5kb3ciLCJzZXNzaW9uU3RvcmFnZSIsImFjY2Vzc1Rva2VuIiwidW5kZWZpbmVkIiwiZGlzcGxheU5hbWUiLCJkb2N1bWVudCIsImxvY2F0aW9uIiwiaHJlZiIsIm1hcmdpbiIsIm1hcmdpblJpZ2h0IiwibG9naW5TdHJpbmciLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7QUFHQTs7Ozs7Ozs7OztnZkFMQTs7O0FBSUE7OztBQUtBOzs7O0tBSU1BLE07OztBQUNMLG9CQUFhO0FBQUE7O0FBQUE7O0FBRVosU0FBS0MsTUFBTCxHQUFjLE1BQUtBLE1BQUwsQ0FBWUMsSUFBWixPQUFkO0FBRlk7QUFHWjs7Ozs0QkFFTztBQUNQQyxXQUFPQyxjQUFQLENBQXNCQyxXQUF0QixHQUFvQ0MsU0FBcEM7QUFDQUgsV0FBT0MsY0FBUCxDQUFzQkcsV0FBdEIsR0FBb0MsRUFBcEM7QUFDQUMsYUFBU0MsUUFBVCxDQUFrQkMsSUFBbEIsR0FBeUIsR0FBekI7QUFDQTs7OzRCQUNPO0FBQ1AsUUFBTUMsU0FBTyxFQUFDQyxhQUFhLEVBQWQsRUFBYjtBQUNBLFFBQUlDLGNBQWMsa0JBQWxCO0FBQ0EsUUFBR1YsT0FBT0MsY0FBUCxDQUFzQkcsV0FBdEIsS0FBdUNELFNBQXZDLElBQW9ESCxPQUFPQyxjQUFQLENBQXNCRyxXQUF0QixJQUFxQyxFQUE1RixFQUErRjtBQUM5Rk0sbUJBQWMscUJBQW1CVixPQUFPQyxjQUFQLENBQXNCRyxXQUF2RDtBQUNBO0FBQ0QsV0FDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsUUFBSyxXQUFNLHdDQUFYO0FBQ0k7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFVBQUksV0FBTSxnQkFBVjtBQUNDO0FBQUE7QUFBQSxXQUFHLE9BQU9JLE1BQVYsRUFBa0IsV0FBTSxjQUF4QixFQUF1QyxNQUFLLEdBQTVDO0FBQUE7QUFBQTtBQURELFFBREY7QUFJRDtBQUFBO0FBQUEsVUFBUSxPQUFPQSxNQUFmLEVBQXVCLFNBQVMsS0FBS1YsTUFBckMsRUFBNkMsV0FBTSx5Q0FBbkQ7QUFBQTtBQUFBLFFBSkM7QUFLRDtBQUFBO0FBQUEsVUFBUSxXQUFNLHlDQUFkO0FBQXlEWTtBQUF6RDtBQUxDO0FBREo7QUFERCxLQUREO0FBYUE7Ozs7R0E5Qm1CLGdCQUFNQyxTOzttQkFBckJkLE0iLCJmaWxlIjoiMC43YTc1YWFhNzVlMDNkMWI4MTIyNi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9qc1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuLy9vd24gZmlsZXNcbmltcG9ydCBUaXRsZSBmcm9tIFwiLi9IZWFkZXIvVGl0bGVcIjtcblxuXG5leHBvcnQgZGVmYXVsdFxuLyoqXG4gKiBAYXV0aG9yIEthc3BlciBOYWRyYWprb3dza2lcbiAqIHRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIHNpbXBsZSBoZWFkZXJcbiAqL1xuY2xhc3MgSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5sb2dvdXQgPSB0aGlzLmxvZ291dC5iaW5kKHRoaXMpO1xuXHR9XG5cblx0bG9nb3V0KCl7XG5cdFx0d2luZG93LnNlc3Npb25TdG9yYWdlLmFjY2Vzc1Rva2VuID0gdW5kZWZpbmVkO1xuXHRcdHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5kaXNwbGF5TmFtZSA9ICcnO1xuXHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3QgbWFyZ2luPXttYXJnaW5SaWdodDogMTB9XG5cdFx0dmFyIGxvZ2luU3RyaW5nID0gJ25pY2h0IGFuZ2VtZWxkZXQnO1xuXHRcdGlmKHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5kaXNwbGF5TmFtZSAgIT09IHVuZGVmaW5lZCAmJiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZGlzcGxheU5hbWUgIT0gJycpe1xuXHRcdFx0bG9naW5TdHJpbmcgPSAnQW5nZW1lbGRldCBhbHM6ICcrd2luZG93LnNlc3Npb25TdG9yYWdlLmRpc3BsYXlOYW1lO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8bmF2IGNsYXNzPVwibmF2YmFyIG5hdmJhci1kZWZhdWx0IG5hdmJhci1maXhlZC10b3BcIj5cblx0XHRcdFx0ICAgIDxkaXY+XG5cdFx0XHRcdCAgICAgIDx1bCBjbGFzcz1cIm5hdiBuYXZiYXItbmF2XCI+XG5cdFx0XHRcdCAgICAgIFx0PGEgc3R5bGU9e21hcmdpbn0gY2xhc3M9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI1wiPktpZWJhY2sgJiBQZXRlcjwvYT5cblx0XHRcdFx0ICAgICAgPC91bD5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBzdHlsZT17bWFyZ2lufSBvbkNsaWNrPXt0aGlzLmxvZ291dH0gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgbmF2YmFyLWJ0biBuYXZiYXItcmlnaHRcIj5Mb2dvdXQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBuYXZiYXItYnRuIG5hdmJhci1yaWdodFwiPntsb2dpblN0cmluZ308L2J1dHRvbj5cblx0XHRcdFx0ICAgIDwvZGl2PlxuXHRcdFx0XHQ8L25hdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NvbXBvbmVudHMvSGVhZGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==