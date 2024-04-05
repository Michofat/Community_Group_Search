import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const NeighborsList = ({ myNeighbors, selectedCommunity }) => {
  console.log("THEARRAY", myNeighbors);
  return (
    <div>
      <List>
        {myNeighbors.map((neighbor, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText
                primary={neighbor.communityName}
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Located within {Math.ceil(neighbor.distance)} mile radius of{" "}
                    {selectedCommunity}.<br />
                    Group Type: {neighbor.groupType}
                    <br />
                    Membership Count: {neighbor.membershipCount}
                    <br />
                    Group Category: {neighbor.groupCategory}
                  </Typography>
                }
              />
            </ListItem>
            {index < myNeighbors.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </div>
  );
};

NeighborsList.propTypes = {
  myNeighbors: PropTypes.arrayOf(
    PropTypes.shape({
      communityName: PropTypes.string.isRequired,
      distance: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedCommunity: PropTypes.string.isRequired,
  groupType: PropTypes.string.isRequired,
  membershipCount: PropTypes.number.isRequired,
  groupCategory: PropTypes.string.isRequired,
};

export default NeighborsList;
