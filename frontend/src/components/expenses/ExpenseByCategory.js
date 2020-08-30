import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ResponsiveBar from "../common/ResponsiveBar";
import GraphActions from "../../actions/GraphActions";
import { connect } from "react-redux";
import { getExpenses, getExpenseCategories } from "../../actions/expenses";
import getYearSummary from "../common/getYearSummary";

export class ExpenseByCategory extends Component {
  state = {
    graphData: [],
    categories: [],
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
      const categories = this.getExpenseCategories(this.props.expenses);
      this.setState({ categories: categories });
      this.props.getExpenseCategories(categories);
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
    const categories = this.getExpenseCategories(this.props.expenses);
    this.setState({ categories: categories });
    this.props.getExpenseCategories(categories);
  }
  render() {
    const expenseYears = this.getExpenseYears(this.props.expenses);
    const expenseCategories = this.state.categories;
    if (this.props.category === "") {
      var categoryKeys = expenseCategories;
    } else {
      var categoryKeys = [this.props.category];
    }
    return (
      <div style={{ height: "500px", width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Expenses by Category
        </Typography>
        <GraphActions years={expenseYears} categories={expenseCategories} />
        <ResponsiveBar
          data={this.state.graphData}
          keys={categoryKeys}
          layout={this.props.barLayout}
          grouping={this.props.barGrouping}
          xname={"Date"}
          yname={"Category"}
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
  category: state.graphs.category,
});

export default connect(mapStateToProps, { getExpenses, getExpenseCategories })(
  ExpenseByCategory
);
