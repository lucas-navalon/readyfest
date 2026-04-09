const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

function buildUrl(path) {
  return `${apiBaseUrl}${path}`;
}

async function request(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(data?.message || 'Nao foi possivel concluir a requisicao.');
  }

  return data;
}

export function listUsers() {
  return request('/users/listar');
}

export function getUserById(userId) {
  return request(`/users/buscar/${userId}`);
}

export function createUser(payload) {
  return request('/users/criar', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateUser(userId, payload) {
  return request(`/users/atualizar/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteUser(userId) {
  return request(`/users/deletar/${userId}`, {
    method: 'DELETE',
  });
}
