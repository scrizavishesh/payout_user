import axios from "axios";

export const API_URL = "https://auth2.upicollect.com";

// var bearerToken = `Token d21cb51ed49203f081debb4e490684018b6adccc`


export const createFund = async (orderId, recId, id, amount) => {
  // axios.defaults.headers.common["Authorization"] = "";
  var response = await axios.get(`${API_URL}/api/payments/create?order_id=${orderId}&receipt_id=${recId}&id=${id}&amount=${amount}`,);
  if (response) {
    return response;
  } else {
    return [];
  }
}

export const createOrder = async (requestData, hmac) => {
  // axios.defaults.headers.common["Authorization"] = "";
  axios.defaults.headers.common["Sign"] = hmac;
  const response = await axios.post(`${API_URL}/api/payout/create/`, requestData);
  return response;
};
