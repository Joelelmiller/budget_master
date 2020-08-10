import React, { Component, Fragment } from "react";
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

export class Incomes extends Component {
  state = {
    name: "",
    description: "",
    income_date: "",
    amount: 0,
    category: "",
    income_owner: "",
  };
  static propTypes = {
    incomes: PropTypes.array.isRequired,
    getIncomes: PropTypes.func.isRequired,
    deleteIncome: PropTypes.func.isRequired,
    editIncome: PropTypes.func.isRequired,
    updateIncome: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deletingIncome: PropTypes.func.isRequired,
    cancelDelete: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const filteredRecord = this.props.incomes.filter(
        (income) => income.isUpdatingRecord == true
      );

      if (filteredRecord.length > 0) {
        const name = filteredRecord["0"].name;
        const description = filteredRecord["0"].description;
        const income_date = filteredRecord["0"].income_date;
        const amount = filteredRecord["0"].amount;
        const category = filteredRecord["0"].category;
        const income_owner = filteredRecord["0"].income_owner;

        this.setState({
          name: name,
          description: description,
          income_date: income_date,
          amount: amount,
          category: category,
          income_owner: income_owner,
        });
      }
    }
  }
  componentDidMount() {
    this.props.getIncomes();
  }

  onSave = (incomes) => {
    const {
      name,
      description,
      income_date,
      amount,
      category,
      income_owner,
    } = this.state;

    const income = {
      name,
      description,
      income_date,
      amount,
      category,
      income_owner,
    };
    //console.log(income);
    this.props.updateIncome(incomes.id, income);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    const renderTableRow = (incomes) => {
      if (incomes.isUpdatingRecord == true) {
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
                  defaultValue={incomes.name}
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
                  defaultValue={incomes.category}
                  onChange={this.onChange}
                />
              </div>
            </td>
            <td>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="text"
                  name="income_date"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={incomes.income_date}
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
                  defaultValue={incomes.amount}
                  onChange={this.onChange}
                />
              </div>
            </td>
            <td>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="text"
                  name="income_owner"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={incomes.income_owner}
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
                  defaultValue={incomes.description}
                  onChange={this.onChange}
                />
              </div>
            </td>

            <td>
              <button
                onClick={() => this.onSave(incomes)}
                //onClick={() => console.log("hoogaaboo")}
                className="btn btn-outline-success btn-sm"
              >
                Save
              </button>
            </td>
            <td>
              <button
                onClick={this.props.cancelEdit.bind(this, incomes.id)}
                className="btn btn-outline-danger btn-sm"
              >
                Cancel
              </button>
            </td>
          </Fragment>
        );
      } else if (incomes.isDeletingRecord == true) {
        return (
          <Fragment>
            <td>{incomes.name}</td>
            <td>{incomes.category}</td>
            <td>{incomes.income_date}</td>
            <td>{incomes.amount}</td>
            <td>{incomes.income_owner}</td>
            <td>{incomes.description}</td>

            <td>
              <button
                onClick={this.props.deleteIncome.bind(this, incomes.id)}
                className="btn btn-outline-success btn-sm"
              >
                Yes
              </button>
            </td>
            <td>
              <button
                onClick={this.props.cancelDelete.bind(this, incomes.id)}
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
            <td>{incomes.name}</td>
            <td>{incomes.category}</td>
            <td>{incomes.income_date}</td>
            <td>{incomes.amount}</td>
            <td>{incomes.income_owner}</td>
            <td>{incomes.description}</td>
            <td>
              <button
                onClick={this.props.editIncome.bind(this, incomes.id)}
                className="btn btn-outline-primary btn-sm"
                disabled={true}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                onClick={this.props.deletingIncome.bind(this, incomes.id)}
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
            <td>{incomes.name}</td>
            <td>{incomes.category}</td>
            <td>{incomes.income_date}</td>
            <td>{incomes.amount}</td>
            <td>{incomes.income_owner}</td>
            <td>{incomes.description}</td>
            <td>
              <button
                onClick={this.props.editIncome.bind(this, incomes.id)}
                className="btn btn-outline-primary btn-sm"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                //onClick={this.props.deleteIncome.bind(this, incomes.id)}
                onClick={this.props.deletingIncome.bind(this, incomes.id)}
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
        <h2>Incomes</h2>
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
              {this.props.incomes.map((incomes) => (
                <tr key={incomes.id}>{renderTableRow(incomes)}</tr>
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
  incomes: state.incomes.incomes,
  isUpdating: state.incomes.isUpdating,
  isDeleting: state.incomes.isDeleting,
});

export default connect(mapStateToProps, {
  getIncomes,
  deleteIncome,
  editIncome,
  updateIncome,
  cancelEdit,
  deletingIncome,
  cancelDelete,
})(Incomes);
