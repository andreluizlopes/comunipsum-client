import {
  FETCH_UPLOAD
} from './types';
// import axios from 'axios';
import _ from 'lodash';

// const API_URL = 'http://dev-price-api.aws.dafitidev.com.br';

export function uploadSpecialPrice(specialPrices) {
  console.log(specialPrices);
  return dispatch => {
    clearFetchUpload(dispatch);
    const validFile = validateSpecialPrice(specialPrices);
    validFile.then( validFileResult => {
      const diffOriginalFileLength = specialPrices.length - validFileResult.length;
      if (diffOriginalFileLength > 0) {
        return dispatch({
          type: FETCH_UPLOAD,
          errorItems: 'Erro ao processar o arquivo: SKUs duplicados',
        });
      }
      return dispatch({
          type: FETCH_UPLOAD,
          successItems: validFileResult.length,
          errorItems: diffOriginalFileLength
        });
    }, err => {
      console.log(err);
      return dispatch({
        type: FETCH_UPLOAD,
        errorItems: 'Erro ao processar o arquivo.',
      });
    });
  }
}

function clearFetchUpload(dispatch) {
  dispatch({
    type: FETCH_UPLOAD,
  });
}

export function fetchUpload(successItems, errorItems) {
  return dispatch => {
    dispatch({
      type: FETCH_UPLOAD,
      successItems,
      errorItems
    });
  }
}

export function fetchUploadProgress(progress) {
  return dispatch => {
    dispatch({
      type: FETCH_UPLOAD,
      progress
    });
  }
}

function validateSpecialPrice(specialPrices) {
  return new Promise(function(resolve, reject) {
    return setTimeout(() => {
      resolve(_.uniqWith(specialPrices, _.isEqual));
   },1400);
  });
}

// function handleUpload(specialPrice) {
//   const sku = specialPrice.sku;
//   return false;
//   axios.put(`${API_URL}/prices/${sku}/special-prices`, specialPrice, {
//     headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
//   })
//   .then(response => {
//     console.log(response);
//   })
//   .catch(err => {
//     console.log(err);
//   });
// }
