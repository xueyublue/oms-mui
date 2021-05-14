import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import { profileChanged } from "../../store/ui/user";
import { loadProfiles } from "./../../store/oracle/user";
import { TableCellHeader } from "../../components/TableCellHeader";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 180,
  },
}));

const getDistinctProfiles = (data) => {
  let profiles = [];
  data.map((row) => profiles.push(row.profile));
  return ["All", ...new Set(profiles)];
};

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const Profiles = () => {
  // call API
  useEffect(() => {
    dispatch(loadProfiles());
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.oracle.user.profiles.list);
  const profiles = getDistinctProfiles(tableData);
  const selectedProfile = useSelector((state) => state.ui.user.profiles.selectedProfile);

  const handleProfileChange = (event) => {
    dispatch(profileChanged({ selectedProfile: event.target.value }));
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="label-profile">Profile</InputLabel>
        <Select labelId="label-profile" id="select-profile" value={selectedProfile} onChange={handleProfileChange}>
          {profiles.map((profile) => (
            <MenuItem dense={true} value={profile} key={profile}>
              {profile}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCellHeader align="center" style={{ width: 60 }}>
              #
            </TableCellHeader>
            <TableCellHeader>Profile</TableCellHeader>
            <TableCellHeader>Resource&nbsp;Name</TableCellHeader>
            <TableCellHeader>Resource&nbsp;Type</TableCellHeader>
            <TableCellHeader>Limit</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData
            .filter((row) => (selectedProfile === "All" ? true : row.profile === selectedProfile))
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{row.profile}</TableCell>
                <TableCell>{row.resourceName}</TableCell>
                <TableCell>{row.resourceType}</TableCell>
                <TableCell>{row.limit}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Profiles;
