import PropTypes from "prop-types";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";

const NeighborsList = ({ myNeighbors, selectedCommunity }) => {
  return (
    <Box mt={3} p={2}>
      <Paper elevation={3}>
        <Typography variant="h6" align="center" mt={2} mb={2}>
          Neighbors List
        </Typography>
        <List>
          {myNeighbors.map((neighbor, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={neighbor.communityName}
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        display="inline"
                      >
                        Located within {Math.ceil(neighbor.distance)} mile
                        radius of {selectedCommunity}.{" "}
                      </Typography>
                      <br />
                      <Typography variant="body2" color="text.secondary">
                        <BusinessIcon />{" "}
                        <span style={{ fontWeight: "bold" }}>Group Type:</span>{" "}
                        {neighbor.groupType}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <PeopleAltIcon />{" "}
                        <span style={{ fontWeight: "bold" }}>
                          Membership Count:
                        </span>{" "}
                        {neighbor.membershipCount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <CategoryIcon />{" "}
                        <span style={{ fontWeight: "bold" }}>
                          Group Category:
                        </span>{" "}
                        {neighbor.groupCategory}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < myNeighbors.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

NeighborsList.propTypes = {
  myNeighbors: PropTypes.arrayOf(
    PropTypes.shape({
      communityName: PropTypes.string.isRequired,
      distance: PropTypes.number.isRequired,
      groupType: PropTypes.string.isRequired,
      membershipCount: PropTypes.number.isRequired,
      groupCategory: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCommunity: PropTypes.string.isRequired,
};

export default NeighborsList;
