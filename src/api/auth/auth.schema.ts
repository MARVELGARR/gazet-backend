import { object, string, type TypeOf } from 'zod';

export const registerSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required'
    }),
    email: string({
      required_error: 'Email is required'
    }).email('Invalid email format'),
    businessName: string({
      required_error: 'Business Name is required'
    }),
    password: string({
      required_error: 'Password is required'
    }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
      message:
        'Password must be at least eight characters, with at least one upper case letter, one lower case letter, one number and one special character'
    }),
    passwordConfirm: string({
      required_error: 'Password confirm is required'
    })
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords are not the same'
  })
});

export type RegisterInput = TypeOf<typeof registerSchema>['body'];