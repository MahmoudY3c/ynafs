import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("COludn't Fetch Data from the resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      }).finally(() => {
        setIsPending(false);

      });
  }, [url]);
  return { data, isPending, error };
}

export default useFetch;
