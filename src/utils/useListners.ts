import { GET_PARAMS } from "../STORE/constants";
import useGetParameter from "./useGetParameter";

export default function useListners() {
  const sortBy = useGetParameter(GET_PARAMS.sortBy);
  const filterBy = useGetParameter(GET_PARAMS.filterBy);

  return {sortBy, filterBy}
}
