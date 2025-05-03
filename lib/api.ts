type FetchOptions = RequestInit & {
  csrfToken?: string
}

export async function fetchWithCsrf<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { csrfToken, ...fetchOptions } = options

  const headers = new Headers(fetchOptions.headers)
  if (csrfToken) {
    headers.set('x-csrf-token', csrfToken)
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || 'Network response was not ok')
  }

  return response.json()
}

export async function post<T>(url: string, data: any, csrfToken?: string): Promise<T> {
  return fetchWithCsrf<T>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    csrfToken,
  })
}

export async function put<T>(url: string, data: any, csrfToken?: string): Promise<T> {
  return fetchWithCsrf<T>(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    csrfToken,
  })
}

export async function del<T>(url: string, csrfToken?: string): Promise<T> {
  return fetchWithCsrf<T>(url, {
    method: 'DELETE',
    csrfToken,
  })
} 