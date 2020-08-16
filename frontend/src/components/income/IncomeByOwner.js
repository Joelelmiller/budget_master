import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ResponsiveBar from "../common/ResponsiveBar";
import GraphActions from "../../actions/GraphActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getIncomes } from "../../actions/incomes";
import getYearSummary from "../common/getYearSummary";

export class IncomeByOwner extends Component {
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
  getIncomeOwners = (incomes) => {
    const owners = [];

    incomes.map((income) => {
      if (!owners.includes(income["income_owner"])) {
        owners.push(income["income_owner"]);
      }
    });

    return owners.sort();
  };
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.incomeSummaryYear !== "") {
        const data = getYearSummary(
          this.props.incomes,
          "income_owner",
          "amount",
          "income_date",
          this.props.incomeSummaryYear
        );
        //console.log(data);
        this.setState({ graphData: data });
      }
    }
  }
  componentDidMount() {
    this.props.getIncomes();
  }
  render() {
    const incomeYears = this.getIncomeYears(this.props.incomes);
    const incomeOwners = this.getIncomeOwners(this.props.incomes);
    //console.log(incomeOwners);

    return (
      <div style={{ height: "500px", width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Income by Owner
        </Typography>
        <GraphActions years={incomeYears} />
        <ResponsiveBar
          data={this.state.graphData}
          keys={incomeOwners}
          layout={this.props.barLayout}
          grouping={this.props.barGrouping}
          xname={"Date"}
          yname={"Owner"}
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

export default connect(mapStateToProps, { getIncomes })(IncomeByOwner);
