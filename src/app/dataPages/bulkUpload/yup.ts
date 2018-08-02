import * as yup from 'yup';

export const  schema = yup.object().shape({
    invoiceNumber: yup.string().required().matches(/^\d+$/, {message: 'regex didnt work'}),
    // vehicleNumber: yup.string().required(),
    // partyName: yup.string().required(),
    // salesLedgerName: yup.string().required(),
    // saleType: yup.string().required(),
    // supplyPlace: yup.string().required(),
    // transportationMode: yup.string().required(),
    // nameOfProduct: yup.string().required(),
    // qty: yup.string().required(),
    // units: yup.string().required(),
    // amount: yup.string().required(),
    // narration: yup.string().required(),
    // attachment: yup.string().required(),
    // grandTotal: yup.string().required(),
    // subAmount: yup
    //   .number()
    //   .required()
    //   .positive()
    //   .integer(),
    // rate: yup.string().email(),
    // gstRate: yup.string().url(),
    // date: yup.date().default(function() {
    //   return new Date();
    // }),
  });
}
