import { useEffect, useState } from "react";

type Response = {
  data: string | null;
  isLoading: boolean;
  error: string | null;
};

export function useFetch(url: string): Response {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    function() {
      if (!url) return;

      setData(null);
      setIsLoading(true);
      setError(null);

      async function fetchData() {
        try {
          const response = await fetch(url);

          if (!response.ok) throw new Error("Recieved a non 200 response");

          const data = await response.text();

          setData(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error has occurred");
          }
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();
    },
    [url],
  );

  return { data, isLoading, error };
}
