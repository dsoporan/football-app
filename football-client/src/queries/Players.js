import { useQuery } from "@tanstack/react-query";

const fetchAllPlayers = async () => {
  const response = await fetch(process.env.REACT_APP_API_URL + "/players");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useGetAllPlayers = () =>
  useQuery({
    queryKey: ["players"],
    queryFn: fetchAllPlayers,
  });
