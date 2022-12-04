async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(response.status, response.statusText);
    throw response;
  }
  return await response.json();
}

export default fetchData;
