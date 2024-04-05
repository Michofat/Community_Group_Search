import { useState } from "react";
import finderLogo from "./assets/logo.png";
import "./App.css";
import {
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import NeighborsList from "./NeighborsList";
import { communityGroups } from "./communityGroups";
import { calculateDistance } from "./utils";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import ShopIcon from "@mui/icons-material/Shop";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import PublicIcon from "@mui/icons-material/Public";

function App() {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [groupType, setGroupType] = useState("");
  const [mileRadius, setMileRadius] = useState("");
  const [memberCount, setMemberCount] = useState("");
  const [groupCategory, setGroupCategory] = useState("");
  const [filteredCommunityGroups, setFilteredCommunityGroups] = useState([]);
  const [myNeighbors, setMyNeighbors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGroupTypeChange = (event) => {
    setGroupType(event.target.value);
  };

  const handleGroupCategoryChange = (event) => {
    setGroupCategory(event.target.value);
  };

  const handleMileRadiusChange = (event) => {
    setMileRadius(event.target.value);
  };

  const handleMembershipCountChange = (event) => {
    setMemberCount(event.target.value);
    // Filter community groups based on membership count
    const filteredGroups = communityGroups.filter(
      (group) => group.membershipCount >= parseInt(event.target.value)
    );
    setFilteredCommunityGroups(filteredGroups);
  };

  const handleSubmit = () => {
    event.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Get the longitude and latitude of the selected community
      const selectedLocation = selectedCommunity
        ? selectedCommunity.location.split(", ")
        : null;
      const selectedLatitude = selectedLocation
        ? parseFloat(selectedLocation[0])
        : null;
      const selectedLongitude = selectedLocation
        ? parseFloat(selectedLocation[1])
        : null;
      const filteredGroups =
        filteredCommunityGroups.length > 0
          ? filteredCommunityGroups
          : communityGroups;
      const neighbors = findNeighbors(
        selectedLatitude,
        selectedLongitude,
        parseInt(mileRadius),
        filteredGroups
      );
      setMyNeighbors(neighbors);
      setIsSubmitting(false);
    }, 1000);
  };

  // Function to find neighboring communities
  const findNeighbors = (latitude, longitude, mileRadius, filteredArray) => {
    const neighbors = [];
    filteredArray.forEach((group) => {
      if (
        group.label !== selectedCommunity.label &&
        group.groupCategory === groupCategory &&
        group.groupType === groupType &&
        group.membershipCount >= parseInt(memberCount)
      ) {
        const groupLocation = group.location.split(", ");
        const groupLatitude = parseFloat(groupLocation[0]);
        const groupLongitude = parseFloat(groupLocation[1]);
        const distance = calculateDistance(
          latitude,
          longitude,
          groupLatitude,
          groupLongitude
        );
        if (distance <= mileRadius) {
          neighbors.push({
            communityName: group.label,
            distance: distance,
            membershipCount: group.membershipCount,
            groupType: group.groupType,
            groupCategory: group.groupCategory,
          });
        }
      }
    });
    return neighbors;
  };

  return (
    <>
      <div>
        <a href="https://omotayoiyiola.com" target="_blank">
          <img src={finderLogo} className="logo" alt="Finder logo" />
        </a>
      </div>
      <h2>Find neighboring community/town facebook groups</h2>
      <form>
        <Autocomplete
          fullWidth
          disablePortal
          id="combo-box-demo"
          options={communityGroups}
          getOptionLabel={(option) => option.label}
          sx={{ mb: 2 }}
          renderInput={(params) => (
            <TextField {...params} label="Community/Town Name" />
          )}
          onChange={(event, value) => setSelectedCommunity(value)}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Group Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={groupType}
            label="Group Type"
            onChange={handleGroupTypeChange}
            sx={{
              textAlign: "left", // Align text to the left
              "& .MuiSelect-select": {
                textAlign: "left", // Align selected option to the left
              },
            }}
          >
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Buy/Sell">Buy/Sell</MenuItem>
            <MenuItem value="Community/Town">Community/Town</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          type="number"
          label="Mile Radius"
          id="mileRadius"
          name="mileRadius"
          variant="outlined"
          margin="normal"
          onChange={handleMileRadiusChange}
        />

        <TextField
          fullWidth
          type="number"
          label="Minimum Membership Count"
          id="membershipCount"
          name="membershipCount" // Assigning 'name' directly
          variant="outlined"
          margin="normal"
          onChange={handleMembershipCountChange}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Group Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={groupCategory}
            label="Group Category"
            onChange={handleGroupCategoryChange}
            sx={{
              textAlign: "left", // Align text to the left
              "& .MuiSelect-select": {
                textAlign: "left", // Align selected option to the left
              },
            }}
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          {/* Render CircularProgress when submitting */}
          {isSubmitting ? (
            <CircularProgress color="primary" size={24} />
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={
                !selectedCommunity ||
                !groupType ||
                !mileRadius ||
                !memberCount ||
                !groupCategory
              }
            >
              Find neighbors {mileRadius ? `${mileRadius} miles away` : ""}
            </Button>
          )}
        </div>
      </form>
      {myNeighbors.length > 0 ? (
        <h2>{myNeighbors.length} matching results found</h2>
      ) : (
        <h2> No match found</h2>
      )}

      <NeighborsList
        myNeighbors={myNeighbors}
        selectedCommunity={selectedCommunity ? selectedCommunity.label : ""}
      />
    </>
  );
}

export default App;
