const callApi = async (url, payload) => {
  if (payload.data) {
    const res = await fetch(url, {
      method: payload.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload.data),
    });
    const result = await res.json();
    return result;
  }

  const res = await fetch(url, {
    method: payload.method,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  return result;
};

export default callApi;
