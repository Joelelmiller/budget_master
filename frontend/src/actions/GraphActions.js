import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_SUMMARY_YEAR,
  SET_BAR_LAYOUT,
  SET_BAR_GROUPING,
  SET_BAR_CATEGORY,
} from "./types";

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

export default function GraphActions(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const graphs = useSelector((state) => state.graphs);
  const matched = useMediaQuery("(min-width:600px)");
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
  const handleCategory = (event) => {
    dispatch({
      type: SET_BAR_CATEGORY,
      payload: event.target.value,
    });
  };
  const desktopControls = (
    <Fragment>
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
    </Fragment>
  );

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
          {props.years.map((year) => {
            return (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="selectCategory-label">Category</InputLabel>
        <Select
          fullWidth={true}
          autoWidth={true}
          labelId="selectCategory-label"
          id="categorySelect"
          value={graphs.categories}
          onChange={handleCategory}
          multiple
        >
          {props.categories.map((category) => {
            return (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {matched ? desktopControls : null}
    </div>
  );
}
