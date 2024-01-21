import { useMutation, useQuery } from "@tanstack/react-query";

const fetchAllFavouritePlayers = async () => {
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/favourite-players",
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useGetAllFavouritePlayers = () =>
  useQuery({
    queryKey: ["favouritePlayers"],
    queryFn: fetchAllFavouritePlayers,
  });

const addFavouritePlayer = async (playerId) => {
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/favourite-players/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ player_id: playerId }),
    },
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useAddFavouritePlayer = () =>
  useMutation({
    mutationFn: (playerId) => addFavouritePlayer(playerId),
  });

const removeFavouritePlayer = async (playerId) => {
  const response = await fetch(
    process.env.REACT_APP_API_URL + `/favourite-players/${playerId}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useRemoveFavouritePlayer = () =>
  useMutation({
    mutationFn: (playerId) => removeFavouritePlayer(playerId),
  });
