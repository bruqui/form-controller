/// <reference types="react-scripts" />
"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFormController;

var React = _interopRequireWildcard(require("react"));

var lodash = _interopRequireWildcard(require("lodash"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useEffect = React.useEffect,
    useState = React.useState;
var endsWith = lodash.endsWith,
    forEach = lodash.forEach,
    get = lodash.get,
    isArray = lodash.isArray,
    isEmpty = lodash.isEmpty,
    isFunction = lodash.isFunction,
    mapValues = lodash.mapValues,
    omit = lodash.omit,
    set = lodash.set,
    transform = lodash.transform;

function useFormController(_ref) {
  var fieldProps = _ref.fieldProps,
      formProps = _ref.formProps;

  var _useState = useState(mapValues(fieldProps, function (_ref2) {
    var checked = _ref2.checked,
        type = _ref2.type,
        value = _ref2.value;
    return {
      checked: checked,
      type: type,
      value: value
    };
  })),
      _useState2 = _slicedToArray(_useState, 2),
      fieldState = _useState2[0],
      setFieldState = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      fieldErrors = _useState4[0],
      setFieldErrors = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      formIsSubmitting = _useState6[0],
      setFormIsSubmitting = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      initialSubmit = _useState8[0],
      setInitialSubmit = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      executeFieldPropUpdate = _useState10[0],
      setExecuteFieldPropUpdate = _useState10[1];

  useEffect(function () {
    if (executeFieldPropUpdate) {
      var newFieldState = _objectSpread({}, fieldState);

      forEach(fieldProps, function (fieldObj, fieldName) {
        newFieldState = _objectSpread({}, newFieldState, _defineProperty({}, fieldName, _objectSpread({}, newFieldState[fieldName], fieldObj)));
      });
      setFieldState(newFieldState);
      setExecuteFieldPropUpdate(false);
    }
  }, [executeFieldPropUpdate, fieldProps, fieldState]);

  function updateFieldProps() {
    setExecuteFieldPropUpdate(true);
  }

  function setField(name, payload) {
    setFieldState(_objectSpread({}, fieldState, _defineProperty({}, name, _objectSpread({}, fieldState[name], payload))));
  }

  function getFormValues() {
    var formValues = {};
    forEach(fieldState, function (_ref3, fieldName) {
      var checked = _ref3.checked,
          _ref3$ref = _ref3.ref,
          ref = _ref3$ref === void 0 ? {} : _ref3$ref,
          value = _ref3.value;

      if (!fieldProps[fieldName].doNotSubmit) {
        var typeIsCheckbox = fieldProps[fieldName].type === 'checkbox' || fieldProps[fieldName].type === 'radio';
        var nullValue = typeIsCheckbox ? undefined : formProps.nullValue;
        var formValue = checked || !typeIsCheckbox && value && value !== '' ? value : nullValue;

        if (formValue !== undefined) {
          var formValuePath = fieldProps[fieldName].formValuePath || fieldName;
          var setPath = isArray(formValuePath) ? formValuePath.join('.').replace('.[', '.').replace('].', '.') : formValuePath;

          if (endsWith(formValuePath.toString(), '[]')) {
            setPath = setPath.replace('[]', '');
            var currentFormValue = get(formValues, setPath) || [];
            set(formValues, setPath, [].concat(_toConsumableArray(currentFormValue), [formValue]));
          } else {
            set(formValues, setPath, formValue);
          }
        }
      }
    });
    return formValues;
  }

  function initField(inputRef) {
    if (inputRef !== null) {
      // Some componet libraries return inputElement as the actual ref
      // May need to add more if other libraries are used
      var inputElement = get(inputRef, 'inputElement') || inputRef;

      if (inputElement) {
        var name = inputElement.name;

        if (!name) {
          // eslint-disable-next-line
          console.error('useFormController: A name attribute must be specified for this element', {
            inputElement: inputElement
          });
        } else if (!get(fieldState, [name, 'ref'])) {
          setField(name, {
            ref: inputElement
          });
        }
      } else {
        // eslint-disable-next-line
        console.error('useFormController: Could not set a ref for this form field', {
          inputRef: inputRef
        });
      }
    }
  }

  function validateField(name, value) {
    var validateFunctions = fieldProps[name].validation;
    var fieldError;

    if (validateFunctions) {
      var fieldValidation = isArray(validateFunctions) ? validateFunctions : [validateFunctions]; // Using the lodash transform to run until it finds the first error
      // This way it only shows one validation error at a time until
      // they are all gone if there are multiples.

      transform(fieldValidation, function (returnFieldErrors, validator) {
        if (!isFunction(validator)) {
          // eslint-disable-next-line
          console.error('useFormController: Field validators must be functions', {
            validator: validator
          });
        } else {
          // TODO: Probably need to memoize getFormValues or something
          fieldError = validator(value, getFormValues());
        }

        return !fieldError;
      });

      if (fieldError) {
        setFieldErrors(_objectSpread({}, fieldErrors, _defineProperty({}, name, fieldError)));
      } else {
        setFieldErrors(omit(fieldErrors, name));
      }
    }

    return fieldError;
  }

  function getFieldsToValidate() {
    var fieldsToValidate = [];
    forEach(fieldProps, function (fieldProp, fieldName) {
      if (fieldProp.validation) {
        fieldsToValidate.push(fieldName);
      }
    });
    return fieldsToValidate;
  }

  function validateAllFields() {
    var fieldsHaveError = false;
    transform(getFieldsToValidate(), function (fieldErrors, fieldName) {
      var fieldError = validateField(fieldName, fieldState[fieldName].ref.value);
      fieldsHaveError = !!fieldError;
      return !fieldError;
    });
    return fieldsHaveError;
  }

  function handleFieldChange(event) {
    var _ref4 = event.currentTarget || {
      checked: false,
      name: 'nameNotSupplied',
      type: 'text',
      value: undefined
    },
        checked = _ref4.checked,
        name = _ref4.name,
        type = _ref4.type,
        value = _ref4.value;

    setField(name, {
      checked: checked === true ? true : false,
      type: type,
      value: value
    });
    validateField(name, value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    var fieldsHaveError;
    var onBeforeSubmit = get(formProps, 'onBeforeSubmit', function () {
      return null;
    });
    onBeforeSubmit();

    if (!validateAllFields()) {
      executeForm();
    }

    setInitialSubmit(true);
  }

  function executeForm() {
    return _executeForm.apply(this, arguments);
  }

  function _executeForm() {
    _executeForm = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var onExecuteSubmit, onAfterSubmit, formValues;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              onExecuteSubmit = get(formProps, 'onExecuteSubmit', function (formValues) {
                return null;
              });
              onAfterSubmit = get(formProps, 'onAfterSubmit', function () {
                return null;
              });
              formValues = getFormValues();
              setFormIsSubmitting(true);
              _context.next = 6;
              return onExecuteSubmit instanceof Promise;

            case 6:
              if (!_context.sent) {
                _context.next = 10;
                break;
              }

              onExecuteSubmit(formValues);
              _context.next = 11;
              break;

            case 10:
              Promise.resolve(onExecuteSubmit(formValues));

            case 11:
              setFormIsSubmitting(false);
              onAfterSubmit();

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _executeForm.apply(this, arguments);
  }

  function isFormSubmitting() {
    return !!(formIsSubmitting || formProps.formIsSubmitting);
  }

  var submitButtonProps = {
    disabled: !!(isFormSubmitting() || initialSubmit && !isEmpty(fieldErrors))
  };

  function getFieldProps(name) {
    var _objectSpread5;

    var _ref5 = get(fieldState, [name], {}),
        checked = _ref5.checked,
        value = _ref5.value;

    var _ref6 = get(fieldProps, [name], {}),
        inputRefKey = _ref6.inputRefKey,
        type = _ref6.type,
        otherProps = _ref6.otherProps;

    return _objectSpread((_objectSpread5 = {
      checked: checked,
      disabled: isFormSubmitting(),
      name: name,
      onChange: handleFieldChange
    }, _defineProperty(_objectSpread5, inputRefKey || 'ref', initField), _defineProperty(_objectSpread5, "type", type || 'text'), _defineProperty(_objectSpread5, "value", value), _objectSpread5), otherProps || {});
  }

  function getFormProps() {
    return _objectSpread({
      onSubmit: handleFormSubmit
    }, formProps.otherProps);
  }

  return {
    fieldErrors: initialSubmit ? fieldErrors : {},
    formIsSubmitting: isFormSubmitting(),
    getFormValues: getFormValues,
    getFormProps: getFormProps,
    getFieldProps: getFieldProps,
    submitButtonProps: submitButtonProps,
    updateFieldProps: updateFieldProps
  };
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWFjdC1hcHAtZW52LmQudHMiLCIuLi9zcmMvdXNlRm9ybUNvbnRyb2xsZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVPLFMsR0FBdUIsSyxDQUF2QixTO0lBQVcsUSxHQUFZLEssQ0FBWixRO0lBRWQsUSxHQVVBLE0sQ0FWQSxRO0lBQ0EsTyxHQVNBLE0sQ0FUQSxPO0lBQ0EsRyxHQVFBLE0sQ0FSQSxHO0lBQ0EsTyxHQU9BLE0sQ0FQQSxPO0lBQ0EsTyxHQU1BLE0sQ0FOQSxPO0lBQ0EsVSxHQUtBLE0sQ0FMQSxVO0lBQ0EsUyxHQUlBLE0sQ0FKQSxTO0lBQ0EsSSxHQUdBLE0sQ0FIQSxJO0lBQ0EsRyxHQUVBLE0sQ0FGQSxHO0lBQ0EsUyxHQUNBLE0sQ0FEQSxTOztBQXdKVyxTQUFTLGlCQUFULE9BR1c7QUFBQSxNQUZ0QixVQUVzQixRQUZ0QixVQUVzQjtBQUFBLE1BRHRCLFNBQ3NCLFFBRHRCLFNBQ3NCOztBQUFBLGtCQUNjLFFBQVEsQ0FDeEMsU0FBUyxDQUFDLFVBQUQsRUFBYSxpQkFBNEI7QUFBQSxRQUExQixPQUEwQixTQUExQixPQUEwQjtBQUFBLFFBQWpCLElBQWlCLFNBQWpCLElBQWlCO0FBQUEsUUFBWCxLQUFXLFNBQVgsS0FBVztBQUM5QyxXQUFPO0FBQUMsTUFBQSxPQUFPLEVBQVAsT0FBRDtBQUFVLE1BQUEsSUFBSSxFQUFKLElBQVY7QUFBZ0IsTUFBQSxLQUFLLEVBQUw7QUFBaEIsS0FBUDtBQUNILEdBRlEsQ0FEK0IsQ0FEdEI7QUFBQTtBQUFBLE1BQ2YsVUFEZTtBQUFBLE1BQ0gsYUFERzs7QUFBQSxtQkFNZ0IsUUFBUSxDQUFjLEVBQWQsQ0FOeEI7QUFBQTtBQUFBLE1BTWYsV0FOZTtBQUFBLE1BTUYsY0FORTs7QUFBQSxtQkFPMEIsUUFBUSxDQUFVLEtBQVYsQ0FQbEM7QUFBQTtBQUFBLE1BT2YsZ0JBUGU7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R0FBRyxDQUFDLFVBQUQsRUFBYSxDQUFDLElBQUQsQ0FBYixFQUFxQixFQUFyQixDQUZWO0FBQUEsUUFFMUIsV0FGMEIsU0FFMUIsV0FGMEI7QUFBQSxRQUViLElBRmEsU0FFYixJQUZhO0FBQUEsUUFFUCxVQUZPLFNBRVAsVUFGTzs7QUFJakM7QUFDSSxNQUFBLE9BQU8sRUFBUCxPQURKO0FBRUksTUFBQSxRQUFRLEVBQUUsZ0JBQWdCLEVBRjlCO0FBR0ksTUFBQSxJQUFJLEVBQUosSUFISjtBQUlJLE1BQUEsUUFBUSxFQUFFO0FBSmQsdUNBS0ssV0FBVyxJQUFJLEtBTHBCLEVBSzRCLFNBTDVCLDJDQU1VLElBQUksSUFBSSxNQU5sQiw0Q0FPSSxLQVBKLG9CQVFPLFVBQVUsSUFBSSxFQVJyQjtBQVVIOztBQUVELFdBQVMsWUFBVCxHQUF3QjtBQUNwQjtBQUNJLE1BQUEsUUFBUSxFQUFFO0FBRGQsT0FFTyxTQUFTLENBQUMsVUFGakI7QUFJSDs7QUFFRCxTQUFPO0FBQ0gsSUFBQSxXQUFXLEVBQUcsYUFBRCxHQUFrQixXQUFsQixHQUFnQyxFQUQxQztBQUVILElBQUEsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBRi9CO0FBR0gsSUFBQSxhQUFhLEVBQWIsYUFIRztBQUlILElBQUEsWUFBWSxFQUFaLFlBSkc7QUFLSCxJQUFBLGFBQWEsRUFBYixhQUxHO0FBTUgsSUFBQSxpQkFBaUIsRUFBakIsaUJBTkc7QUFPSCxJQUFBLGdCQUFnQixFQUFoQjtBQVBHLEdBQVA7QUFVSCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwicmVhY3Qtc2NyaXB0c1wiIC8+XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBsb2Rhc2ggZnJvbSAnbG9kYXNoJztcblxuY29uc3Qge3VzZUVmZmVjdCwgdXNlU3RhdGV9ID0gUmVhY3Q7XG5jb25zdCB7XG4gICAgZW5kc1dpdGgsXG4gICAgZm9yRWFjaCxcbiAgICBnZXQsXG4gICAgaXNBcnJheSxcbiAgICBpc0VtcHR5LFxuICAgIGlzRnVuY3Rpb24sXG4gICAgbWFwVmFsdWVzLFxuICAgIG9taXQsXG4gICAgc2V0LFxuICAgIHRyYW5zZm9ybSxcbn0gPSBsb2Rhc2g7XG5cbmludGVyZmFjZSB1c2VGb3JtQ29udHJvbGxlckFyZ3Mge1xuICAgIGZpZWxkUHJvcHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAgICBUaGUga2V5IHVzZWQgaGVyZSB3aWxsIGJlIHRoZSBuYW1lIGF0dHJpYnV0ZSBvZiB0aGUgZmllbGQuIEl0IHNob3VsZCBiZSBhIHVuaXF1ZVxuICAgICAgICAgICAgbmFtZS4gVGhpcyBrZXkgd2lsbCBiZSB0aGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIGZvcm1WYWx1ZVBhdGggaWYgdGhhdCBrZXkgaXNuJ3Qgc2V0LlxuICAgICAgICAgICAgSXQgaXMgaW1wb3J0YW50IHRvIE5PVCBzZXQgYSBuYW1lIGF0dHJpYnVlIGluIHRoZSBlbGVtZW50J3MvY29tcG9uZW50J3MgcHJvcHMgYW5kXG4gICAgICAgICAgICBvdmVycmlkZSB0aGlzIGtleTsgb3RoZXJ3aXNlLCB0aGUgdmFsdWUgd2lsbCBub3QgYmUgc2V0IHByb3Blcmx5IGZvciB0aGUgZm9ybSB2YWx1ZXNcbiAgICAgICAgICAgIG9yIHRoZSBzdGF0ZSB2YWx1ZSBvZiB0aGlzIGZpZWxkLiBJZiB5b3UgYXJlIHRyeWluZyB0byBwYXNzIGFuIGFycmF5IG9mIHZhbHVlcyBmb3JcbiAgICAgICAgICAgIGNoZWNrYm94ZXMsIHVzZSBhIHVuaXF1ZSBuYW1lIGhlcmUgZm9yIGVhY2ggY2hlY2tib3ggc3VjaCBhcyBteUNoZWNrYm94MSwgbXlDaGVja2JveDIsXG4gICAgICAgICAgICBldGMuIGFuZCBzZXQgdGhlIGZvcm1WYWx1ZVBhdGggdG8gdGhlIHNhbWUga2V5IHlvdSB3YW50IGl0IHRvIHVzZSB3aXRoIGFuIGFuZ2xlIGJyYWNrZXQsXG4gICAgICAgICAgICBhcyBpbiBbXSBhdCB0aGUgZW5kIG9mIHRoZSBuYW1lLiBTZWUgZm9ybVZhbHVlUGF0aCBvbiBob3cgdG8gZG8gdGhhdC5cbiAgICAgICAgKi9cbiAgICAgICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICAgICAgLyoqIFRoZSBpbml0YWwgY2hlY2tlZCB2YWx1ZSBmb3IgYSBjaGVja2JveCBmaWVsZCB3aGljaCBjYW4gYmUgY2hhbmdlZCBieSB0aGUgcGFyZW50ICovXG4gICAgICAgICAgICBjaGVja2VkPzogYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgICAgICAgICAgLyoqIElmIHRydWUsIHRoaXMgZmllbGRWYWx1ZSB3aWxsIG5vdCBiZSBzdWJtaXR0ZWQgd2l0aCB0aGUgZm9ybSB2YWx1ZXMgKi9cbiAgICAgICAgICAgIGRvTm90U3VibWl0PzogYm9vbGVhblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgRGVmYXVsdHMgdG8gdGhlIGtleSBvZiB0aGlzIG9iamVjdCBpZiBub3Qgc2V0LlxuICAgICAgICAgICAgICAgIFRoaXMgaXMgYSBwYXJhbSBmb3IgdGhlIGxvZGFzaCBnZXQvc2V0IGZ1bmN0aW9ucyB0byBiZSBhYmxlIHRvIHNldCB0aGUgZm9ybSB2YWx1ZXMgYXMgeW91IG5lZWQuXG4gICAgICAgICAgICAgICAgVGhpcyBtYWtlcyBpdCBwb3NzaWJsZSB0byBidWlsZCBhbiBvYmplY3QgaW4gdGhlIGZvcm0gdmFsdWVzIGFzIGRlc2lyZWQgc3VjaCBhcyBpZiB5b3VcbiAgICAgICAgICAgICAgICBzZXQgdGhlIGZvcm1WYWx1ZVBhdGggdG8gbXkuZmllbGQucGF0aC5maWVsZDEsIGl0IHdvdWxkIHN1Ym1pdCB0aGUgdmFsdWUgaW4gYW4gb2JqZWN0XG4gICAgICAgICAgICAgICAgbGlrZSB0aGlzLi4uXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBteToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiB7ZmllbGQxOiAndmFsdWUgb2YgZmllbGQxJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBJZiB5b3UgYWRkIGFuZ2xlIGJyYWNrZXRzIGF0IHRoZSBlbmQgYXMgaW4gW10sIHRoaXMgd2lsbCBhZGQvcmVtb3ZlIHZhbHVlcyB0byBhbiBhcnJheSB3aGljaFxuICAgICAgICAgICAgICAgIGlzIGhhbmR5IGZvciBhIHNldCBvZiBjaGVja2JveGVzIHlvdSdkIGxpa2UgdG8gc2VuZCBhbiBhcnJheSBvZiB2YWx1ZXMgZm9yIGVhY2ggY2hlY2tib3hcbiAgICAgICAgICAgICAgICB0aGF0IGlzIGNoZWNrZWQuIEZvciBpbnN0YW5jZSwgaWYgdXNlZCBzZXQgZm9ybVZhbHVlUGF0aCB0byBteUNoZWNrYm94W10gb24gbXVsdGlwbGVcbiAgICAgICAgICAgICAgICBjaGVja2JveGVzIGluIHRoZSBmb3JtLCBpdCB3b3VsZCBzdWJtaXQgYSB2YWx1ZSBsaWtlIHRoaXMuLi5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG15Q2hlY2tib3g6IFsndmFsdWUgb2YgZmlyc3QgY2hlY2tib3ggY2hlY2tlZCcsICd2YWx1ZSBvZiBzZWNvbmQgY2hlY2tib3ggY2hlY2tlZCddXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFRoZSBlbXB0eSBhbmdsZSBicmFja2V0cywgW10sIGNhbiBvbmx5IGdvIGF0IHRoZSBlbmQgb2YgdGhlIGZvcm1WYWx1ZVBhdGguIEFueXRoaW5nIGVsc2VcbiAgICAgICAgICAgICAgICB3aXRoaW4gdGhlIHBhdGggbXVzdCBoYXZlIGFuIGluZGV4IG51bWJlciBsaWtlIG15LmZpZWxkWzBdLnBhdGhbXS5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBmb3JtVmFsdWVQYXRoPzogc3RyaW5nIHwgc3RyaW5nW11cbiAgICAgICAgICAgIC8qKiBBbHRlcm5hdGUga2V5IHRvIGJlIHVzZWQgZm9yIHRoZSByZWYgZm9yIGNvbXBvbmVudHMgdGhhdCB1c2Ugb3RoZXIga2V5cyBzdWNoIGFzIGlucHV0UmVmIGluc3RlYWQgKi9cbiAgICAgICAgICAgIGlucHV0UmVmS2V5Pzogc3RyaW5nXG4gICAgICAgICAgICAvKiogQ2FsbGJhY2sgZnVuY3Rpb24gdG8gcnVuIGF0IHRoZSBlbmQgb2YgdGhlIG9uQ2hhbmdlIGV2ZW50IG9mIHRoZSBlbGVtZW50ICovXG4gICAgICAgICAgICBvbkFmdGVyQ2hhbmdlPzogRnVuY3Rpb25cbiAgICAgICAgICAgIC8qKiBDYWxsYmFjayBmdW5jdGlvbiB0byBydW4gYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgb25DaGFuZ2UgZXZlbnQgb2YgdGhlIGVsZW1lbnQgKi9cbiAgICAgICAgICAgIG9uQmVmb3JlQ2hhbmdlPzogRnVuY3Rpb25cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgIE90aGVyIHByb3BzIHRvIGJlIGFkZGVkIHRvIHRoZSBmaWVsZCBwcm9wcyB0aGF0IHdpbGwgbm90IGJlIHVzZWQgYnkgdGhpcyBob29rLlxuICAgICAgICAgICAgICAgIFRoZXNlIGNhbiBhbHNvIGJlIGFkZGVkIHRvIHRoZSBjb21wb25lbnQvZWxlbWVudCBkaXJlY3RseTsgaG93ZXZlciwgaXQgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgaGVyZSBhcyBhbiBvcHRvaW4gdG8ga2VlcCBhbGwgdGhlIHByb3BzIGluIG9uZSBwbGFjZS5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBvdGhlclByb3BzPzogb2JqZWN0XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICBUaGUgdHlwZSBvZiBpbnB1dCBzdWNoIGFzIGNoZWNrZWQsIHJhZGlvLCB0ZXh0LCBldGMuIFRoaXMgb25seSBuZWVkcyB0byBiZSBzZXRcbiAgICAgICAgICAgICAgICBpZiBpdCdzIHNvbWV0aGluZyBvdGhlciB0aGFuIHRleHQuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgdHlwZT86IHN0cmluZ1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgQSBmdW5jdGlvbiBvciBhcnJheSBvZiBmdW5jdGlvbnMgdG8gcnVuIGFnYWluc3QgdGhlIHZhbHVlIG9mIHRoZSBmaWVsZFxuICAgICAgICAgICAgICAgIElmIHRoZSB2YWx1ZSBwYXNzZXMgaXQgc2hvdWxkIHJldHVybiB1bmRlZmluZWQuIElmIG5vdCwgaXQgc2hvdWxkIHJldHVyblxuICAgICAgICAgICAgICAgIHRoZSBkZXNpcmVkIGZpZWxkIGVycm9yIHN1Y2ggYXMgXCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkXCIuIFRoZSBjYWxsYmFjayBhcmd1bWVudHNcbiAgICAgICAgICAgICAgICBhcmUgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGZpZWxkIGZvciB0aGUgZmlyc3QgYXJndW1lbnQgYW5kIHRoZSBmaWVsZCB2YWx1ZXMgb2ZcbiAgICAgICAgICAgICAgICB0aGUgb3RoZXIgZmllbGRzIGluIHRoZSBzZWNvbmQgYXJndW1lbnQgaW4gY2FzZSB2YWxpZGF0aW9uIG5lZWRzIHRvIGhhcHBlbiBiYXNlZFxuICAgICAgICAgICAgICAgIG9uIHRoZSB2YWx1ZSBvZiBhbm90aGVyIGZpZWxkLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhbGlkYXRpb24/OiAoZmllbGRWYWx1ZTogYW55LCBmaWVsZFZhbHVlczogT2JqZWN0KSA9PiBzdHJpbmcgfCB1bmRlZmluZWQgfCBbKGZpZWxkVmFsdWU6IGFueSwgZmllbGRWYWx1ZXM6IE9iamVjdCkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkXVxuICAgICAgICAgICAgLyoqIFRoZSBpbml0YWwgdmFsdWUgZm9yIHRoZSBmaWVsZCB3aGljaCBjYW4gYmUgY2hhbmdlZCBieSB0aGUgcGFyZW50ICovXG4gICAgICAgICAgICB2YWx1ZT86IG51bWJlciB8IHN0cmluZyB8IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgfVxuICAgIGZvcm1Qcm9wczoge1xuICAgICAgICAvKipcbiAgICAgICAgICAgIE92ZXJhbGwgZGVzaXJlZCBmb3JtIHZhbHVlIHRvIHN1Ym1pdCB3aGVuIHRoZSBmaWVsZCBpcyBlbXB0eSBvciBjaGVja2JveCBpc24ndCBjaGVja2VkLlxuICAgICAgICAgICAgVGhpcyBpcyB0eXBpY2FsbHkgdGhlIHZhbHVlIHlvdSB3YW50IHRvIHNlZSBvbiB0aGUgYmFja2VuZC4gSWYgdGhpcyBpc24ndCBzZXQgb3JcbiAgICAgICAgICAgIHRoZSB2YWx1ZSBpcyBzZXQgdG8gdW5kZWZpbmVkLCB0aGUga2V5IG9mIHRoZSBmaWVsZCB3aWxsIG5vdCBiZSBzdWJtaXR0ZWQgd2l0aCB0aGVcbiAgICAgICAgICAgIGZvcm0gdmFsdWVzIG9iamVjdC5cbiAgICAgICAgKi9cbiAgICAgICAgbnVsbFZhbHVlPzogbnVsbCB8IHN0cmluZyB8IHVuZGVmaW5lZFxuICAgICAgICAvKipcbiAgICAgICAgICAgIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHJ1biBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBvblN1Ym1pdCBldmVudCBvZiB0aGUgZm9ybSBlbGVtZW50LlxuICAgICAgICAgICAgVGhpcyB3aWxsIGV4ZWN1dGUgYmVmb3JlIGFueXRoaW5nIGluY2x1ZGluZyB0aGUgdmFsaWRhdGlvbiBydW5zIGFuZCB3aWxsIHBlcmZvcm1cbiAgICAgICAgICAgIGFueSB0aW1lIHRoZSBvblN1Ym1pdCBldmVudCBpcyBkaXNwYXRjaGVkLlxuICAgICAgICAqL1xuICAgICAgICBvbkJlZm9yZVN1Ym1pdD86IEZ1bmN0aW9uXG4gICAgICAgIC8qKlxuICAgICAgICAgICAgQ2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGFsbCB2YWxpZGF0aW9uIHBhc3NlcyBmb3IgdGhlIGZvcm0gYW5kIGl0J3NcbiAgICAgICAgICAgIHNhZmUgdG8gc3VibWl0LiBUaGlzIGlzIHRoZSBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSB1c2VkIGZvciB0aGUgY2FsbCB0byB0aGVcbiAgICAgICAgICAgIGJhY2tlbmQgb3IgZGVzaXJlZCBhY3Rpb25zIGFmdGVyIGV2ZXJ5dGhpbmcgcGFzc2VzIGZyb20gdGhlIGZvcm0uIElmIHRoaXMgZnVuY3Rpb25cbiAgICAgICAgICAgIGRvZXMgbm90IHJldHVybiBhIFByb21pc2UsIHRoaXMgY3VzdG9tIGhvb2sgd2lsbCBhZGQgb25lLlxuICAgICAgICAqL1xuICAgICAgICBvbkV4ZWN1dGVTdWJtaXQ/OiBGdW5jdGlvblxuICAgICAgICAvKipcbiAgICAgICAgICAgIENhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgYWZ0ZXIgdGhlIFByb21pc2UgZnJvbSBvbkV4ZWN1dGVTdWJtaXQgaGFzIGJlZW5cbiAgICAgICAgICAgIHJlc29sdmVkLiBUaGlzIGlzIHRoZSBmdW5jdGlvbiB0byB1c2UgZm9yIHN1Y2Nlc2Z1bCBzdWJtaXRzIHN1Y2ggYXMgY2xvc2luZ1xuICAgICAgICAgICAgYSBtb2RhbCwgbmF2aWdhdGluZyB0byBhIG5ldyBwYWdlIG9yIHNob3dpbmcgYSBzdWNjZXNzIG1lc3NhZ2UuXG4gICAgICAgICovXG4gICAgICAgIG9uQWZ0ZXJTdWJtaXQ/OiBGdW5jdGlvblxuICAgICAgICAvKipcbiAgICAgICAgICAgIE90aGVyIHByb3BzIHRvIGJlIGFkZGVkIHRvIHRoZSBmb3JtIHByb3BzIHRoYXQgd2lsbCBub3QgYmUgdXNlZCBieSB0aGlzIGhvb2suXG4gICAgICAgICAgICBUaGVzZSBjYW4gYWxzbyBiZSBhZGRlZCB0byB0aGUgY29tcG9uZW50L2VsZW1lbnQgZGlyZWN0bHk7IGhvd2V2ZXIsIGl0IGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgaGVyZSBhcyBhbiBvcHRvaW4gdG8ga2VlcCBhbGwgdGhlIHByb3BzIGluIG9uZSBwbGFjZS4uXG4gICAgICAgICovXG4gICAgICAgIG90aGVyUHJvcHM/OiBPYmplY3RcbiAgICAgICAgLyoqXG4gICAgICAgICAgICBCb29sZWFuIHRvIGluZGljYXRlZCBpZiB0aGVyZSBhcmUgb3RoZXIgc3VibWlzc2lvbiBmYWN0b3JzIGdvaW5nIG9uIHdoaWNoXG4gICAgICAgICAgICB3aWxsIHVsaXRpbWF0ZWx5IGRpc2FibGUgYWxsIGZpZWxkcyBhbmQgc3VibWl0IGJ1dHRvblxuICAgICAgICAqL1xuICAgICAgICBmb3JtSXNTdWJtaXR0aW5nPzogYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgIH1cbn1cblxuaW50ZXJmYWNlIHVzZUZvcm1Db250cm9sbGVyUmVzcG9uc2Uge1xuICAgIGZpZWxkRXJyb3JzOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xuICAgIH1cbiAgICBmb3JtSXNTdWJtaXR0aW5nOiBib29sZWFuXG4gICAgZ2V0Rm9ybVByb3BzOiAoKSA9PiAoe1xuICAgICAgICBba2V5OiBzdHJpbmddOiB7XG4gICAgICAgICAgICBvblN1Ym1pdDogRnVuY3Rpb25cbiAgICAgICAgfVxuICAgIH0pXG4gICAgZ2V0RmllbGRQcm9wczogKCkgPT4gKHtcbiAgICAgICAgY2hlY2tlZD86IGJvb2xlYW5cbiAgICAgICAgZGlzYWJsZWQ/OiBib29sZWFuXG4gICAgICAgIG5hbWU6IHN0cmluZ1xuICAgICAgICByZWY/OiBGdW5jdGlvblxuICAgICAgICBba2V5OiBzdHJpbmddOiBGdW5jdGlvblxuICAgICAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbFxuICAgIH0pXG4gICAgc3VibWl0QnV0dG9uUHJvcHM6IHtcbiAgICAgICAgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHVwZGF0ZUZpZWxkUHJvcHM6IEZ1bmN0aW9uXG59XG5cbmludGVyZmFjZSBmaWVsZFN0YXRlIHtcbiAgICBba2V5OiBzdHJpbmddOiB7XG4gICAgICAgIGNoZWNrZWQ/OiBib29sZWFuIHwgdW5kZWZpbmVkXG4gICAgICAgIHJlZj86IGFueSAvLyBQcm9iYWJseSBzaG91bGQgZmluZCB0aGUgcmlnaHQgdHlwZSBmb3IgdGhpc1xuICAgICAgICB0eXBlPzogc3RyaW5nXG4gICAgICAgIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkXG4gICAgfVxufVxuXG5pbnRlcmZhY2UgZmllbGRFcnJvcnMge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VGb3JtQ29udHJvbGxlcjx1c2VGb3JtQ29udHJvbGxlclJlc3BvbnNlPih7XG4gICAgZmllbGRQcm9wcyxcbiAgICBmb3JtUHJvcHMsXG59OiB1c2VGb3JtQ29udHJvbGxlckFyZ3MpIHtcbiAgICBjb25zdCBbZmllbGRTdGF0ZSwgc2V0RmllbGRTdGF0ZV0gPSB1c2VTdGF0ZTxmaWVsZFN0YXRlPihcbiAgICAgICAgbWFwVmFsdWVzKGZpZWxkUHJvcHMsICh7Y2hlY2tlZCwgdHlwZSwgdmFsdWV9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge2NoZWNrZWQsIHR5cGUsIHZhbHVlfVxuICAgICAgICB9KVxuICAgICk7XG4gICAgY29uc3QgW2ZpZWxkRXJyb3JzLCBzZXRGaWVsZEVycm9yc10gPSB1c2VTdGF0ZTxmaWVsZEVycm9ycz4oe30pO1xuICAgIGNvbnN0IFtmb3JtSXNTdWJtaXR0aW5nLCBzZXRGb3JtSXNTdWJtaXR0aW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgICBjb25zdCBbaW5pdGlhbFN1Ym1pdCwgc2V0SW5pdGlhbFN1Ym1pdF0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW2V4ZWN1dGVGaWVsZFByb3BVcGRhdGUsIHNldEV4ZWN1dGVGaWVsZFByb3BVcGRhdGVdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGV4ZWN1dGVGaWVsZFByb3BVcGRhdGUpIHtcbiAgICAgICAgICAgIGxldCBuZXdGaWVsZFN0YXRlID0gey4uLmZpZWxkU3RhdGV9O1xuXG4gICAgICAgICAgICBmb3JFYWNoKGZpZWxkUHJvcHMsIChmaWVsZE9iaiwgZmllbGROYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3RmllbGRTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5uZXdGaWVsZFN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgIFtmaWVsZE5hbWVdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC4uLm5ld0ZpZWxkU3RhdGVbZmllbGROYW1lXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uZmllbGRPYmosXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZXRGaWVsZFN0YXRlKG5ld0ZpZWxkU3RhdGUpO1xuICAgICAgICAgICAgc2V0RXhlY3V0ZUZpZWxkUHJvcFVwZGF0ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFtleGVjdXRlRmllbGRQcm9wVXBkYXRlLCBmaWVsZFByb3BzLCBmaWVsZFN0YXRlXSlcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUZpZWxkUHJvcHMoKSB7XG4gICAgICAgIHNldEV4ZWN1dGVGaWVsZFByb3BVcGRhdGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0RmllbGQoXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgY2hlY2tlZD86IGJvb2xlYW4gfCB1bmRlZmluZWRcbiAgICAgICAgICAgIHJlZj86IGFueSAvLyBQcm9iYWJseSBzaG91bGQgZmluZCB0aGUgcmlnaHQgdHlwZSBmb3IgdGhpc1xuICAgICAgICAgICAgdHlwZT86IHN0cmluZ1xuICAgICAgICAgICAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWRcbiAgICB9KSB7XG4gICAgICAgIHNldEZpZWxkU3RhdGUoe1xuICAgICAgICAgICAgICAuLi5maWVsZFN0YXRlLFxuICAgICAgICAgICAgICBbbmFtZV06IHtcbiAgICAgICAgICAgICAgICAgIC4uLmZpZWxkU3RhdGVbbmFtZV0sXG4gICAgICAgICAgICAgICAgICAuLi5wYXlsb2FkLFxuICAgICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZvcm1WYWx1ZXMoKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgICAgICBsZXQgZm9ybVZhbHVlcyA9IHt9O1xuXG4gICAgICAgIGZvckVhY2goZmllbGRTdGF0ZSwgKHtjaGVja2VkLCByZWYgPSB7fSwgdmFsdWV9LCBmaWVsZE5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmICghZmllbGRQcm9wc1tmaWVsZE5hbWVdLmRvTm90U3VibWl0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZUlzQ2hlY2tib3ggPSAoXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkUHJvcHNbZmllbGROYW1lXS50eXBlID09PSAnY2hlY2tib3gnIHx8XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkUHJvcHNbZmllbGROYW1lXS50eXBlID09PSAncmFkaW8nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBudWxsVmFsdWUgPSAodHlwZUlzQ2hlY2tib3gpXG4gICAgICAgICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIDogZm9ybVByb3BzLm51bGxWYWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtVmFsdWUgPSAoY2hlY2tlZCB8fCAoIXR5cGVJc0NoZWNrYm94ICYmIHZhbHVlICYmIHZhbHVlICE9PSAnJykpXG4gICAgICAgICAgICAgICAgICAgID8gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9ybVZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybVZhbHVlUGF0aCA9IGZpZWxkUHJvcHNbZmllbGROYW1lXS5mb3JtVmFsdWVQYXRoIHx8IGZpZWxkTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNldFBhdGggPSAoaXNBcnJheShmb3JtVmFsdWVQYXRoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZm9ybVZhbHVlUGF0aC5qb2luKCcuJykucmVwbGFjZSgnLlsnLCAnLicpLnJlcGxhY2UoJ10uJywgJy4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBmb3JtVmFsdWVQYXRoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmRzV2l0aChmb3JtVmFsdWVQYXRoLnRvU3RyaW5nKCksICdbXScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQYXRoID0gc2V0UGF0aC5yZXBsYWNlKCdbXScsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRGb3JtVmFsdWUgPSAgZ2V0KGZvcm1WYWx1ZXMsIHNldFBhdGgpIHx8IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoZm9ybVZhbHVlcywgc2V0UGF0aCwgWy4uLmN1cnJlbnRGb3JtVmFsdWUsIGZvcm1WYWx1ZV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KGZvcm1WYWx1ZXMsIHNldFBhdGgsIGZvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmb3JtVmFsdWVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRGaWVsZDxIdG1sSW5wdXRFbGVtZW50PihpbnB1dFJlZjogYW55KSB7XG4gICAgICAgIGlmIChpbnB1dFJlZiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gU29tZSBjb21wb25ldCBsaWJyYXJpZXMgcmV0dXJuIGlucHV0RWxlbWVudCBhcyB0aGUgYWN0dWFsIHJlZlxuICAgICAgICAgICAgLy8gTWF5IG5lZWQgdG8gYWRkIG1vcmUgaWYgb3RoZXIgbGlicmFyaWVzIGFyZSB1c2VkXG4gICAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBnZXQoaW5wdXRSZWYsICdpbnB1dEVsZW1lbnQnKSB8fCBpbnB1dFJlZjtcbiAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7bmFtZX0gPSBpbnB1dEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAndXNlRm9ybUNvbnRyb2xsZXI6IEEgbmFtZSBhdHRyaWJ1dGUgbXVzdCBiZSBzcGVjaWZpZWQgZm9yIHRoaXMgZWxlbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB7aW5wdXRFbGVtZW50fVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWdldChmaWVsZFN0YXRlLCBbbmFtZSwgJ3JlZiddKSkge1xuICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZChuYW1lLCB7cmVmOiBpbnB1dEVsZW1lbnR9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICd1c2VGb3JtQ29udHJvbGxlcjogQ291bGQgbm90IHNldCBhIHJlZiBmb3IgdGhpcyBmb3JtIGZpZWxkJyxcbiAgICAgICAgICAgICAgICAgICAge2lucHV0UmVmfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUZpZWxkKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IFtzdHJpbmcgfCBudW1iZXJdIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlRnVuY3Rpb25zID0gZmllbGRQcm9wc1tuYW1lXS52YWxpZGF0aW9uO1xuICAgICAgICBsZXQgZmllbGRFcnJvcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICh2YWxpZGF0ZUZ1bmN0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgZmllbGRWYWxpZGF0aW9uID0gKGlzQXJyYXkodmFsaWRhdGVGdW5jdGlvbnMpKSA/IHZhbGlkYXRlRnVuY3Rpb25zIDogW3ZhbGlkYXRlRnVuY3Rpb25zXTtcblxuICAgICAgICAgICAgLy8gVXNpbmcgdGhlIGxvZGFzaCB0cmFuc2Zvcm0gdG8gcnVuIHVudGlsIGl0IGZpbmRzIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgLy8gVGhpcyB3YXkgaXQgb25seSBzaG93cyBvbmUgdmFsaWRhdGlvbiBlcnJvciBhdCBhIHRpbWUgdW50aWxcbiAgICAgICAgICAgIC8vIHRoZXkgYXJlIGFsbCBnb25lIGlmIHRoZXJlIGFyZSBtdWx0aXBsZXMuXG4gICAgICAgICAgICB0cmFuc2Zvcm0oZmllbGRWYWxpZGF0aW9uLCAocmV0dXJuRmllbGRFcnJvcnMsIHZhbGlkYXRvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghaXNGdW5jdGlvbih2YWxpZGF0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCd1c2VGb3JtQ29udHJvbGxlcjogRmllbGQgdmFsaWRhdG9ycyBtdXN0IGJlIGZ1bmN0aW9ucycsIHt2YWxpZGF0b3J9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IFByb2JhYmx5IG5lZWQgdG8gbWVtb2l6ZSBnZXRGb3JtVmFsdWVzIG9yIHNvbWV0aGluZ1xuICAgICAgICAgICAgICAgICAgICBmaWVsZEVycm9yID0gdmFsaWRhdG9yKHZhbHVlLCBnZXRGb3JtVmFsdWVzKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICFmaWVsZEVycm9yO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChmaWVsZEVycm9yKSB7XG4gICAgICAgICAgICAgICAgc2V0RmllbGRFcnJvcnMoe1xuICAgICAgICAgICAgICAgICAgICAuLi5maWVsZEVycm9ycyxcbiAgICAgICAgICAgICAgICAgICAgW25hbWVdOiBmaWVsZEVycm9yLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldEZpZWxkRXJyb3JzKG9taXQoZmllbGRFcnJvcnMsIG5hbWUpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpZWxkRXJyb3I7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RmllbGRzVG9WYWxpZGF0ZSgpOiBzdHJpbmdbXSB7XG4gICAgICAgIGxldCBmaWVsZHNUb1ZhbGlkYXRlOnN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yRWFjaChmaWVsZFByb3BzLCAoZmllbGRQcm9wLCBmaWVsZE5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWVsZFByb3AudmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICAgIGZpZWxkc1RvVmFsaWRhdGUucHVzaChmaWVsZE5hbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGZpZWxkc1RvVmFsaWRhdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVBbGxGaWVsZHMoKTpib29sZWFuIHtcbiAgICAgICAgbGV0IGZpZWxkc0hhdmVFcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIHRyYW5zZm9ybShnZXRGaWVsZHNUb1ZhbGlkYXRlKCksIChmaWVsZEVycm9yczogT2JqZWN0LCBmaWVsZE5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmllbGRFcnJvciA9IHZhbGlkYXRlRmllbGQoXG4gICAgICAgICAgICAgICAgZmllbGROYW1lLFxuICAgICAgICAgICAgICAgIGZpZWxkU3RhdGVbZmllbGROYW1lXS5yZWYudmFsdWUsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBmaWVsZHNIYXZlRXJyb3IgPSAhIWZpZWxkRXJyb3JcbiAgICAgICAgICAgIHJldHVybiAhZmllbGRFcnJvcjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZpZWxkc0hhdmVFcnJvcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVGaWVsZENoYW5nZShldmVudDogUmVhY3QuRm9ybUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNoZWNrZWQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0IHx8IHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbmFtZTogJ25hbWVOb3RTdXBwbGllZCcsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuXG4gICAgICAgIHNldEZpZWxkKG5hbWUsIHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IChjaGVja2VkID09PSB0cnVlKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHZhbGlkYXRlRmllbGQobmFtZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvcm1TdWJtaXQoZXZlbnQ6IFJlYWN0LkZvcm1FdmVudDxIVE1MRm9ybUVsZW1lbnQ+KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGZpZWxkc0hhdmVFcnJvcjtcbiAgICAgICAgY29uc3Qgb25CZWZvcmVTdWJtaXQgPSBnZXQoZm9ybVByb3BzLCAnb25CZWZvcmVTdWJtaXQnLCAoKSA9PiBudWxsKTtcblxuICAgICAgICBvbkJlZm9yZVN1Ym1pdCgpO1xuXG4gICAgICAgIGlmICghdmFsaWRhdGVBbGxGaWVsZHMoKSkge1xuICAgICAgICAgICAgZXhlY3V0ZUZvcm0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEluaXRpYWxTdWJtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUZvcm0oKSB7XG4gICAgICAgIGNvbnN0IG9uRXhlY3V0ZVN1Ym1pdCA9IGdldChmb3JtUHJvcHMsICdvbkV4ZWN1dGVTdWJtaXQnLCAoZm9ybVZhbHVlczogb2JqZWN0KSA9PiBudWxsKTtcbiAgICAgICAgY29uc3Qgb25BZnRlclN1Ym1pdCA9IGdldChmb3JtUHJvcHMsICdvbkFmdGVyU3VibWl0JywgKCkgPT4gbnVsbCk7XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSBnZXRGb3JtVmFsdWVzKCk7XG5cbiAgICAgICAgc2V0Rm9ybUlzU3VibWl0dGluZyh0cnVlKTtcbiAgICAgICAgYXdhaXQgKG9uRXhlY3V0ZVN1Ym1pdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgICAgICA/IG9uRXhlY3V0ZVN1Ym1pdChmb3JtVmFsdWVzKVxuICAgICAgICAgICAgOiBQcm9taXNlLnJlc29sdmUob25FeGVjdXRlU3VibWl0KGZvcm1WYWx1ZXMpKTtcblxuICAgICAgICBzZXRGb3JtSXNTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICAgICAgb25BZnRlclN1Ym1pdCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRm9ybVN1Ym1pdHRpbmcoKSB7XG4gICAgICAgIHJldHVybiAhIShmb3JtSXNTdWJtaXR0aW5nIHx8IGZvcm1Qcm9wcy5mb3JtSXNTdWJtaXR0aW5nKVxuICAgIH1cblxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvblByb3BzID0ge1xuICAgICAgICBkaXNhYmxlZDogISEoXG4gICAgICAgICAgICBpc0Zvcm1TdWJtaXR0aW5nKCkgfHxcbiAgICAgICAgICAgIChpbml0aWFsU3VibWl0ICYmICFpc0VtcHR5KGZpZWxkRXJyb3JzKSlcbiAgICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZpZWxkUHJvcHMobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHtjaGVja2VkLCB2YWx1ZX0gPSBnZXQoZmllbGRTdGF0ZSwgW25hbWVdLCB7fSkgYXMgYW55O1xuICAgICAgICBjb25zdCB7aW5wdXRSZWZLZXksIHR5cGUsIG90aGVyUHJvcHN9ID0gZ2V0KGZpZWxkUHJvcHMsIFtuYW1lXSwge30pIGFzIGFueTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hlY2tlZCxcbiAgICAgICAgICAgIGRpc2FibGVkOiBpc0Zvcm1TdWJtaXR0aW5nKCksXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgb25DaGFuZ2U6IGhhbmRsZUZpZWxkQ2hhbmdlLFxuICAgICAgICAgICAgW2lucHV0UmVmS2V5IHx8ICdyZWYnXTogaW5pdEZpZWxkLFxuICAgICAgICAgICAgdHlwZTogdHlwZSB8fCAndGV4dCcsXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIC4uLm90aGVyUHJvcHMgfHwge30sXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGb3JtUHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblN1Ym1pdDogaGFuZGxlRm9ybVN1Ym1pdCxcbiAgICAgICAgICAgIC4uLmZvcm1Qcm9wcy5vdGhlclByb3BzLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmllbGRFcnJvcnM6IChpbml0aWFsU3VibWl0KSA/IGZpZWxkRXJyb3JzIDoge30sXG4gICAgICAgIGZvcm1Jc1N1Ym1pdHRpbmc6IGlzRm9ybVN1Ym1pdHRpbmcoKSxcbiAgICAgICAgZ2V0Rm9ybVZhbHVlcyxcbiAgICAgICAgZ2V0Rm9ybVByb3BzLFxuICAgICAgICBnZXRGaWVsZFByb3BzLFxuICAgICAgICBzdWJtaXRCdXR0b25Qcm9wcyxcbiAgICAgICAgdXBkYXRlRmllbGRQcm9wcyxcbiAgICB9O1xuXG59XG4iXX0=