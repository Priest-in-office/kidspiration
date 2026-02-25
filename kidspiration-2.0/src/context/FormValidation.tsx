import { useState } from "react";

interface ValidationErrors {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  match?: string;
  maxAge?: number;
}

interface FieldConfig {
  [key: string]: ValidationErrors;
}

export interface DateValue {
  day: string;
  month: string;
  year: string;
}

type FieldValue = string | DateValue;

export function useFormValidation<T extends Record<string, FieldValue>>(
  initialValues: T,
  rules: FieldConfig
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const setValue = <K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    // clear error when user starts typing again
    if(errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateDate = (dateValue: DateValue, maxAge?: number): string | null => {
    const { day, month, year } = dateValue;

    if(!day || !month || !year){
      return "Please enter a complete date";
    }

    if (year.length !== 4) {
      return "Please enter a valid year";
    }

    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    if(isNaN(date.getTime())) {
      return "Please enter a valid date";
    }

    if(maxAge) {
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      const dayDiff = today.getDate() - date.getDate();

      const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

      if (actualAge > maxAge) {
        return `Children must be at most ${maxAge} years old`;
      }
    }
    return null;
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};

    for (const [field, fieldRules] of Object.entries(rules)){
      const value = values[field as keyof T];

      if(typeof value === "object" && "day" in value) {
        const dateError = validateDate(value, fieldRules.maxAge);
        if (fieldRules.required && dateError) {
          newErrors[field as keyof T] = dateError;
        }
        continue;
      }

      const stringValue = value as string;

      if (fieldRules.required && !stringValue) {
        newErrors[field as keyof T] = "This field is required";
      } else if (fieldRules.minLength && stringValue.length < fieldRules.minLength) {
        newErrors[field as keyof T] = `This field must be at least ${fieldRules.minLength} characters long`;
      } else if (fieldRules.pattern && !fieldRules.pattern.test(stringValue)) {
        newErrors[field as keyof T] = "Invalid format";
      } else if (fieldRules.match && stringValue !== (values[fieldRules.match as keyof T] as string)) {
        newErrors[field as keyof T] = "Fields do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getDateAsISO = (field: keyof T): string | null => {
    const value = values[field];
    if (typeof value === "object" && "day" in value) {
      const { day, month, year } = value;
      if (day && month && year) {
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }
    return null;
  }

  return { values, errors, setValue, validate, getDateAsISO };
}