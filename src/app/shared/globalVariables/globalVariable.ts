export class GlobalVaribles {
  paramId: String;
  baseClientUrl: String = 'http://localhost:4200/';
  // baseClientUrl: String = 'http://139.59.4.34/';
  baseServerUrl: String = 'http://localhost:3000';

  constructor() {}
}
let paramIdValue;
export default (paramIdValue = 'hello');
