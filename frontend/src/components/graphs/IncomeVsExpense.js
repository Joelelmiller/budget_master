import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ResponsiveLine from "../common/ResponsiveLine";
import ResponsiveBar from "../common/ResponsiveBar";
import GraphActions from "../../actions/GraphActions";
import { connect } from "react-redux";
import { getExpenses, getExpenseCategories } from "../../actions/expenses";
import { getIncomes, getIncomeCategories } from "../../actions/incomes";
import getYearSummary from "../common/getYearSummary";

export class IncomeVsExpense extends Component {
  state = {
    graphData: [],
    categories: [],
  };

  getYears = (expenses, incomes) => {
    const years = [];

    if (expenses.length > 0) {
      expenses.map((expense) => {
        if (!years.includes(expense["expense_date"].substring(0, 4))) {
          years.push(expense["expense_date"].substring(0, 4));
        }
      });
    }
    if (incomes.length > 0) {
      incomes.map((income) => {
        if (!years.includes(income["income_date"].substring(0, 4))) {
          years.push(income["income_date"].substring(0, 4));
        }
      });
    }

    return years.sort();
  };
  getCategories = (expenses) => {
    const categories = [];

    expenses.map((expense) => {
      if (!categories.includes(expense["category"])) {
        categories.push(expense["category"]);
      }
    });

    return categories.sort();
  };
  getSummaryData = (expenses, incomes) => {
    expenses.map((expense) => {
      expense["type"] = "expense";
      expense["date"] = expense["expense_date"];
    });

    incomes.map((income) => {
      income["type"] = "income";
      income["date"] = income["income_date"];
    });
    const data = [...expenses, ...incomes];
    //console.log(data);
    return data;
  };
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.summaryYear !== "") {
        const summaryData = this.getSummaryData(
          this.props.expenses,
          this.props.incomes
        );
        const data = getYearSummary(
          summaryData,
          "type",
          "amount",
          "date",
          this.props.summaryYear,
          "line"
        );
        //console.log(data);
        this.setState({ graphData: data });
      }
      const expCategories = this.getCategories(this.props.expenses);
      const incCategories = this.getCategories(this.props.incomes);
      this.props.getExpenseCategories(expCategories);
      this.props.getIncomeCategories(incCategories);
      this.setState({ categories: [...expCategories, ...incCategories] });
    }
  }
  componentDidMount() {
    this.props.getExpenses();
    this.props.getIncomes();
    if (this.props.summaryYear !== "") {
      const summaryData = this.getSummaryData(
        this.props.expenses,
        this.props.incomes
      );
      const data = getYearSummary(
        summaryData,
        "type",
        "amount",
        "date",
        this.props.summaryYear,
        "line"
      );
      //console.log(data);
      this.setState({ graphData: data });
    }
    const expCategories = this.getCategories(this.props.expenses);
    const incCategories = this.getCategories(this.props.incomes);
    this.props.getExpenseCategories(expCategories);
    this.props.getIncomeCategories(incCategories);
    this.setState({ categories: [...expCategories, ...incCategories] });
  }
  render() {
    const expenses = this.props.expenses;
    const incomes = this.props.incomes;
    const graphYears = this.getYears(expenses, incomes);
    const graphCategories = this.state.categories;
    if (this.props.categories.length === 0) {
      var categoryKeys = graphCategories;
    } else {
      var categoryKeys = this.props.categories;
    }
    console.log(this.state.graphData);
    return (
      <div style={{ height: "500px", width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Income vs Expenses
        </Typography>
        <GraphActions
          years={graphYears}
          categories={graphCategories}
          graph="IncomeVsExpense"
        />
        <ResponsiveLine data={this.state.graphData} />
      </div>
    );
  }
}

//maps redux state from reducers to props
const mapStateToProps = (state) => ({
  expenses: state.expenses.expenses,
  incomes: state.incomes.incomes,
  summaryYear: state.graphs.summaryYear,
  barLayout: state.graphs.barLayout,
  barGrouping: state.graphs.barGrouping,
  categories: state.graphs.categories,
});

export default connect(mapStateToProps, {
  getExpenses,
  getExpenseCategories,
  getIncomeCategories,
  getIncomes,
})(IncomeVsExpense);
