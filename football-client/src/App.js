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
import { useGetAllPlayers } from "./queries/Players";
import LoadingOverlay from "react-loading-overlay-ts";
import { Snackbar } from "@mui/material";

function App() {
  const [activeTeam, setActiveTeam] = useState({});
  const [favouritePlayers, setFavouritePlayers] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const {
    isLoading: isLoadingTeams,
    isError: isErrorTeams,
    data: dataTeams,
  } = useGetAllTeams();
  const {
    isLoading: isLoadingPlayers,
    isError: isErrorPlayers,
    data: dataPlayers,
  } = useGetAllPlayers();
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

  const players = useMemo(() => {
    if (!isLoadingPlayers && !isErrorPlayers) {
      return dataPlayers.players;
    }
  }, [isLoadingPlayers, isErrorPlayers, dataPlayers]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };

  const initialValues = {
    teams,
    players,
    activeTeam,
    setActiveTeam,
    favouritePlayers,
    setFavouritePlayers,
    addFavouritePlayer,
    removeFavouritePlayer,
  };

  useEffect(() => {
    if (isErrorTeams || isErrorTeams || isErrorPlayers) {
      setErrorOpen(true);
    }
  }, [isErrorPlayers, isErrorFavouritePlayers, isErrorTeams]);

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
        {(isLoadingPlayers || isLoadingTeams || isLoadingFavouritePlayers) && (
          <LoadingOverlay
            className="loading-overlay"
            active={true}
            spinner
            text="Loading..."
          />
        )}
        <Snackbar
          autoHideDuration={6000}
          open={errorOpen}
          onClose={handleClose}
          message="ERROR: Check your network"
        />
        <Home />
      </DataContext.Provider>
    </div>
  );
}

export default App;
