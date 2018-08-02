import * as yup from 'yup';
const {
  object,
  string,
  array,
  mixed,
  addMethod,
  number,
  date,
} = require('yup');
export const schema = array().of(
  object().shape({
    invoiceNumber: yup
      //   .string()
      //   .required()
      //   .matches(/^\d+$/, { message: 'regex didnt work' })
      .mixed()
      .oneOf(['jimmy', '42'])
      .required('invoice number is required.'),
    // vehicleNumber: yup.string().required(),
    // partyName: yup.string().required(),
    // salesLedgerName: yup.string().required(),
    // saleType: yup.string().required(),
    // supplyPlace: yup.string().required(),
    // transportationMode: yup.string().required(),
    // nameOfProduct: yup.string().required(),
    // qty:  yup
    //   .number()
    //   .required()
    //   .positive()
    // units:  yup
    //   .number()
    //   .required()
    //   .positive()
    // amount:  yup
    //   .number()
    //   .required()
    //   .positive()
    // narration: yup.string(),
    // grandTotal: yup.
    //   .number()
    //   .required()
    //   .positive()
    // subAmount: yup
    //   .number()
    //   .required()
    //   .positive()
    // rate:  yup
    //   .number()
    //   .required()
    //   .positive()
    // gstRate: yup
    //   .number()
    //   .required()
    //   .positive()
    // date: yup.date().default(function() {
    //   return new Date();
    // }),
  })
);
