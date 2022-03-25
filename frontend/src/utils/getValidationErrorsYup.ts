import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

interface getValidationsErrorsProps {
  validationErrors: Errors;
  objectToArray: string[];
}

export default function getValidationErrorsYup(
  err: ValidationError,
): getValidationsErrorsProps {
  const validationErrors: Errors = {};

  const objectToArray: string[] = [];

  err.inner.forEach((error, i) => {
    if (error.path) {
      validationErrors[error.path] = error.message;
      objectToArray[i] = error.message;
    }
  });

  return { validationErrors, objectToArray };
}
