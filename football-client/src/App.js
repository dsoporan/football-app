import "./App.css";
import { Home } from "./components/home/Home";
import { DataContext } from "./contexts/DataContext";
import { useEffect, useMemo, useState } from "react";
import { useGetAllTeams } from "./queries/Teams";
import {
  useAddFavouritePlayer,
  useGetAllFavouritePlayers,
  useRemoveFavouritePlayer,
} from "./queries/FavouritePlayers";

function App() {
  const [activeTeam, setActiveTeam] = useState({});
  const [favouritePlayers, setFavouritePlayers] = useState([]);
  const {
    isLoading: isLoadingTeams,
    isError: isErrorTeams,
    data: dataTeams,
  } = useGetAllTeams();
  const {
    isLoading: isLoadingFavouritePlayers,
    isError: isErrorFavouritePlayers,
    data: dataFavouritePlayers,
  } = useGetAllFavouritePlayers();
  const addFavouritePlayer = useAddFavouritePlayer();
  const removeFavouritePlayer = useRemoveFavouritePlayer();

  const teams = useMemo(() => {
    if (!isLoadingTeams && !isErrorTeams) {
      return dataTeams.teams;
    }
  }, [isLoadingTeams, isErrorTeams, dataTeams]);

  const initialValues = {
    teams,
    activeTeam,
    setActiveTeam,
    favouritePlayers,
    setFavouritePlayers,
    addFavouritePlayer,
    removeFavouritePlayer,
  };

  useEffect(() => {
    if (!isLoadingFavouritePlayers && !isErrorFavouritePlayers) {
      setFavouritePlayers(dataFavouritePlayers.favouritePlayers);
    }
  }, [
    isLoadingFavouritePlayers,
    isErrorFavouritePlayers,
    dataFavouritePlayers,
  ]);
  return (
    <div className="App">
      <DataContext.Provider value={initialValues}>
        <Home />
      </DataContext.Provider>
    </div>
  );
}

export default App;
