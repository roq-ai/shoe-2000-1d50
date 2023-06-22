import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  status: yup.string().required(),
  customer_id: yup.string().nullable().required(),
  service_id: yup.string().nullable().required(),
  technician_id: yup.string().nullable(),
});
