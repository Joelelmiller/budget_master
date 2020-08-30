import {
  GET_INCOMES,
  DELETE_INCOME,
  ADD_INCOME,
  EDITING_INCOME,
  UPDATING_INCOME_SUCCESS,
  UPDATING_INCOME_CANCELLED,
  DELETING_INCOME,
  DELETING_INCOME_CANCELLED,
  SET_INCOME_SUMMARY_YEAR,
  GET_INCOME_CATEGORIES,
} from "../actions/types.js";

const initalState = {
  incomes: [],
  isUpdating: false,
  incomeSummaryYear: "",
  categories: [],
};

const updatingObject = (id, incomes, obj) => {
  const remainingRecords = incomes.filter((income) => income.id !== id);
  const updatedIncomes = [...remainingRecords, obj];

  updatedIncomes.sort((a, b) => {
    return a.id - b.id;
  });

  return updatedIncomes;
};

const updatingStatus = (id, incomes, param, val) => {
  const filteredRecord = incomes.filter((income) => income.id == id);
  filteredRecord["0"][param] = val;

  const remainingRecords = incomes.filter((income) => income.id !== id);
  const updatedIncomes = [...remainingRecords, ...filteredRecord];

  updatedIncomes.sort((a, b) => {
    return a.id - b.id;
  });

  return updatedIncomes;
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_INCOMES:
      return {
        ...state,
        incomes: action.payload,
      };
    case DELETE_INCOME:
      return {
        ...state,
        incomes: state.incomes.filter((income) => income.id !== action.payload),
        isDeleting: false,
      };
    case DELETING_INCOME:
      const deleteRecords = updatingStatus(
        action.payload,
        state.incomes,
        "isDeletingRecord",
        true
      );
      return {
        ...state,
        incomes: deleteRecords,
        isDeleting: true,
      };
    case DELETING_INCOME_CANCELLED:
      const cancelDeleteRecords = updatingStatus(
        action.payload,
        state.incomes,
        "isDeletingRecord",
        false
      );
      return {
        ...state,
        incomes: cancelDeleteRecords,
        isDeleting: false,
      };
    case ADD_INCOME:
      return {
        ...state,
        incomes: [...state.incomes, action.payload],
      };

    case EDITING_INCOME:
      const editRecords = updatingStatus(
        action.payload,
        state.incomes,
        "isUpdatingRecord",
        true
      );

      return {
        ...state,
        incomes: editRecords,
        isUpdating: true,
      };
    case UPDATING_INCOME_SUCCESS:
      const newRecords = updatingObject(
        action.payload.id,
        state.incomes,
        action.payload
      );
      return {
        ...state,
        incomes: newRecords,
        isUpdating: false,
      };
    case UPDATING_INCOME_CANCELLED:
      const cancelledRecords = updatingStatus(
        action.payload,
        state.incomes,
        "isUpdatingRecord",
        false
      );
      return {
        ...state,
        incomes: cancelledRecords,
        isUpdating: false,
      };
    case GET_INCOME_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
}
