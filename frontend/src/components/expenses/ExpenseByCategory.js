import React, { Component } from "react";
import ResponsiveBar from "../common/ResponsiveBar";
import GraphActions from "../../actions/GraphActions";
import { connect } from "react-redux";
import { getExpenses } from "../../actions/expenses";
import getYearSummary from "../common/getYearSummary";

export class ExpenseByCategory extends Component {
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
  getExpenseCategories = (expenses) => {
    const categories = [];

    expenses.map((expense) => {
      if (!categories.includes(expense["category"])) {
        categories.push(expense["category"]);
      }
    });

    return categories.sort();
  };
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.expenseSummaryYear !== "") {
        const data = getYearSummary(
          this.props.expenses,
          "category",
          "amount",
          "expense_date",
          this.props.expenseSummaryYear
        );
        this.setState({ graphData: data });
      }
    }
  }
  componentDidMount() {
    this.props.getExpenses();
    if (this.props.expenseSummaryYear !== "") {
      const data = getYearSummary(
        this.props.expenses,
        "category",
        "amount",
        "expense_date",
        this.props.expenseSummaryYear
      );
      this.setState({ graphData: data });
    }
  }
  render() {
    const expenseYears = this.getExpenseYears(this.props.expenses);
    const expenseCategories = this.getExpenseCategories(this.props.expenses);
    return (
      <div style={{ height: "500px", width: "100%" }}>
        <GraphActions years={expenseYears} />
        <ResponsiveBar
          data={this.state.graphData}
          keys={expenseCategories}
          layout={this.props.barLayout}
          grouping={this.props.barGrouping}
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
});

export default connect(mapStateToProps, { getExpenses })(ExpenseByCategory);
