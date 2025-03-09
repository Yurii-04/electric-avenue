export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: 'Invalid email format',
  },
};

export const passwordValidation = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters',
  },
};

export const nameValidation = (msg: string) => ({
  required: msg,
  maxLength: {
    value: 50,
    message: 'Name must be less than 50 characters',
  },
});