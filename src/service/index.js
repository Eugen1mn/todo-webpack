import callApi from '../utils/callApi';

const baseUrl = process.env.DB_BASE_URL;

export async function getAll() {
  const result = await callApi(`${baseUrl}/todos`, { method: 'GET' });
  return result;
}

export async function addTask(data) {
  const result = callApi(`${baseUrl}/todos`, { method: 'POST', data });
  return result;
}

export async function deleteTask(id) {
  const result = callApi(`${baseUrl}/todos/${id}`, { method: 'DELETE' });
  return result;
}

export async function deleteAllComplited() {
  const result = callApi(`${baseUrl}/todos`, { method: 'DELETE' });
  return result;
}

export async function updateTask(data, id) {
  const result = callApi(`${baseUrl}/todos/${id}`, { method: 'PUT', data });
  return result;
}
