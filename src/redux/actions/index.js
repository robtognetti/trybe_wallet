// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const responseAPI = (payload) => ({ type: GET_CURRENCIES, payload });
export const saveEmail = (payload) => ({ type: SAVE_EMAIL, payload });

export const getCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  console.log(result);
  dispatch(responseAPI(Object.keys(result).filter((coin) => coin !== 'USDT')));
};
