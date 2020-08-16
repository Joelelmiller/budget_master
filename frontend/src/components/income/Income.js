import React, { Component, Fragment, forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import Save from "@material-ui/icons/Save";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getIncomes, deleteIncome, updateIncome } from "../../actions/incomes";

export class Incomes extends Component {
  static propTypes = {
    incomes: PropTypes.array.isRequired,
    getIncomes: PropTypes.func.isRequired,
    deleteIncome: PropTypes.func.isRequired,
    updateIncome: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getIncomes();
  }
  render() {
    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => (
        <DeleteOutline {...props} ref={ref} />
      )),
      DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
      )),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
      )),
      ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
      )),
      ViewColumn: forwardRef((props, ref) => (
        <ViewColumn {...props} ref={ref} />
      )),
    };
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: "Name", field: "name" },
            { title: "Category", field: "category" },
            { title: "Date", field: "income_date", type: "date" },
            { title: "Amount", field: "amount", type: "numeric" },
            { title: "Owner", field: "income_owner" },
            { title: "Desrciption", field: "description" },
          ]}
          data={this.props.incomes}
          title="Incomes"
          options={{
            filtering: true,
          }}
          icons={tableIcons}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...this.props.incomes];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  //console.log(newData);
                  this.props.updateIncome(newData.id, newData);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...this.props.incomes];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  //console.log(oldData.id);
                  this.props.deleteIncome(oldData.id);

                  resolve();
                }, 1000);
              }),
          }}
        />
      </div>
    );
  }
}

//maps redux state from reducers to props
const mapStateToProps = (state) => ({
  incomes: state.incomes.incomes,
});

export default connect(mapStateToProps, {
  getIncomes,
  deleteIncome,
  updateIncome,
})(Incomes);
