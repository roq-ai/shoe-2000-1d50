import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createOrder } from 'apiSdk/orders';
import { Error } from 'components/error';
import { orderValidationSchema } from 'validationSchema/orders';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { ServiceInterface } from 'interfaces/service';
import { TechnicianInterface } from 'interfaces/technician';
import { getUsers } from 'apiSdk/users';
import { getServices } from 'apiSdk/services';
import { getTechnicians } from 'apiSdk/technicians';
import { OrderInterface } from 'interfaces/order';

function OrderCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: OrderInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createOrder(values);
      resetForm();
      router.push('/orders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<OrderInterface>({
    initialValues: {
      status: '',
      customer_id: (router.query.customer_id as string) ?? null,
      service_id: (router.query.service_id as string) ?? null,
      technician_id: (router.query.technician_id as string) ?? null,
    },
    validationSchema: orderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Order
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'customer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<ServiceInterface>
            formik={formik}
            name={'service_id'}
            label={'Select Service'}
            placeholder={'Select Service'}
            fetcher={getServices}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<TechnicianInterface>
            formik={formik}
            name={'technician_id'}
            label={'Select Technician'}
            placeholder={'Select Technician'}
            fetcher={getTechnicians}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'order',
  operation: AccessOperationEnum.CREATE,
})(OrderCreatePage);
