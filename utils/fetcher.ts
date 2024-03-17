export async function fetcher(
  url: string,
  queryParams: Record<string, any> = {}
) {
  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
