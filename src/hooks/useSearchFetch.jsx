import { useState, useEffect } from "react";

export default function useFetch(url, searchValue) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!searchValue) return;
    setLoading(true);
    fetch(url + searchValue)
      .then((response) => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url, searchValue]);

  return { loading, error, data };
}
