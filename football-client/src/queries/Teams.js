import { useQuery } from "@tanstack/react-query";

const fetchAllTeams = async () => {
  const response = await fetch(process.env.REACT_APP_API_URL + "/teams");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useGetAllTeams = () =>
  useQuery({
    queryKey: ["teams"],
    queryFn: fetchAllTeams,
  });
