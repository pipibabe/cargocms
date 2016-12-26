/* @flow */
import axios from 'axios';

export async function postData(api: string, data: Object = {}) {
  return await axios.post(api, data)
      .then(response => response)
      .catch(error => error);
}

export async function getData(api: string, params: Object = {}) {
  return await axios.post(api, { params })
    .then(response => response)
    .catch(error => error);
}

const fetchApi = {
  postData,
  getData,
};

export default fetchApi;
