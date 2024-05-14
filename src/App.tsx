import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [displayVal, setDisplayVal] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  const url =
    "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/656e63";

  const { data, isLoading, error } = useFetch(url);

  useEffect(() => {
    setTimeout(() => {
      type();
    }, 500);
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  function type() {
    if (data && data.length > displayVal.length) {
      const slice = data.slice(0, index).split('');
      setDisplayVal(slice);
      setIndex(index + 1);
    } else {
      return
    }
  }

  return (
    <ul>
      {displayVal && displayVal.map(function(item, index) {
          return <li key={`${item}-${index}`}>{item}</li>;
        })}
    </ul>
  )
}

export default App;
