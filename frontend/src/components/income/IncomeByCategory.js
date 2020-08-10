import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import IncomeYearSelect from "../../actions/IncomeYearSelect";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getIncomes } from "../../actions/incomes";
import getYearSummary from "../common/GetYearSummary";

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
  }
  render() {
    const incomeYears = this.getIncomeYears(this.props.incomes);

    return (
      <div style={{ height: "500px", width: "100%" }}>
        <IncomeYearSelect years={incomeYears} />
        <ResponsiveBar
          data={this.state.graphData}
          keys={["Paycheck", "Bonus", "Investment", "Rental", "Other"]}
          indexBy="month"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.15}
          innerPadding={4}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "grocery",
              },
              id: "dots",
            },
            {
              match: {
                id: "gas",
              },
              id: "lines",
            },
          ]}
          borderRadius={12}
          borderColor={{ from: "color", modifiers: [["darker", "1.3"]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Income Date",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Category",
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
  incomes: state.incomes.incomes,
  incomeSummaryYear: state.incomes.incomeSummaryYear,
});

export default connect(mapStateToProps, { getIncomes })(IncomeByCategory);
