export class GlobalVaribles {
  paramId: String;
  baseClientUrl: String = 'http://localhost:4200/';
  baseServerUrl: String = 'http://localhost:3000';

  constructor() {}
}
let paramIdValue;
export default (paramIdValue = 'hello');
