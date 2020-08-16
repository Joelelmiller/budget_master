import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";
import { SET_SUMMARY_YEAR, SET_BAR_LAYOUT, SET_BAR_GROUPING } from "./types";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  graphButtons: {
    marginLeft: 10,
  },
}));

export default function GraphActions(years) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const graphs = useSelector((state) => state.graphs);
  //console.log(expenses);

  const handleYear = (event) => {
    dispatch({
      type: SET_SUMMARY_YEAR,
      payload: event.target.value,
    });
  };

  const handleLayout = (event) => {
    dispatch({
      type: SET_BAR_LAYOUT,
      payload: event.target.value,
    });
  };

  const handleGrouping = (event) => {
    dispatch({
      type: SET_BAR_GROUPING,
      payload: event.target.value,
    });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="selectYear-label">Year</InputLabel>
        <Select
          fullWidth={true}
          labelId="selectYear-label"
          id="demo-simple-select-autowidth"
          value={graphs.summaryYear}
          onChange={handleYear}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {years["years"].map((year) => {
            return (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="barGroupingLabel">Bar Grouping</InputLabel>
        <Select
          className={classes.graphButtons}
          labelId="barGroupingLabel"
          id="grouping"
          name="grouping"
          value={graphs.barGrouping}
          onChange={handleGrouping}
        >
          <MenuItem value={"stacked"}>Stacked</MenuItem>
          <MenuItem value={"grouped"}>Grouped</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="barLayoutLabel">Bar Layout</InputLabel>
        <Select
          className={classes.graphButtons}
          labelId="barLayoutLabel"
          id="layout"
          name="layout"
          value={graphs.barLayout}
          onChange={handleLayout}
        >
          <MenuItem value={"vertical"}>Vertical</MenuItem>
          <MenuItem value={"horizontal"}>Horizontal</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
