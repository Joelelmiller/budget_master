import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { ResponsiveBar } from "@nivo/bar";
import ExpenseYearSelect from "../../actions/ExpenseYearSelect";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getExpenses } from "../../actions/expenses";
import getYearSummary from "../common/GetYearSummary";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const styles = {
  formControl: {
    margin: "auto",
    minWidth: 100,
    width: "100%",
  },
};

export class ExpenseByCategory extends Component {
  state = {
    graphData: [],
    barGrouping: "stacked",
    barLayout: "vertical",
  };
  onChange = (e) => {
    //console.log(e);
    this.setState({ [e.target.name]: e.target.value });
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
  }
  render() {
    const classes = this.props.classes;
    const expenseYears = this.getExpenseYears(this.props.expenses);
    const barGroup = this.state.barGrouping;
    const barLayout = this.state.barLayout;
    return (
      <div style={{ height: "500px", width: "100%" }}>
        <FormControl className={classes.formControl}>
          <ExpenseYearSelect years={expenseYears} />

          <Select
            labelId="barGroupingLabel"
            id="barGrouping"
            name="barGrouping"
            value={barGroup}
            onChange={this.onChange}
          >
            <MenuItem value={"stacked"}>Stacked</MenuItem>
            <MenuItem value={"grouped"}>Grouped</MenuItem>
          </Select>

          <Select
            labelId="barLayoutLabel"
            id="barLayout"
            name="barLayout"
            value={barLayout}
            onChange={this.onChange}
          >
            <MenuItem value={"vertical"}>Vertical</MenuItem>
            <MenuItem value={"horizontal"}>Horizontal</MenuItem>
          </Select>
        </FormControl>
        <ResponsiveBar
          groupMode={this.state.barGrouping}
          layout={this.state.barLayout}
          data={this.state.graphData}
          keys={[
            "auto",
            "rent",
            "electric",
            "gas",
            "insurance",
            "grocery",
            "other",
            "bills",
            "utilities",
            "credit card",
            "credit card principle",
            "transportation",
            "entertainment",
          ]}
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
            legend: "Expense Date",
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
  expenses: state.expenses.expenses,
  expenseSummaryYear: state.expenses.expenseSummaryYear,
});

export default connect(mapStateToProps, { getExpenses })(
  withStyles(styles)(ExpenseByCategory)
);
