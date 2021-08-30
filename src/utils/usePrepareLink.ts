import { useLocation } from "react-router-dom";

interface schema {
  query: {
    [key: string]: string;
  };
  pathname?: string
}

export default function usePrepareLink({ query = {}, pathname }: schema) {
  const location = useLocation();


  if (!pathname) pathname = location.pathname;

  const newQuery = new URLSearchParams(location.search);

  Object.entries(query).forEach(([key, value]) => {
    // newQuery.set('ass', 'toi');
    newQuery.set(key, value);
  });

  return {
    pathname: pathname.replace(/\/\//g, "/"),
    search: newQuery.toString() ? `?${newQuery.toString()}` : "",
  };
}
