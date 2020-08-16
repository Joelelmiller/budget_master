import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import GraphActions from "../../actions/GraphActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getExpenses } from "../../actions/expenses";
import getYearSummary from "../common/GetYearSummary";

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
          this.props.expenseSummaryYear
        );
        //console.log(data);
        this.setState({ graphData: data });
      }
    }
  }
  componentDidMount() {
    this.props.getExpenses();
  }
  render() {
    const expenseYears = this.getExpenseYears(this.props.expenses);
    const expenseOwners = this.getExpenseOwners(this.props.expenses);
    //console.log(expenseOwners);
    return (
      <div style={{ height: "500px", width: "100%" }}>
        <GraphActions years={expenseYears} />
        <ResponsiveBar
          data={this.state.graphData}
          keys={expenseOwners}
          indexBy="month"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.15}
          innerPadding={4}
          colors={{ scheme: "nivo" }}
          borderRadius={12}
          borderColor={{ from: "color", modifiers: [["darker", "1.3"]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Expense Date",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Owner",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    );
  }
}

//maps redux state from reducers to props
const mapStateToProps = (state) => ({
  expenses: state.expenses.expenses,
  expenseSummaryYear: state.expenses.expenseSummaryYear,
});

export default connect(mapStateToProps, { getExpenses })(ExpenseByOwner);
