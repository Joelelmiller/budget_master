import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getExpenses,
  deleteExpense,
  editExpense,
  updateExpense,
  cancelEdit,
  deletingExpense,
  cancelDelete,
} from "../../actions/expenses";

export class Expenses extends Component {
  state = {
    name: "",
    description: "",
    expense_date: "",
    amount: 0,
    category: "",
    expense_owner: "",
  };
  static propTypes = {
    expenses: PropTypes.array.isRequired,
    getExpenses: PropTypes.func.isRequired,
    deleteExpense: PropTypes.func.isRequired,
    editExpense: PropTypes.func.isRequired,
    updateExpense: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deletingExpense: PropTypes.func.isRequired,
    cancelDelete: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const filteredRecord = this.props.expenses.filter(
        (expense) => expense.isUpdatingRecord == true
      );

      if (filteredRecord.length > 0) {
        const name = filteredRecord["0"].name;
        const description = filteredRecord["0"].description;
        const expense_date = filteredRecord["0"].expense_date;
        const amount = filteredRecord["0"].amount;
        const category = filteredRecord["0"].category;
        const expense_owner = filteredRecord["0"].expense_owner;

        this.setState({
          name: name,
          description: description,
          expense_date: expense_date,
          amount: amount,
          category: category,
          expense_owner: expense_owner,
        });
      }
    }
  }
  componentDidMount() {
    this.props.getExpenses();
  }

  onSave = (expenses) => {
    const {
      name,
      description,
      expense_date,
      amount,
      category,
      expense_owner,
    } = this.state;

    const expense = {
      name,
      description,
      expense_date,
      amount,
      category,
      expense_owner,
    };
    //console.log(expense);
    this.props.updateExpense(expenses.id, expense);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    const renderTableRow = (expenses) => {
      if (expenses.isUpdatingRecord == true) {
        return (
          <Fragment>
            <td>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={expenses.name}
                  onChange={this.onChange}
                />
              </div>
            </td>
            <td>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={expenses.category}
                  onChange={this.onChange}
                />
              </div>
            </td>
            <td>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="text"
                  name="expense_date"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={expenses.expense_date}
                  onChange={this.onChange}
                />
              </div>
            </td>

            <td>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="text"
                  name="amount"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={expenses.amount}
                  onChange={this.onChange}
                />
              </div>
            </td>
            <td>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="text"
                  name="expense_owner"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={expenses.expense_owner}
                  onChange={this.onChange}
                />
              </div>
            </td>
            <td>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={expenses.description}
                  onChange={this.onChange}
                />
              </div>
            </td>

            <td>
              <button
                onClick={() => this.onSave(expenses)}
                //onClick={() => console.log("hoogaaboo")}
                className="btn btn-outline-success btn-sm"
              >
                Save
              </button>
            </td>
            <td>
              <button
                onClick={this.props.cancelEdit.bind(this, expenses.id)}
                className="btn btn-outline-danger btn-sm"
              >
                Cancel
              </button>
            </td>
          </Fragment>
        );
      } else if (expenses.isDeletingRecord == true) {
        return (
          <Fragment>
            <td>{expenses.name}</td>
            <td>{expenses.category}</td>
            <td>{expenses.expense_date}</td>
            <td>{expenses.amount}</td>
            <td>{expenses.expense_owner}</td>
            <td>{expenses.description}</td>

            <td>
              <button
                onClick={this.props.deleteExpense.bind(this, expenses.id)}
                className="btn btn-outline-success btn-sm"
              >
                Yes
              </button>
            </td>
            <td>
              <button
                onClick={this.props.cancelDelete.bind(this, expenses.id)}
                className="btn btn-outline-danger btn-sm"
              >
                Cancel
              </button>
            </td>
          </Fragment>
        );
      } else if (
        this.props.isDeleting == true ||
        this.props.isUpdating == true
      ) {
        return (
          <Fragment>
            <td>{expenses.name}</td>
            <td>{expenses.category}</td>
            <td>{expenses.expense_date}</td>
            <td>{expenses.amount}</td>
            <td>{expenses.expense_owner}</td>
            <td>{expenses.description}</td>
            <td>
              <button
                onClick={this.props.editExpense.bind(this, expenses.id)}
                className="btn btn-outline-primary btn-sm"
                disabled={true}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                onClick={this.props.deletingExpense.bind(this, expenses.id)}
                className="btn btn-outline-danger btn-sm"
                disabled={true}
              >
                Delete
              </button>
            </td>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <td>{expenses.name}</td>
            <td>{expenses.category}</td>
            <td>{expenses.expense_date}</td>
            <td>{expenses.amount}</td>
            <td>{expenses.expense_owner}</td>
            <td>{expenses.description}</td>
            <td>
              <button
                onClick={this.props.editExpense.bind(this, expenses.id)}
                className="btn btn-outline-primary btn-sm"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                //onClick={this.props.deleteExpense.bind(this, expenses.id)}
                onClick={this.props.deletingExpense.bind(this, expenses.id)}
                className="btn btn-outline-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </Fragment>
        );
      }
    };
    return (
      <Fragment>
        <h2>Expenses</h2>
        <div style={{ height: "200px" }} className="overflow-auto">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Owner</th>
                <th>Description</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {this.props.expenses.map((expenses) => (
                <tr key={expenses.id}>{renderTableRow(expenses)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

//maps redux state from reducers to props
const mapStateToProps = (state) => ({
  expenses: state.expenses.expenses,
  isUpdating: state.expenses.isUpdating,
  isDeleting: state.expenses.isDeleting,
});

export default connect(mapStateToProps, {
  getExpenses,
  deleteExpense,
  editExpense,
  updateExpense,
  cancelEdit,
  deletingExpense,
  cancelDelete,
})(Expenses);
