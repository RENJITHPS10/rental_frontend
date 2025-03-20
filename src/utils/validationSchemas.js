import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const registerSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: Yup.string().oneOf(['customer', 'owner', 'driver']).required('Role is required'),
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^\+?[1-9]\d{9}$/, 'Mobile number must be exactly 10 digits (e.g., +1234567890 or 1234567890)'),
  license: Yup.mixed().when('role', {
    is: 'driver',
    then: () => Yup.mixed().required('License is required for drivers'), // Explicitly return schema
    otherwise: () => Yup.mixed().notRequired(), // Explicitly return schema
  }),
});



export const bookingSchema = Yup.object({
  vehicleId: Yup.string().required('Vehicle ID is required'),
  startDate: Yup.date()
    .required('Start date is required')
    .min(new Date(), 'Start date must be today or later'),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date must be after start date'),
  dropLocation: Yup.string().optional(), // Optional field
  needsDriver: Yup.boolean().required(),
});

export const supportTicketSchema = Yup.object({
  issue: Yup.string().required('Issue description is required'),
});

export const profileSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  license: Yup.mixed(),
});

export const conditionReportSchema = Yup.object({
  condition: Yup.string().required('Condition description is required'),
  images: Yup.array().min(1, 'At least one image is required'),
});

export const paymentSchema = Yup.object({
  amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
  paymentMethod: Yup.string()
    .oneOf(['credit_card', 'debit_card'], 'Invalid payment method')
    .required('Payment method is required'),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, 'Card number must be 16 digits')
    .required('Card number is required'),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be MM/YY')
    .required('Expiry is required'),
  cvv: Yup.string().matches(/^\d{3}$/, 'CVV must be 3 digits').required('CVV is required'),
});

export const ratingSchema = Yup.object({
  vehicleRating: Yup.number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .required('Vehicle rating is required'),
  vehicleComment: Yup.string().required('Vehicle comment is required'),
  driverRating: Yup.number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5'),
  driverComment: Yup.string(),
});



export const vehicleSchema = Yup.object({
  model: Yup.string().required('Model is required'),
  type: Yup.string().oneOf(['bike', 'car']).required('Vehicle type is required'),
  price: Yup.number().min(1, 'Price must be greater than 0').required('Price is required'),
  fuelType: Yup.string().oneOf(['petrol', 'diesel', 'electric']).required('Fuel type is required'),
  category: Yup.string().required('Category is required'),
  seatingCapacity: Yup.number()
    .min(1, 'Seating capacity must be at least 1')
    .required('Seating capacity is required'),
  location: Yup.string().required('Location is required'),
  registration: Yup.string().required('Registration number is required'),
  images: Yup.array().min(1, 'At least one image is required'),
  insuranceImage: Yup.mixed().required('Insurance image is required'),
});

export const locationSchema = Yup.object({
  latitude: Yup.number().required('Latitude is required'),
  longitude: Yup.number().required('Longitude is required'),
});