import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { SelectContainer } from "./SelectTeam.styles";
import { DataContext } from "../../contexts/DataContext";
import { useContext, useMemo, useState } from "react";

export const SelectTeam = () => {
  const [activeCountry, setActiveCountry] = useState("");
  const { teams, activeTeam, setActiveTeam } = useContext(DataContext);

  const countries = useMemo(() => {
    return [...new Set(teams?.map((team) => team.country))];
  }, [teams]);

  const teamsFromCountry = useMemo(() => {
    return teams?.filter((team) => team.country === activeCountry);
  }, [activeCountry, teams]);

  const handleCountryChange = (event) => {
    setActiveCountry(event.target.value);
  };

  const handleTeamChange = (event) => {
    const activeTeamFiltered = teams.find(
      (team) => team.name === event.target.value,
    );
    setActiveTeam(activeTeamFiltered);
  };

  return (
    <SelectContainer>
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="select-country">Country</InputLabel>
        <Select
          labelId="select-country"
          id="select-country-options"
          value={activeCountry}
          label="Country"
          onChange={handleCountryChange}
        >
          {countries?.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Choose country</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="select-team">Team</InputLabel>
        <Select
          labelId="select-team"
          id="select-team-options"
          value={activeTeam.name || ""}
          label="Team"
          onChange={handleTeamChange}
        >
          {teamsFromCountry?.map((team) => (
            <MenuItem key={team.name} value={team.name}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Choose team to see details</FormHelperText>
      </FormControl>
    </SelectContainer>
  );
};
