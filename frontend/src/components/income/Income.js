import React, { Component, Fragment, forwardRef, useEffect } from "react";
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
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getIncomes,
  deleteIncome,
  editIncome,
  updateIncome,
  cancelEdit,
  deletingIncome,
  cancelDelete,
} from "../../actions/incomes";

export function Incomes(props) {
  const matches = useMediaQuery("(min-width:600px)");
  useEffect(() => props.getIncomes(), []);
  const mobileColumns = [
    { title: "Name", field: "name" },
    {
      title: "Category",
      field: "category",
      hidden: true,
      hiddenByColumnsButton: true,
    },
    {
      title: "Date",
      field: "income_date",
      type: "date",
      hidden: true,
      hiddenByColumnsButton: true,
    },
    { title: "Amount", field: "amount", type: "numeric" },
    {
      title: "Owner",
      field: "income_owner",
      hidden: true,
      hiddenByColumnsButton: true,
    },
    {
      title: "Desrciption",
      field: "description",
      hidden: true,
      hiddenByColumnsButton: true,
    },
  ];
  const desktopColumns = [
    { title: "Name", field: "name" },
    {
      title: "Category",
      field: "category",
    },
    {
      title: "Date",
      field: "income_date",
      type: "date",
    },
    { title: "Amount", field: "amount", type: "numeric" },
    {
      title: "Owner",
      field: "income_owner",
    },
    {
      title: "Desrciption",
      field: "description",
    },
  ];
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  return (
    <div style={{ maxWidth: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Manage Incomes
      </Typography>
      <MaterialTable
        columns={matches ? desktopColumns : mobileColumns}
        data={props.incomes}
        title="Incomes"
        options={{
          filtering: true,
          columnsButton: true,
          pageSize: 10,
          pageSizeOptions: [10, 25, 50],
          searchFieldAlignment: "left",
          showTitle: false,
        }}
        icons={tableIcons}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...props.incomes];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                //console.log(newData);
                props.updateIncome(newData.id, newData);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...props.incomes];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                //console.log(oldData.id);
                props.deleteIncome(oldData.id);

                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
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
