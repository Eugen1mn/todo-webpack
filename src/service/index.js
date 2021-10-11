import callApi from '../utils/callApi';

const baseUrl = 'http://localhost:5000/todos';

export async function getAll() {
  const result = await callApi(baseUrl, { method: 'GET' });
  return result;
}

export async function addTask(data) {
  const result = callApi(baseUrl, { method: 'POST', data });
  return result;
}

export async function deleteTask(id) {
  const url = `${baseUrl}/${id}`;
  const result = callApi(url, { method: 'DELETE' });
  return result;
}

export async function deleteAllComplited() {
  const result = callApi(baseUrl, { method: 'DELETE' });
  return result;
}

export async function updateTask(data, id) {
  const url = `${baseUrl}/${id}`;
  const result = callApi(url, { method: 'PUT', data });
  return result;
}
