import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});
const SignUpSchema = Yup.object().shape({
    userName:Yup.string().required("Username is required"),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});
const OnboardingSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    file: Yup.mixed().required('File is required'), 
    mobile: Yup.string()
    .required('Mobile is required')
    .matches(/^[0-9]+$/, "Enter Valid Mobile")
    .max(10).min(10),
    address: Yup.object().shape({
        landmark: Yup.string().required('Landmark is required'),
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        postalCode: Yup.string().required('Postal Code is required'),
        country: Yup.string().required('Country is required'),
    }),
    dob: Yup.date().required('Date of Birth is required'),
    gender: Yup.object().shape({
        key: Yup.string().required('Gender is required'),
    }).required('Gender is required'),
    // AccountStatus: Yup.string().required('Account Status is required'),
    securityQuestions: Yup.object().shape({
        question1:  Yup.string().required('Security Question is required'),
        
        answer1: Yup.string().required('Security Answer is required'),
    }),
});
const OtpSchema = Yup.object().shape({
    otp: Yup.string()
        .required('OTP is required')
        .length(6, 'OTP should be 6 digits long')
        .matches(/^[0-9]+$/, 'OTP should only contain digits')
});
const PasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Old Password is required')
        .min(8, 'Old Password should be at least 8 characters long'),
    password: Yup.string()
        .required('New Password is required')
        .min(8, 'New Password should be at least 8 characters long')
        .notOneOf([Yup.ref('oldPassword')], 'New Password should not be same as the Old Password')
});
export { SignInSchema ,SignUpSchema,OnboardingSchema,OtpSchema,PasswordSchema}