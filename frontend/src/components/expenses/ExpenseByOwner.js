import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ResponsiveBar from "../common/ResponsiveBar";
import GraphActions from "../../actions/GraphActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getExpenses } from "../../actions/expenses";
import getYearSummary from "../common/getYearSummary";

export class ExpenseByOwner extends Component {
  state = {
    graphData: [],
  };
  getExpenseYears = (expenses) => {
    const years = [];

    expenses.map((expense) => {
      if (!years.includes(expense["expense_date"].substring(0, 4))) {
        years.push(expense["expense_date"].substring(0, 4));
      }
    });

    return years.sort();
  };
  getExpenseOwners = (expenses) => {
    const owners = [];

    expenses.map((expense) => {
      if (!owners.includes(expense["expense_owner"])) {
        owners.push(expense["expense_owner"]);
      }
    });

    return owners.sort();
  };
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.expenseSummaryYear !== "") {
        const data = getYearSummary(
          this.props.expenses,
          "expense_owner",
          "amount",
          "expense_date",
          this.props.expenseSummaryYear,
          "bar"
        );
        //console.log(data);
        this.setState({ graphData: data });
      }
    }
  }
  componentDidMount() {
    this.props.getExpenses();
    if (this.props.expenseSummaryYear !== "") {
      const data = getYearSummary(
        this.props.expenses,
        "expense_owner",
        "amount",
        "expense_date",
        this.props.expenseSummaryYear,
        "bar"
      );
      //console.log(data);
      this.setState({ graphData: data });
    }
  }
  render() {
    const expenseYears = this.getExpenseYears(this.props.expenses);
    const expenseOwners = this.getExpenseOwners(this.props.expenses);
    //console.log(expenseOwners);
    return (
      <div style={{ height: "500px", width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Expenses by Owner
        </Typography>
        <GraphActions
          years={expenseYears}
          categories={this.props.categories}
          graph="ExpenseOwner"
        />
        <ResponsiveBar
          data={this.state.graphData}
          keys={expenseOwners}
          layout={this.props.barLayout}
          grouping={this.props.barGrouping}
          xname={"Date"}
          yname={"Amount"}
        />
      </div>
    );
  }
}

//maps redux state from reducers to props
const mapStateToProps = (state) => ({
  expenses: state.expenses.expenses,
  expenseSummaryYear: state.graphs.summaryYear,
  barLayout: state.graphs.barLayout,
  barGrouping: state.graphs.barGrouping,
  categories: state.graphs.categories,
});

export default connect(mapStateToProps, { getExpenses })(ExpenseByOwner);
