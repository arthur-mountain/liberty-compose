import axios, { AxiosInstance } from 'axios';

let instance: AxiosInstance;

// If have to pass parameter for config of create instance then should make a factory function neither IFFE.
export default (function () {
  if (instance) return instance;

  /** 
   * Features: Add some baseurl or config or interator.
  */
  instance = axios.create({ timeout: 3000 });

  return instance;
})();