async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(response.status, response.statusText);
    throw { status: response.status, statusText: response.statusText };
  }
  return await response.json();
}

export default fetchData;
