import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ResponsiveBar from "../common/ResponsiveBar";
import GraphActions from "../../actions/GraphActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getIncomes } from "../../actions/incomes";
import getYearSummary from "../common/getYearSummary";

export class IncomeByCategory extends Component {
  state = {
    graphData: [],
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
  }
  render() {
    const incomeYears = this.getIncomeYears(this.props.incomes);
    const incomeCategories = this.getIncomeCategories(this.props.incomes);
    return (
      <div style={{ height: "500px", width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Income by Category
        </Typography>
        <GraphActions years={incomeYears} />
        <ResponsiveBar
          data={this.state.graphData}
          keys={incomeCategories}
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
});

export default connect(mapStateToProps, { getIncomes })(IncomeByCategory);
