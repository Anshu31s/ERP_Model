import { z } from 'zod';

export const teacherSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').nonempty('Name is required'),

  email: z.string().email('Invalid email format').nonempty('Email is required'),

  dob: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: 'Date of Birth is required',
  }),

  gender: z.enum(['male', 'female', 'other'], 'Please select a gender'),

  blood: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 'Please select a blood group'),

  mobile: z.string()
    .length(10, 'Mobile number must be 10 digits')
    .regex(/^\d+$/, 'Mobile number must contain only digits')
    .nonempty('Mobile number is required'),

  father_name: z.string().min(2, 'Father\'s name must be at least 2 characters long').nonempty('Father\'s name is required'),

  mother_name: z.string().min(2, 'Mother\'s name must be at least 2 characters long').nonempty('Mother\'s name is required'),

  father_mobile: z.string()
    .length(10, 'Father\'s mobile number must be 10 digits')
    .regex(/^\d+$/, 'Father\'s mobile number must contain only digits')
    .nonempty('Father\'s mobile number is required'),

  mother_mobile: z.string()
    .length(10, 'Mother\'s mobile number must be 10 digits')
    .regex(/^\d+$/, 'Mother\'s mobile number must contain only digits')
    .nonempty('Mother\'s mobile number is required'),

  current_address: z.string().min(5, 'Current address must be at least 5 characters long').nonempty('Address is required'),
});
