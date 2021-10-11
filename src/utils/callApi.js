const callApi = async (url, payload) => {
  const res = await fetch(url, {
    method: payload.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload.data),
  });
  const result = await res.json();
  return result;
};

export default callApi;
