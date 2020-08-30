import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ResponsiveBar from "../common/ResponsiveBar";
import GraphActions from "../../actions/GraphActions";
import { connect } from "react-redux";
import { getIncomes, getIncomeCategories } from "../../actions/incomes";
import getYearSummary from "../common/getYearSummary";

export class IncomeByCategory extends Component {
  state = {
    graphData: [],
    categories: [],
  };

  getIncomeYears = (incomes) => {
    const years = [];

    incomes.map((income) => {
      if (!years.includes(income["income_date"].substring(0, 4))) {
        years.push(income["income_date"].substring(0, 4));
      }
    });

    return years.sort();
  };
  getIncomeCategories = (incomes) => {
    const categories = [];

    incomes.map((income) => {
      if (!categories.includes(income["category"])) {
        categories.push(income["category"]);
      }
    });

    return categories.sort();
  };
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.incomeSummaryYear !== "") {
        const data = getYearSummary(
          this.props.incomes,
          "category",
          "amount",
          "income_date",
          this.props.incomeSummaryYear
        );
        this.setState({ graphData: data });
      }
      const categories = this.getIncomeCategories(this.props.incomes);
      this.setState({ categories: categories });
      this.props.getIncomeCategories(categories);
    }
  }
  componentDidMount() {
    this.props.getIncomes();
    if (this.props.incomeSummaryYear !== "") {
      const data = getYearSummary(
        this.props.incomes,
        "category",
        "amount",
        "income_date",
        this.props.incomeSummaryYear
      );
      this.setState({ graphData: data });
    }
    const categories = this.getIncomeCategories(this.props.incomes);
    this.setState({ categories: categories });
    this.props.getIncomeCategories(categories);
  }
  render() {
    const incomeYears = this.getIncomeYears(this.props.incomes);
    const incomeCategories = this.state.categories;
    if (this.props.category === "") {
      var categoryKeys = incomeCategories;
    } else {
      var categoryKeys = [this.props.category];
    }
    return (
      <div style={{ height: "500px", width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Incomes by Category
        </Typography>
        <GraphActions years={incomeYears} categories={incomeCategories} />
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
  incomes: state.incomes.incomes,
  incomeSummaryYear: state.graphs.summaryYear,
  barLayout: state.graphs.barLayout,
  barGrouping: state.graphs.barGrouping,
  category: state.graphs.category,
});

export default connect(mapStateToProps, { getIncomes, getIncomeCategories })(
  IncomeByCategory
);
