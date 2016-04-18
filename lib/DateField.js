'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDatePicker = require('react-date-picker');

var _reactDatePicker2 = _interopRequireDefault(_reactDatePicker);

var _reactBootstrap = require('react-bootstrap');

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isValidDate(date) {
    return date && (0, _moment2.default)(date).isValid();
}

function parseLocalDate(text) {
    return (0, _moment2.default)(text, _moment2.default.localeData().longDateFormat('LL'));
}

function formatLocalDate(moment) {
    return moment.format('LL');
}

function parseISODate(date) {
    return isValidDate(date) ? (0, _moment2.default)(date) : (0, _moment2.default)();
}

function formatISODate(moment) {
    return moment.toISOString();
}

function formatUTCText(date) {
    return isValidDate(date) ? formatDate((0, _moment2.default)(date)) : date;
}

var PickDateModal = function PickDateModal(_ref) {
    var isOpen = _ref.isOpen;
    var onRequestClose = _ref.onRequestClose;
    var valueForPicker = _ref.valueForPicker;
    var onChange = _ref.onChange;

    return _react2.default.createElement(
        _reactBootstrap.Modal,
        { show: isOpen, onHide: onRequestClose, backdrop: true, 'aria-labelledby': 'contained-modal-title-lg' },
        _react2.default.createElement(
            _reactBootstrap.Modal.Header,
            { closeButton: true },
            'Datum wählen'
        ),
        _react2.default.createElement(
            _reactBootstrap.Modal.Body,
            null,
            _react2.default.createElement(_reactDatePicker2.default, {
                date: valueForPicker,
                onChange: onChange,
                hideFooter: 'true'
            })
        )
    );
};

var DateField = function (_Component) {
    _inherits(DateField, _Component);

    function DateField(props) {
        _classCallCheck(this, DateField);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateField).call(this, props));

        _this.state = {};
        _this.openModal = _this.openModal.bind(_this);
        _this.closeModal = _this.closeModal.bind(_this);
        _this.onChangePick = _this.onChangePick.bind(_this);
        return _this;
    }

    _createClass(DateField, [{
        key: 'render',
        value: function render() {
            var date = parseLocalDate(this.props.value);
            var btnPickDate = _react2.default.createElement(
                _reactBootstrap.Button,
                { onClick: this.openModal, tooltip: 'Datum auswählen' },
                _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'calendar' })
            );
            var valueForPicker = date != null && date.isValid() ? date : (0, _moment2.default)();

            var _props = this.props;
            var error = _props.error;
            var touched = _props.touched;

            var newProps = Object.assign({}, this.props);
            if (!newProps.type) newProps.type = 'text';
            var hasError = touched && error;
            var bsStyle = hasError ? 'error' : 'success';
            var addon = this.props.buttonAfter;

            return _react2.default.createElement(
                'div',
                { style: styles.base },
                _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    { validationState: bsStyle },
                    _react2.default.createElement(
                        _reactBootstrap.InputGroup,
                        { style: { width: '100%' } },
                        _react2.default.createElement(_reactBootstrap.FormControl, newProps),
                        _react2.default.createElement(
                            _reactBootstrap.InputGroup.Button,
                            null,
                            btnPickDate
                        )
                    ),
                    hasError && _react2.default.createElement(
                        _reactBootstrap.HelpBlock,
                        null,
                        error
                    )
                ),
                _react2.default.createElement(PickDateModal, {
                    isOpen: this.state.modalIsOpen,
                    onRequestClose: this.closeModal,
                    style: styles.modal,
                    valueForPicker: valueForPicker,
                    onChange: this.onChangePick
                })
            );
        }
    }, {
        key: 'openModal',
        value: function openModal() {
            this.setState({ modalIsOpen: true });
        }
    }, {
        key: 'closeModal',
        value: function closeModal() {
            this.setState({ modalIsOpen: false });
        }
    }, {
        key: 'onChangePick',
        value: function onChangePick(date, moment) {
            this.props.onChange(formatLocalDate(moment));
            this.closeModal();
        }
    }]);

    return DateField;
}(_react.Component);

var styles = {
    base: {
        display: 'table'
    }
};

var ExportClass = (0, _reactIntl.injectIntl)(DateField);

ExportClass.isValidDate = isValidDate;
ExportClass.parse = function (value) {
    return formatISODate(parseLocalDate(value));
};
ExportClass.format = function (value) {
    return formatLocalDate(parseISODate(value));
};
ExportClass.isValid = function (value) {
    return typeof value == 'undefined' || parseLocalDate(value).isValid();
};

exports.default = ExportClass;