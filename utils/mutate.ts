export async function apiRequest<T, R>(
  url: string,
  method: "POST" | "PATCH" | "DELETE",
  body: T,
  headers: { [key: string]: string } = {}
): Promise<R> {
  const defaultHeaders = {
    "Content-Type": "application/json; charset=UTF-8",
  };

  const config: RequestInit = {
    method,
    headers: { ...defaultHeaders, ...headers },
    body: JSON.stringify(body),
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Network response was not ok");
  }

  return response.json();
}
