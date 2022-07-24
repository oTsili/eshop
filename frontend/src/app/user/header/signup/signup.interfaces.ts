export interface SignupAuthData {
  email: string;
  firstName: string;
  lastName: string;
  signupDate: string;
  password: string;
  passwordConfirm: string;
}

// An interface that describes the properties
// that are requried to create a new User
export interface UserAttrs {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  id?: string;
  password: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}
