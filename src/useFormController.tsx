import * as React from 'react';
import * as lodash from 'lodash';

const {useEffect, useState} = React;
const {
    endsWith,
    forEach,
    get,
    isArray,
    isEmpty,
    isFunction,
    mapValues,
    omit,
    set,
    transform,
} = lodash;

interface useFormControllerArgs {
    fieldProps: {
        /**
            The key used here will be the name attribute of the field. It should be a unique
            name. This key be the default value for the formValuePath if that key isn't set.
            It is important to NOT set a name attribue in the element's/component's props and
            override this key; otherwise, the value will not be set properly for the form values
            or the state value of this field. If you are trying to pass an array of values for
            checkboxes, use a unique name here for each checkbox such as myCheckbox1, myCheckbox2,
            etc. and set the formValuePath to the same key you want it to use with an angle bracket,
            as in [] at the end of the name. See formValuePath on how to do that.
        */
        [key: string]: {
            /** The inital checked value for a checkbox field which can be changed by the parent */
            checked?: boolean | undefined
            /** If true, this fieldValue will not be submitted with the form values */
            doNotSubmit?: boolean
            /**
                Defaults to the key of this object if not set.
                This is param for the lodash get/set functions to be able to set the form values as you need.
                This makes it possible to build an object in the form values as desired such as if you
                set the formValuePath to my.field.path.field1, it would submit the value in an object
                like this...
                {
                    my: {
                        field: {
                            path: {field1: 'value of field1'}
                        }
                    }
                }
                If you add angle brackets at the end as in [], this will add/remove values to an array which
                is handy for a set of checkboxes you'd like to send an array of values for each checkbox
                that is checked. For instance, if used set formValuePath to myCheckbox[] on multiple
                checkboxes in the form, it would submit a value like this...
                {
                    myCheckbox: ['value of first checkbox checked', 'value of second checkbox checked']
                }
                The empty angle brackets, [], can only go at the end of the formValuePath. Anything else
                within the path must have an index number like my.field[0].path[].
            */
            formValuePath?: string | string[]
            /** Callback function to run at the end of the onChange event of the element */
            onAfterChange?: Function
            /** Callback function to run at the beginning of the onChange event of the element */
            onBeforeChange?: Function
            /**
                Other props to be added to the field props that will not be used by this hook.
                These can also be added to the component/element directly; however, it is available
                here as an optoin to keep all the props in one place.
            */
            otherProps?: object
            /**
                The type of input such as checked, radio, text, etc. This only needs to be set
                if it's something other than text.
            */
            type?: string
            /**
                A function or array of functions to run against the value of the field
                If the value passes it should return undefined. If not, it should return
                the desired field error such as "This field is required". The callback arguments
                are the current value of the field for the first argument and the field values of
                the other fields in the second argument in case validation needs to happen based
                on the value of another field.
            */
            validation?: (fieldValue: any, fieldValues: Object) => string | undefined | [(fieldValue: any, fieldValues: Object) => string | undefined]
            /** The inital value for the field which can be changed by the parent */
            value?: number | string | undefined
        }
    }
    formProps: {
        /**
            The desired form value to submit when the field is empty or checkbox isn't checked.
            This is typically the value you want to see on the backend. If this isn't set or
            the value is set to undefined, the key of the field will not be submitted with the
            form values object.
        */
        nullValue?: null | string | undefined
        /**
            Callback function to run at the beginning of the onSubmit event of the form element.
            This will execute before anything including the validation runs and will perform
            any time the onSubmit event is dispatched.
        */
        onBeforeSubmit?: Function
        /**
            Callback function to execute when all validation passes for the form and it's
            safe to submit. This is the funciton that should be used for the call to the
            backend or desired actions after everything passes from the form. If this function
            does not return a Promise, this custom hook will add one.
        */
        onExecuteSubmit?: Function
        /**
            Callback function to execute after the Promise from onExecuteSubmit has been
            resolved. This is the function to use for succesful submits such as closing
            a modal, navigating to a new page or showing a success message.
        */
        onAfterSubmit?: Function
        /**
            Other props to be added to the form props that will not be used by this hook.
            These can also be added to the component/element directly; however, it is available
            here as an optoin to keep all the props in one place..
        */
        otherProps?: Object
    }
}

interface useFormControllerResponse {
    fieldErrors: {
        [key: string]: string
    }
    getFormProps: () => ({
        [key: string]: {
            onSubmit: Function
        }
    })
    getFieldProps: () => ({
        checked?: boolean
        disabled?: boolean
        name: string
        ref: Function
        value: string | number | null
    })
    submitButtonProps: {
        disabled: boolean | undefined;
    }
}

interface fieldState {
    [key: string]: {
        checked?: boolean | undefined
        ref?: any // Probably should find the right type for this
        type?: string
        value?: string | number | undefined
    }
}

interface fieldErrors {
    [key: string]: string
}

export default function useFormController<useFormControllerResponse>({
    fieldProps,
    formProps,
}: useFormControllerArgs) {
    const [fieldState, setFieldState] = useState<fieldState>(
        mapValues(fieldProps, ({checked, type, value}) => {
            return {checked, type, value}
        })
    );
    const [fieldErrors, setFieldErrors] = useState<fieldErrors>({});
    const [formIsSubmitting, setFormIsSubmitting] = useState<boolean>(false);
    const [initialSubmit, setInitialSubmit] = useState<boolean>(false);

    useEffect(() => {
        forEach(fieldProps, (fieldObj, fieldName) => {

        });
    },[fieldProps])

    function setField(name: string, payload: {
        checked?: boolean | undefined
        ref?: any // Probably should find the right type for this
        type?: string
        value?: string | number | undefined
    }) {
        setFieldState({
            ...fieldState,
            [name]: {
                ...fieldState[name],
                ...payload,
            }
        })
    }

    function getFormValues(): {[key: string]: any} {
        let formValues = {};

        forEach(fieldState, ({checked, ref, value}, fieldName) => {
            if (!fieldProps[fieldName].doNotSubmit) {
                const formValue = (
                    checked ||
                    (ref.type !== 'checkbox' && ref.type !== 'radio')
                )
                    ? value :
                    formProps.nullValue;
                const formValuePath = fieldProps[fieldName].formValuePath;

                if (formValue !== undefined) {
                    if (formValuePath) {
                        if (!isArray(formValuePath) && endsWith(formValuePath, '[]')) {
                            const getPath = formValuePath.replace('[]', '');
                            const currentFormValue =  get(formValues, getPath);

                            (!isArray(currentFormValue))
                                ? set(formValues, getPath, [formValue])
                                : set(formValues, getPath, [...currentFormValue, formValue]);
                        }

                    } else {
                        set(formValues, fieldName, formValue);
                    }
                }
            }
        });

        return formValues;
    }

    function initField<HtmlInputElement>(inputRef: any) {
        if (inputRef !== null) {
            // Some componet libraries return inputElement as the actual ref
            // May need to add more if other libraries are used
            const inputElement = get(inputRef, 'inputElement') || inputRef;
            if (inputElement) {
                const {name} = inputElement;

                if (!name) {
                    // eslint-disable-next-line
                    console.error(
                        'useFormSubmission: A name attribute must be specified for this element',
                        {inputElement}
                    );
                } else if (!get(fieldState, [name, 'ref'])) {
                    setField(name, {ref: inputElement});
                }
            } else {
                // eslint-disable-next-line
                console.error(
                    'useFormSubmission: Could not set a ref for this form field',
                    {inputRef}
                );
            }
        }
    }

    function validateField(name: string, value: string | number | [string | number] | undefined) {
        const validateFunctions = fieldProps[name].validation;
        let fieldError: string | undefined;

        if (validateFunctions) {
            const fieldValidation = (isArray(validateFunctions)) ? validateFunctions : [validateFunctions];

            // Using the lodash transform to run until it finds the first error
            // This way it only shows one validation error at a time until
            // they are all gone if there are multiples.
            transform(fieldValidation, (returnFieldErrors, validator) => {
                if (!isFunction(validator)) {
                    // eslint-disable-next-line
                    console.error('useFormController: Field validators must be functions', {validator})
                } else {
                    // TODO: Probably need to memoize getFormValues or something
                    fieldError = validator(value, getFormValues);
                }


                return !fieldError;
            });

            if (fieldError) {
                setFieldErrors({
                    ...fieldErrors,
                    [name]: fieldError,
                })
            } else {
                setFieldErrors(omit(fieldErrors, name))
            }
        }

        return fieldError;
    }

    function getFieldsToValidate(): string[] {
        let fieldsToValidate:string[] = [];

        forEach(fieldProps, (fieldProp, fieldName) => {
            if (fieldProp.validation) {
                fieldsToValidate.push(fieldName)
            }
        })

        return fieldsToValidate;
    }

    function validateAllFields():boolean {
        let fieldsHaveError = false;

        transform(getFieldsToValidate(), (fieldErrors: Object, fieldName: string) => {
            const fieldError = validateField(
                fieldName,
                fieldState[fieldName].ref.value,
            );

            fieldsHaveError = !!fieldError
            return !fieldError;
        });

        return fieldsHaveError;
    }

    function handleFieldChange(event: React.FormEvent<HTMLInputElement>): void {
        const {
            checked,
            name,
            type,
            value
        } = event.currentTarget;

        setField(name, {
            checked,
            type,
            value,
        });
        validateField(name, value);
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let fieldsHaveError;
        const onBeforeSubmit = get(formProps, 'onBeforeSubmit', () => null);

        onBeforeSubmit();
        if (!initialSubmit) {
            // Validating all fields for autofill values if there hasn't been an initial submit
            fieldsHaveError = validateAllFields();
        }

        if (!fieldsHaveError) {
            executeForm();
        }

        setInitialSubmit(true);
    }

    async function executeForm() {
        const onExecuteSubmit = get(formProps, 'onExecuteSubmit', (formValues: object) => null);
        const onAfterSubmit = get(formProps, 'onAfterSubmit', () => null);
        const formValues = getFormValues();

        setFormIsSubmitting(true);
        await (onExecuteSubmit instanceof Promise)
            ? onExecuteSubmit(formValues)
            : Promise.resolve(onExecuteSubmit(formValues));

        setFormIsSubmitting(false);
        onAfterSubmit();
    }

    const submitButtonProps = {
        disabled: !!(
            formIsSubmitting ||
            (initialSubmit && !isEmpty(fieldErrors))
        )
    }

    function getFieldProps(name: string) {
        const {checked, value} = get(fieldState, [name], {}) as any;

        return {
            checked,
            disabled: !!formIsSubmitting,
            name,
            onChange: handleFieldChange,
            ref: initField,
            value,
        }
    }

    function getFormProps() {
        return {
            onSubmit: handleFormSubmit,
            ...formProps.otherProps,
        }
    }

    return {
        fieldErrors: (initialSubmit) ? fieldErrors : {},
        getFormValues,
        getFormProps,
        getFieldProps,
        submitButtonProps,
    };

}