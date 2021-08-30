import { useLocation } from "react-router-dom";

export default function useGetParameter(name: string) {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  return query.get(name);
}
