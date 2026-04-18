import * as React from "react";
import {
  HtmlButtonElement,
  HtmlFormHelperTextElement,
  HtmlFormLabelElement,
  HtmlInputElement,
  HtmlTextareaElement,
  useHtmlButtonAdapter,
  useHtmlFormHelperTextAdapter,
  useHtmlFormLabelAdapter,
  useHtmlInputAdapter,
  useHtmlTextareaAdapter,
} from "@piplup/rhf-adapters/html";
import {
  MuiAutocompleteElement,
  MuiButtonElement,
  MuiCheckboxElement,
  MuiFabElement,
  MuiFilledInputElement,
  MuiFormHelperTextElement,
  MuiFormLabelElement,
  MuiIconButtonElement,
  MuiInputBaseElement,
  MuiInputElement,
  MuiInputLabelElement,
  MuiOutlinedInputElement,
  MuiRadioElement,
  MuiRadioGroupElement,
  MuiRatingElement,
  MuiSelectElement,
  MuiSliderElement,
  MuiSwitchElement,
  MuiTextFieldElement,
  useMuiAutocompleteAdapter,
  useMuiButtonAdapter,
  useMuiCheckboxAdapter,
  useMuiFabAdapter,
  useMuiFilledInputAdapter,
  useMuiFormHelperTextAdapter,
  useMuiFormLabelAdapter,
  useMuiIconButtonAdapter,
  useMuiInputAdapterProps,
  useMuiInputBaseAdapter,
  useMuiInputLabelAdapter,
  useMuiOutlinedInputAdapter,
  useMuiRadioAdapter,
  useMuiRadioGroupAdapter,
  useMuiRatingAdapter,
  useMuiSelectAdapter,
  useMuiSliderAdapter,
  useMuiSwitchAdapter,
  useMuiTextFieldAdapter,
} from "@piplup/rhf-adapters/mui-material";
import {
  MuiXDateCalendarElement,
  MuiXDateFieldElement,
  MuiXDatePickerElement,
  MuiXDateTimePickerElement,
  MuiXDesktopDatePickerElement,
  MuiXDesktopDateTimePickerElement,
  MuiXDesktopTimePickerElement,
  MuiXDigitalClockElement,
  MuiXMobileDatePickerElement,
  MuiXMobileDateTimePickerElement,
  MuiXMobileTimePickerElement,
  MuiXMonthCalendarElement,
  MuiXMultiSectionDigitalClockElement,
  MuiXStaticDatePickerElement,
  MuiXStaticDateTimePickerElement,
  MuiXStaticTimePickerElement,
  MuiXTimeClockElement,
  MuiXTimeFieldElement,
  MuiXTimePickerElement,
  MuiXYearCalendarElement,
  useMuiXDateCalendarAdapter,
  useMuiXDateFieldAdapter,
  useMuiXDatePickerAdapter,
  useMuiXDateTimePickerAdapter,
  useMuiXDesktopDatePickerAdapter,
  useMuiXDesktopDateTimePickerAdapter,
  useMuiXDesktopTimePickerAdapter,
  useMuiXDigitalClockAdapter,
  useMuiXMobileDatePickerAdapter,
  useMuiXMobileDateTimePickerAdapter,
  useMuiXMobileTimePickerAdapter,
  useMuiXMonthCalendarAdapter,
  useMuiXMultiSectionDigitalClockAdapter,
  useMuiXStaticDatePickerAdapter,
  useMuiXStaticDateTimePickerAdapter,
  useMuiXStaticTimePickerAdapter,
  useMuiXTimeClockAdapter,
  useMuiXTimeFieldAdapter,
  useMuiXTimePickerAdapter,
  useMuiXYearCalendarAdapter,
} from "@piplup/rhf-adapters/mui-x-date-pickers";
import {
  MuiChipsInputElement,
  useMuiChipsInputAdapter,
} from "@piplup/rhf-adapters/mui-chips-input";
import {
  MuiColorInputElement,
  useMuiColorInputAdapter,
} from "@piplup/rhf-adapters/mui-color-input";
import {
  MuiFileInputElement,
  useMuiFileInputAdapter,
} from "@piplup/rhf-adapters/mui-file-input";
import {
  MuiOtpInputElement,
  useMuiOtpInputAdapter,
} from "@piplup/rhf-adapters/mui-one-time-password-input";
import {
  MuiTelInputElement,
  useMuiTelInputAdapter,
} from "@piplup/rhf-adapters/mui-tel-input";
import {
  NumberFormatBaseElement,
  NumericFormatElement,
  PatternFormatElement,
  useNumberFormatBaseAdapter,
  useNumericFormatAdapter,
  usePatternFormatAdapter,
} from "@piplup/rhf-adapters/react-number-format";
import {
  FormContainer,
  FormErrorProvider,
  useControllerAdapter,
  useFieldState,
  useFieldStateAdapter,
  useFormReset,
  useFormSetFocus,
  useFormStateAdapter,
} from "@piplup/rhf-core";
import { type ReleaseStatusOptions, CacheBuster } from '@piplup/cache-buster'
import { AclProvider, HasAccess, useAcl } from '@piplup/react-acl'
import { useEventCallback, useEventListener, useForkRef, useIsomorphicEffect, useLocalStorage } from '@piplup/utils'

export type FormContainerProps = React.ComponentPropsWithoutRef<
  typeof FormContainer
>;

export type FormErrorProviderProps = React.ComponentPropsWithoutRef<
  typeof FormErrorProvider
>;

export type UseFormResetProps = Parameters<typeof useFormReset>[0];

export type UseFormResetReturnType = ReturnType<typeof useFormReset>;

export type UseControllerAdapterProps = Parameters<
  typeof useControllerAdapter
>[0];

export type UseControllerAdapterReturnType = ReturnType<typeof useControllerAdapter>;

export type UseFieldStateAdapterProps = Parameters<
  typeof useFieldStateAdapter
>[0];

export type UseFieldStateAdapterReturnType = ReturnType<typeof useFieldStateAdapter>;

export type UseFieldStateProps = Parameters<typeof useFieldState>[0];

export type UseFieldStateReturnType = ReturnType<typeof useFieldState>;

export type UseFormSetFocusProps = Parameters<typeof useFormSetFocus>[0];

export type UseFormSetFocusReturnType = ReturnType<typeof useFormSetFocus>;

export type UseFormStateAdapterProps = Parameters<
  typeof useFormStateAdapter
>[0];

export type UseFormStateAdapterReturnType = ReturnType<typeof useFormStateAdapter>;

export type HtmlInputElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof HtmlInputElement>,
  | "checked"
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "errorParser"
  | "indeterminate"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
  | "type"
  | "value"
>;

export type HtmlTextareaElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof HtmlTextareaElement>,
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "errorParser"
  | "helperText"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
>;

export type HtmlButtonElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof HtmlButtonElement>,
  | "classes"
  | "className"
  | "control"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "errorParser"
  | "exact"
  | "name"
  | "onClick"
  | "style"
  | "type"
>;

export type UseHtmlButtonAdapterProps = Parameters<
  typeof useHtmlButtonAdapter
>[0];

export type UseHtmlButtonAdapterReturnType = ReturnType<
  typeof useHtmlButtonAdapter
>;

export type HtmlFormHelperTextElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof HtmlFormHelperTextElement>,
  | "children"
  | "classes"
  | "className"
  | "control"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "errorParser"
  | "name"
  | "renderOnError"
  | "style"
>;

export type UseHtmlFormHelperTextAdapterProps = Parameters<
  typeof useHtmlFormHelperTextAdapter
>[0];

export type UseHtmlFormHelperTextAdapterReturnType = ReturnType<
  typeof useHtmlFormHelperTextAdapter
>;

export type HtmlFormLabelElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof HtmlFormLabelElement>,
  | "classes"
  | "className"
  | "control"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "errorParser"
  | "name"
  | "style"
>;

export type UseHtmlFormLabelAdapterProps = Parameters<
  typeof useHtmlFormLabelAdapter
>[0];

export type UseHtmlFormLabelAdapterReturnType = ReturnType<
  typeof useHtmlFormLabelAdapter
>;

export type UseHtmlInputAdapterProps = Parameters<
  typeof useHtmlInputAdapter
>[0];

export type UseHtmlInputAdapterReturnType = ReturnType<
  typeof useHtmlInputAdapter
>;

export type UseHtmlTextareaAdapterProps = Parameters<
  typeof useHtmlTextareaAdapter
>[0];

export type UseHtmlTextareaAdapterReturnType = ReturnType<
  typeof useHtmlTextareaAdapter
>;

export type MuiAutocompleteElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiAutocompleteElement>,
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "errorParser"
  | "helperText"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "multiple"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "renderInput"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
>;

export type MuiButtonElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiButtonElement>,
  | "classes"
  | "className"
  | "control"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "exact"
  | "name"
  | "onClick"
  | "style"
  | "type"
>;

export type MuiCheckboxElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiCheckboxElement>,
  | "checked"
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "indeterminate"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
  | "value"
>;

export type MuiFabElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiFabElement>,
  | "classes"
  | "className"
  | "control"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "errorParser"
  | "exact"
  | "name"
  | "onClick"
  | "style"
  | "type"
>;

export type MuiFilledInputElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiFilledInputElement>,
  | "checked"
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "indeterminate"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
  | "type"
  | "value"
>;

export type MuiFormHelperTextElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiFormHelperTextElement>,
  | "children"
  | "classes"
  | "className"
  | "control"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "errorParser"
  | "name"
  | "renderOnError"
  | "style"
>;

export type MuiFormLabelElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiFormLabelElement>,
  | "classes"
  | "className"
  | "control"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "name"
  | "style"
>;

export type MuiIconButtonElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiIconButtonElement>,
  | "classes"
  | "className"
  | "control"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "exact"
  | "name"
  | "onClick"
  | "style"
  | "type"
>;

export type MuiInputElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiInputElement>,
  | "checked"
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "indeterminate"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
  | "type"
  | "value"
>;

export type MuiInputBaseElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiInputBaseElement>,
  | "checked"
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "indeterminate"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
  | "type"
  | "value"
>;

export type MuiInputLabelElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiInputLabelElement>,
  | "classes"
  | "className"
  | "control"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "name"
  | "style"
>;

export type MuiOutlinedInputElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiOutlinedInputElement>,
  | "checked"
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "indeterminate"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
  | "type"
  | "value"
>;

export type MuiRadioElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiRadioElement>,
  | "checked"
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "indeterminate"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
  | "value"
>;

export type MuiRadioGroupElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiRadioGroupElement>,
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
>;

export type MuiRatingElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiRatingElement>,
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
>;

export type MuiSelectElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiSelectElement>,
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "multiple"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
>;

export type MuiSliderElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiSliderElement>,
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
>;

export type MuiSwitchElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiSwitchElement>,
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
>;

export type MuiTextFieldElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiTextFieldElement>,
  | "checked"
  | "classes"
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "errorParser"
  | "helperText"
  | "indeterminate"
  | "inputRef"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "title"
  | "transform"
  | "type"
>;

export type UseMuiAutocompleteAdapterProps = Parameters<
  typeof useMuiAutocompleteAdapter
>[0];

export type AclProviderProps = React.ComponentProps<typeof AclProvider>;

export type HasAccessProps = React.ComponentProps<typeof HasAccess>;

export type UseAclReturnType = ReturnType<typeof useAcl>;

export type UseMuiAutocompleteAdapterReturnType = ReturnType<
  typeof useMuiAutocompleteAdapter
>;

export type UseMuiButtonAdapterProps = Parameters<
  typeof useMuiButtonAdapter
>[0];

export type UseMuiButtonAdapterReturnType = ReturnType<
  typeof useMuiButtonAdapter
>;

export type UseMuiCheckboxAdapterProps = Parameters<
  typeof useMuiCheckboxAdapter
>[0];

export type UseMuiCheckboxAdapterReturnType = ReturnType<
  typeof useMuiCheckboxAdapter
>;

export type UseMuiFabAdapterProps = Parameters<typeof useMuiFabAdapter>[0];

export type UseMuiFabAdapterReturnType = ReturnType<typeof useMuiFabAdapter>;

export type UseMuiFilledInputAdapterProps = Parameters<
  typeof useMuiFilledInputAdapter
>[0];

export type UseMuiFilledInputAdapterReturnType = ReturnType<
  typeof useMuiFilledInputAdapter
>;

export type UseMuiFormHelperTextAdapterProps = Parameters<
  typeof useMuiFormHelperTextAdapter
>[0];

export type UseMuiFormHelperTextAdapterReturnType = ReturnType<
  typeof useMuiFormHelperTextAdapter
>;

export type UseMuiFormLabelAdapterProps = Parameters<
  typeof useMuiFormLabelAdapter
>[0];

export type UseMuiFormLabelAdapterReturnType = ReturnType<
  typeof useMuiFormLabelAdapter
>;

export type UseMuiIconButtonAdapterProps = Parameters<
  typeof useMuiIconButtonAdapter
>[0];

export type UseMuiIconButtonAdapterReturnType = ReturnType<
  typeof useMuiIconButtonAdapter
>;

export type UseMuiInputAdapterProps = Parameters<
  typeof useMuiInputAdapterProps
>[0];

export type UseMuiInputAdapterReturnType = ReturnType<
  typeof useMuiInputAdapterProps
>;

export type UseMuiInputBaseAdapterProps = Parameters<
  typeof useMuiInputBaseAdapter
>[0];

export type UseMuiInputBaseAdapterReturnType = ReturnType<
  typeof useMuiInputBaseAdapter
>;

export type UseMuiInputLabelAdapterProps = Parameters<
  typeof useMuiInputLabelAdapter
>[0];

export type UseMuiInputLabelAdapterReturnType = ReturnType<
  typeof useMuiInputLabelAdapter
>;

export type UseMuiOutlinedInputAdapterProps = Parameters<
  typeof useMuiOutlinedInputAdapter
>[0];

export type UseMuiOutlinedInputAdapterReturnType = ReturnType<
  typeof useMuiOutlinedInputAdapter
>;

export type UseMuiRadioAdapterProps = Parameters<typeof useMuiRadioAdapter>[0];

export type UseMuiRadioAdapterReturnType = ReturnType<
  typeof useMuiRadioAdapter
>;

export type UseMuiRadioGroupAdapterProps = Parameters<
  typeof useMuiRadioGroupAdapter
>[0];

export type UseMuiRadioGroupAdapterReturnType = ReturnType<
  typeof useMuiRadioGroupAdapter
>;

export type UseMuiRatingAdapterProps = Parameters<
  typeof useMuiRatingAdapter
>[0];

export type UseMuiRatingAdapterReturnType = ReturnType<
  typeof useMuiRatingAdapter
>;

export type UseMuiSelectAdapterProps = Parameters<
  typeof useMuiSelectAdapter
>[0];

export type UseMuiSelectAdapterReturnType = ReturnType<
  typeof useMuiSelectAdapter
>;

export type UseMuiSliderAdapterProps = Parameters<
  typeof useMuiSliderAdapter
>[0];

export type UseMuiSliderAdapterReturnType = ReturnType<
  typeof useMuiSliderAdapter
>;

export type UseMuiSwitchAdapterProps = Parameters<
  typeof useMuiSwitchAdapter
>[0];

export type UseMuiSwitchAdapterReturnType = ReturnType<
  typeof useMuiSwitchAdapter
>;

export type UseMuiTextFieldAdapterProps = Parameters<
  typeof useMuiTextFieldAdapter
>[0];

export type UseMuiTextFieldAdapterReturnType = ReturnType<
  typeof useMuiTextFieldAdapter
>;

export type MuiXDateCalendarElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXDateCalendarElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "maxDate"
  | "messages"
  | "minDate"
  | "name"
  | "onBlur"
  | "onChange"
  | "required"
  | "rules"
  | "shouldDisableDate"
  | "shouldDisableMonth"
  | "shouldDisableYear"
  | "shouldUnregister"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXDateFieldElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXDateFieldElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "helperText"
  | "inputRef"
  | "maxDate"
  | "messages"
  | "minDate"
  | "name"
  | "onBlur"
  | "onChange"
  | "required"
  | "rules"
  | "shouldDisableDate"
  | "shouldDisableMonth"
  | "shouldDisableYear"
  | "shouldUnregister"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXDatePickerElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXDatePickerElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "inputRef"
  | "maxDate"
  | "messages"
  | "minDate"
  | "name"
  | "onChange"
  | "onClose"
  | "required"
  | "rules"
  | "shouldDisableDate"
  | "shouldDisableMonth"
  | "shouldDisableYear"
  | "shouldUnregister"
  | "slotProps"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXDateTimePickerElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXDateTimePickerElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableIgnoringDatePartForTimeValidation"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "inputRef"
  | "maxDate"
  | "maxTime"
  | "messages"
  | "minDate"
  | "minTime"
  | "minutesStep"
  | "name"
  | "onChange"
  | "onClose"
  | "required"
  | "rules"
  | "shouldDisableDate"
  | "shouldDisableMonth"
  | "shouldDisableTime"
  | "shouldDisableYear"
  | "shouldUnregister"
  | "slotProps"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXDesktopDatePickerElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXDesktopDatePickerElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "inputRef"
  | "maxDate"
  | "messages"
  | "minDate"
  | "name"
  | "onChange"
  | "onClose"
  | "required"
  | "rules"
  | "shouldDisableDate"
  | "shouldDisableMonth"
  | "shouldDisableYear"
  | "shouldUnregister"
  | "slotProps"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXDesktopDateTimePickerElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXDesktopDateTimePickerElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableIgnoringDatePartForTimeValidation"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "inputRef"
  | "maxDate"
  | "maxTime"
  | "messages"
  | "minDate"
  | "minTime"
  | "minutesStep"
  | "name"
  | "onChange"
  | "onClose"
  | "required"
  | "rules"
  | "shouldDisableDate"
  | "shouldDisableMonth"
  | "shouldDisableTime"
  | "shouldDisableYear"
  | "shouldUnregister"
  | "slotProps"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXDesktopTimePickerElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXDesktopTimePickerElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableIgnoringDatePartForTimeValidation"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "inputRef"
  | "maxTime"
  | "messages"
  | "minTime"
  | "minutesStep"
  | "name"
  | "onChange"
  | "onClose"
  | "required"
  | "rules"
  | "shouldDisableTime"
  | "shouldUnregister"
  | "slotProps"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXDigitalClockElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXDigitalClockElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableIgnoringDatePartForTimeValidation"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "maxTime"
  | "messages"
  | "minTime"
  | "minutesStep"
  | "name"
  | "onChange"
  | "required"
  | "rules"
  | "shouldDisableTime"
  | "shouldUnregister"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXMobileDatePickerElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXMobileDatePickerElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "inputRef"
  | "maxDate"
  | "messages"
  | "minDate"
  | "name"
  | "onChange"
  | "onClose"
  | "required"
  | "rules"
  | "shouldDisableDate"
  | "shouldDisableMonth"
  | "shouldDisableYear"
  | "shouldUnregister"
  | "slotProps"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXMobileDateTimePickerElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXMobileDateTimePickerElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableIgnoringDatePartForTimeValidation"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "inputRef"
  | "maxDate"
  | "maxTime"
  | "messages"
  | "minDate"
  | "minTime"
  | "minutesStep"
  | "name"
  | "onChange"
  | "onClose"
  | "required"
  | "rules"
  | "shouldDisableDate"
  | "shouldDisableMonth"
  | "shouldDisableTime"
  | "shouldDisableYear"
  | "shouldUnregister"
  | "slotProps"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXMobileTimePickerElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXMobileTimePickerElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableIgnoringDatePartForTimeValidation"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "inputRef"
  | "maxTime"
  | "messages"
  | "minTime"
  | "minutesStep"
  | "name"
  | "onChange"
  | "onClose"
  | "required"
  | "rules"
  | "shouldDisableTime"
  | "shouldUnregister"
  | "slotProps"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXMonthCalendarElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXMonthCalendarElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "maxDate"
  | "messages"
  | "minDate"
  | "name"
  | "onBlur"
  | "onChange"
  | "required"
  | "rules"
  | "shouldDisableMonth"
  | "shouldUnregister"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXMultiSectionDigitalClockElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXMultiSectionDigitalClockElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableIgnoringDatePartForTimeValidation"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "maxTime"
  | "messages"
  | "minTime"
  | "minutesStep"
  | "name"
  | "onChange"
  | "required"
  | "rules"
  | "shouldDisableTime"
  | "shouldUnregister"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXStaticDatePickerElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXStaticDatePickerElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "maxDate"
  | "messages"
  | "minDate"
  | "name"
  | "onChange"
  | "required"
  | "rules"
  | "shouldDisableDate"
  | "shouldDisableMonth"
  | "shouldDisableYear"
  | "shouldUnregister"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXStaticDateTimePickerElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXStaticDateTimePickerElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableIgnoringDatePartForTimeValidation"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "maxDate"
  | "maxTime"
  | "messages"
  | "minDate"
  | "minTime"
  | "minutesStep"
  | "name"
  | "onChange"
  | "required"
  | "rules"
  | "shouldDisableDate"
  | "shouldDisableMonth"
  | "shouldDisableTime"
  | "shouldDisableYear"
  | "shouldUnregister"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXStaticTimePickerElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXStaticTimePickerElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableIgnoringDatePartForTimeValidation"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "maxTime"
  | "messages"
  | "minTime"
  | "minutesStep"
  | "name"
  | "onChange"
  | "required"
  | "rules"
  | "shouldDisableTime"
  | "shouldUnregister"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXTimeClockElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXTimeClockElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableIgnoringDatePartForTimeValidation"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "maxTime"
  | "messages"
  | "minTime"
  | "minutesStep"
  | "name"
  | "onChange"
  | "required"
  | "rules"
  | "shouldDisableTime"
  | "shouldUnregister"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXTimeFieldElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXTimeFieldElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableIgnoringDatePartForTimeValidation"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "helperText"
  | "inputRef"
  | "maxTime"
  | "messages"
  | "minTime"
  | "minutesStep"
  | "name"
  | "onBlur"
  | "onChange"
  | "required"
  | "rules"
  | "shouldDisableTime"
  | "shouldUnregister"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXTimePickerElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXTimePickerElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableIgnoringDatePartForTimeValidation"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "inputRef"
  | "maxTime"
  | "messages"
  | "minTime"
  | "minutesStep"
  | "name"
  | "onChange"
  | "onClose"
  | "required"
  | "rules"
  | "shouldDisableTime"
  | "shouldUnregister"
  | "slotProps"
  | "style"
  | "timezone"
  | "transform"
>;

export type MuiXYearCalendarElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof MuiXYearCalendarElement>,
  | "className"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableFuture"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "disablePast"
  | "error"
  | "errorParser"
  | "maxDate"
  | "messages"
  | "minDate"
  | "name"
  | "onBlur"
  | "onChange"
  | "required"
  | "rules"
  | "shouldDisableYear"
  | "shouldUnregister"
  | "style"
  | "timezone"
  | "transform"
>;

export type UseMuiXDateCalendarAdapterProps = Parameters<
  typeof useMuiXDateCalendarAdapter
>[0];

export type UseMuiXDateCalendarAdapterReturnType = ReturnType<
  typeof useMuiXDateCalendarAdapter
>;

export type UseMuiXDateFieldAdapterProps = Parameters<
  typeof useMuiXDateFieldAdapter
>[0];

export type UseMuiXDateFieldAdapterReturnType = ReturnType<
  typeof useMuiXDateFieldAdapter
>;

export type UseMuiXDatePickerAdapterProps = Parameters<
  typeof useMuiXDatePickerAdapter
>[0];

export type UseMuiXDatePickerAdapterReturnType = ReturnType<
  typeof useMuiXDatePickerAdapter
>;

export type UseMuiXDateTimePickerAdapterProps = Parameters<
  typeof useMuiXDateTimePickerAdapter
>[0];

export type UseMuiXDateTimePickerAdapterReturnType = ReturnType<
  typeof useMuiXDateTimePickerAdapter
>;

export type UseMuiXDesktopDatePickerAdapterProps = Parameters<
  typeof useMuiXDesktopDatePickerAdapter
>[0];

export type UseMuiXDesktopDatePickerAdapterReturnType = ReturnType<
  typeof useMuiXDesktopDatePickerAdapter
>;

export type UseMuiXDesktopDateTimePickerAdapterProps = Parameters<
  typeof useMuiXDesktopDateTimePickerAdapter
>[0];

export type UseMuiXDesktopDateTimePickerAdapterReturnType = ReturnType<
  typeof useMuiXDesktopDateTimePickerAdapter
>;

export type UseMuiXDesktopTimePickerAdapterProps = Parameters<
  typeof useMuiXDesktopTimePickerAdapter
>[0];

export type UseMuiXDesktopTimePickerAdapterReturnType = ReturnType<
  typeof useMuiXDesktopTimePickerAdapter
>;

export type UseMuiXDigitalClockAdapterProps = Parameters<
  typeof useMuiXDigitalClockAdapter
>[0];

export type UseMuiXDigitalClockAdapterReturnType = ReturnType<
  typeof useMuiXDigitalClockAdapter
>;

export type UseMuiXMobileDatePickerAdapterProps = Parameters<
  typeof useMuiXMobileDatePickerAdapter
>[0];

export type UseMuiXMobileDatePickerAdapterReturnType = ReturnType<
  typeof useMuiXMobileDatePickerAdapter
>;

export type UseMuiXMobileDateTimePickerAdapterProps = Parameters<
  typeof useMuiXMobileDateTimePickerAdapter
>[0];

export type UseMuiXMobileDateTimePickerAdapterReturnType = ReturnType<
  typeof useMuiXMobileDateTimePickerAdapter
>;

export type UseMuiXMobileTimePickerAdapterProps = Parameters<
  typeof useMuiXMobileTimePickerAdapter
>[0];

export type UseMuiXMobileTimePickerAdapterReturnType = ReturnType<
  typeof useMuiXMobileTimePickerAdapter
>;

export type UseMuiXMonthCalendarAdapterProps = Parameters<
  typeof useMuiXMonthCalendarAdapter
>[0];

export type UseMuiXMonthCalendarAdapterReturnType = ReturnType<
  typeof useMuiXMonthCalendarAdapter
>;

export type UseMuiXMultiSectionDigitalClockAdapterProps = Parameters<
  typeof useMuiXMultiSectionDigitalClockAdapter
>[0];

export type UseMuiXMultiSectionDigitalClockAdapterReturnType = ReturnType<
  typeof useMuiXMultiSectionDigitalClockAdapter
>;

export type UseMuiXStaticDatePickerAdapterProps = Parameters<
  typeof useMuiXStaticDatePickerAdapter
>[0];

export type UseMuiXStaticDatePickerAdapterReturnType = ReturnType<
  typeof useMuiXStaticDatePickerAdapter
>;

export type UseMuiXStaticDateTimePickerAdapterProps = Parameters<
  typeof useMuiXStaticDateTimePickerAdapter
>[0];

export type UseMuiXStaticDateTimePickerAdapterReturnType = ReturnType<
  typeof useMuiXStaticDateTimePickerAdapter
>;

export type UseMuiXStaticTimePickerAdapterProps = Parameters<
  typeof useMuiXStaticTimePickerAdapter
>[0];

export type UseMuiXStaticTimePickerAdapterReturnType = ReturnType<
  typeof useMuiXStaticTimePickerAdapter
>;

export type UseMuiXTimeClockAdapterProps = Parameters<
  typeof useMuiXTimeClockAdapter
>[0];

export type UseMuiXTimeClockAdapterReturnType = ReturnType<
  typeof useMuiXTimeClockAdapter
>;

export type UseMuiXTimeFieldAdapterProps = Parameters<
  typeof useMuiXTimeFieldAdapter
>[0];

export type UseMuiXTimeFieldAdapterReturnType = ReturnType<
  typeof useMuiXTimeFieldAdapter
>;

export type UseMuiXTimePickerAdapterProps = Parameters<
  typeof useMuiXTimePickerAdapter
>[0];

export type UseMuiXTimePickerAdapterReturnType = ReturnType<
  typeof useMuiXTimePickerAdapter
>;

export type UseMuiXYearCalendarAdapterProps = Parameters<
  typeof useMuiXYearCalendarAdapter
>[0];

export type UseMuiXYearCalendarAdapterReturnType = ReturnType<
  typeof useMuiXYearCalendarAdapter
>;

export type MuiChipsInputElementProps = React.ComponentPropsWithoutRef<
  typeof MuiChipsInputElement
>;
export type UseMuiChipsInputAdapterProps = Parameters<
  typeof useMuiChipsInputAdapter
>[0];

export type UseMuiChipsInputAdapterReturnType = ReturnType<
  typeof useMuiChipsInputAdapter
>;

export type MuiColorInputElementProps = React.ComponentPropsWithoutRef<
  typeof MuiColorInputElement
>;
export type UseMuiColorInputAdapterProps = Parameters<
  typeof useMuiColorInputAdapter
>[0];

export type UseMuiColorInputAdapterReturnType = ReturnType<
  typeof useMuiColorInputAdapter
>;

export type MuiFileInputElementProps = React.ComponentPropsWithoutRef<
  typeof MuiFileInputElement
>;

export type UseMuiFileInputAdapterProps = Parameters<
  typeof useMuiFileInputAdapter
>[0];

export type UseMuiFileInputAdapterReturnType = ReturnType<
  typeof useMuiFileInputAdapter
>;

export type MuiOtpInputElementProps = React.ComponentPropsWithoutRef<
  typeof MuiOtpInputElement
>;
export type UseMuiOtpInputAdapterProps = Parameters<
  typeof useMuiOtpInputAdapter
>[0];
export type UseMuiOtpInputAdapterReturnType = ReturnType<
  typeof useMuiOtpInputAdapter
>;

export type MuiTelInputElementProps = React.ComponentPropsWithoutRef<
  typeof MuiTelInputElement
>;

export type UseMuiTelInputAdapterProps = Parameters<
  typeof useMuiTelInputAdapter
>[0];

export type UseMuiTelInputAdapterReturnType = ReturnType<
  typeof useMuiTelInputAdapter
>;

export type NumberFormatBaseElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof NumberFormatBaseElement>,
  | "classes"
  | "className"
  | "composeClassName"
  | "composeHelperText"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "errorParser"
  | "getInputRef"
  | "helperText"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onValueChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "transform"
  | "type"
>;
export type NumericFormatElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof NumericFormatElement>,
  | "classes"
  | "className"
  | "composeClassName"
  | "composeHelperText"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "errorParser"
  | "getInputRef"
  | "helperText"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onValueChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "transform"
  | "type"
>;

export type PatternFormatElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof PatternFormatElement>,
  | "classes"
  | "className"
  | "composeClassName"
  | "composeHelperText"
  | "control"
  | "defaultValue"
  | "disabled"
  | "disableOnError"
  | "disableOnIsSubmitting"
  | "error"
  | "errorParser"
  | "getInputRef"
  | "helperText"
  | "max"
  | "maxLength"
  | "messages"
  | "min"
  | "minLength"
  | "name"
  | "onBlur"
  | "onValueChange"
  | "pattern"
  | "required"
  | "rules"
  | "shouldUnregister"
  | "style"
  | "transform"
  | "type"
>;
export type UseNumberFormatBaseAdapterProps = Parameters<
  typeof useNumberFormatBaseAdapter
>[0];

export type UseNumberFormatBaseAdapterReturnType = ReturnType<
  typeof useNumberFormatBaseAdapter
>;

export type UseNumericFormatAdapterProps = Parameters<
  typeof useNumericFormatAdapter
>[0];

export type UseNumericFormatAdapterReturnType = ReturnType<
  typeof useNumericFormatAdapter
>;

export type UsePatternFormatAdapterProps = Parameters<
  typeof usePatternFormatAdapter
>[0];

export type UsePatternFormatAdapterReturnType = ReturnType<
  typeof usePatternFormatAdapter
>;

export type CacheBusterProps = React.ComponentProps<typeof CacheBuster>;

export type UseReleaseStatusProps = ReleaseStatusOptions;
