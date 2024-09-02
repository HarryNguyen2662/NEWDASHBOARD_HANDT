import { FormStep, FormValues } from "@/types/RegisterPage";

export const getInitValues = (steps: FormStep[]): FormValues => {
  return steps.reduce((value, step) => {
    return { ...value, ...step.schema };
  }, {} as FormValues);
};

export const containErrorInFields = (
  errors: Record<string, any>,
  fields: string[]
): boolean => {
  return fields.reduce((res, field) => res || errors[field], false);
};
