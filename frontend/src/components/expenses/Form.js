import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { addExpense } from "../../actions/expenses";

const styles = {
  root: {
    maxWidth: 500,
    minWidth: 100,
    margin: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 30,
    paddingLeft: 4,
  },
  pos: {
    marginBottom: 12,
  },
  name: {
    marginTop: 30,
  },
  formControl: {
    margin: "auto",
    minWidth: 100,
    width: "100%",
  },
  categoryLabel: {
    marginLeft: 30,
  },
  button: {
    marginLeft: 25,
    marginBottom: 15,
  },
};

class Form extends Component {
  state = {
    name: "",
    description: "",
    expense_date: new Date(),
    amount: 0,
    category: "",
    expense_owner: "",
  };

  static propTypes = {
    addExpense: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  onChange = (e) => {
    //console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  };
  onDateChange = (d) => {
    this.setState({ expense_date: d });
  };

  onSubmit = (e) => {
    e.preventDefault();
    //build Json from state
    var {
      name,
      description,
      expense_date,
      amount,
      category,
      expense_owner,
    } = this.state;
    if (description == "") {
      description = "none";
    }
    if (expense_owner == "") {
      expense_owner = "none";
    }

    const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "2-digit",
    });
    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
    ] = dateTimeFormat.formatToParts(expense_date);
    const formatted_expense_date = `${year}-${month}-${day}` + "T00:00";

    const expense = {
      name,
      description,
      expense_date: formatted_expense_date,
      amount,
      category,
      expense_owner,
    };
    //console.log(expense);
    this.props.addExpense(expense);
    this.setState({
      name: "",
      description: "",
      expense_date: new Date(),
      amount: 0,
      category: "",
      expense_owner: "",
    });
  };

  render() {
    const classes = this.props.classes;
    const bull = <span className={classes.bullet}>•</span>;
    const {
      name,
      description,
      expense_date,
      amount,
      category,
      expense_owner,
    } = this.state;
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            Add Expenses
          </Typography>
          <Divider />
          <FormControl className={classes.formControl}>
            <List component="nav">
              <ListItem>
                <TextField
                  fullWidth={true}
                  required
                  id="name"
                  label="Name"
                  variant="outlined"
                  onChange={this.onChange}
                  name="name"
                  value={name}
                />
              </ListItem>
              <ListItem>
                <TextField
                  fullWidth={true}
                  id="description"
                  label="Description"
                  variant="outlined"
                  onChange={this.onChange}
                  name="description"
                  value={description}
                />
              </ListItem>
              <ListItem>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    fullWidth={true}
                    margin="normal"
                    inputVariant="outlined"
                    id="expense_date"
                    name="expense_date"
                    label="Expense Date"
                    format="yyyy-MM-dd"
                    value={expense_date}
                    onChange={this.onDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </ListItem>
              <ListItem>
                <TextField
                  fullWidth={true}
                  type="number"
                  required
                  id="amount"
                  label="Amount"
                  variant="outlined"
                  onChange={this.onChange}
                  name="amount"
                  value={amount}
                />
              </ListItem>
              <ListItem>
                <TextField
                  fullWidth={true}
                  required
                  id="expense_owner"
                  label="Owner"
                  variant="outlined"
                  onChange={this.onChange}
                  name="expense_owner"
                  value={expense_owner}
                />
              </ListItem>
              <ListItem>
                <InputLabel
                  className={classes.categoryLabel}
                  id="demo-simple-select-label"
                >
                  Category
                </InputLabel>
                <Select
                  fullWidth={true}
                  labelId="demo-simple-select-label"
                  id="category"
                  name="category"
                  value={category}
                  onChange={this.onChange}
                >
                  <MenuItem value={"rent"}>Rent</MenuItem>
                  <MenuItem value={"bills"}>Bills</MenuItem>
                  <MenuItem value={"electric"}>Electric</MenuItem>
                  <MenuItem value={"gas"}>Gas</MenuItem>
                  <MenuItem value={"insurance"}>Insurance</MenuItem>
                  <MenuItem value={"grocery"}>Grocery</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </ListItem>
            </List>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<CloudUploadIcon />}
            onClick={this.onSubmit}
            size="large"
          >
            Add Expense
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default connect(null, { addExpense })(withStyles(styles)(Form));
