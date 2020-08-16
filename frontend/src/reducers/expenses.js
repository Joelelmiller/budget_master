import {
  GET_EXPENSES,
  DELETE_EXPENSE,
  ADD_EXPENSE,
  EDITING_EXPENSE,
  UPDATING_EXPENSE_SUCCESS,
  UPDATING_EXPENSE_CANCELLED,
  DELETING_EXPENSE,
  DELETING_EXPENSE_CANCELLED,
  SET_EXPENSE_SUMMARY_YEAR,
} from "../actions/types.js";

const initalState = {
  expenses: [],
  isUpdating: false,
  expenseSummaryYear: "",
};

const updatingObject = (id, expenses, obj) => {
  const remainingRecords = expenses.filter((expense) => expense.id !== id);
  const updatedExpenses = [...remainingRecords, obj];

  updatedExpenses.sort((a, b) => {
    return a.id - b.id;
  });

  return updatedExpenses;
};

const updatingStatus = (id, expenses, param, val) => {
  const filteredRecord = expenses.filter((expense) => expense.id == id);
  filteredRecord["0"][param] = val;

  const remainingRecords = expenses.filter((expense) => expense.id !== id);
  const updatedExpenses = [...remainingRecords, ...filteredRecord];

  updatedExpenses.sort((a, b) => {
    return a.id - b.id;
  });

  return updatedExpenses;
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
        isDeleting: false,
      };
    case DELETING_EXPENSE:
      const deleteRecords = updatingStatus(
        action.payload,
        state.expenses,
        "isDeletingRecord",
        true
      );
      return {
        ...state,
        expenses: deleteRecords,
        isDeleting: true,
      };
    case DELETING_EXPENSE_CANCELLED:
      const cancelDeleteRecords = updatingStatus(
        action.payload,
        state.expenses,
        "isDeletingRecord",
        false
      );
      return {
        ...state,
        expenses: cancelDeleteRecords,
        isDeleting: false,
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case EDITING_EXPENSE:
      const editRecords = updatingStatus(
        action.payload,
        state.expenses,
        "isUpdatingRecord",
        true
      );

      return {
        ...state,
        expenses: editRecords,
        isUpdating: true,
      };
    case UPDATING_EXPENSE_SUCCESS:
      const newRecords = updatingObject(
        action.payload.id,
        state.expenses,
        action.payload
      );
      return {
        ...state,
        expenses: newRecords,
        isUpdating: false,
      };
    case UPDATING_EXPENSE_CANCELLED:
      const cancelledRecords = updatingStatus(
        action.payload,
        state.expenses,
        "isUpdatingRecord",
        false
      );
      return {
        ...state,
        expenses: cancelledRecords,
        isUpdating: false,
      };

    default:
      return state;
  }
}
