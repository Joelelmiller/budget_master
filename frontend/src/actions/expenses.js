import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_EXPENSES,
  DELETE_EXPENSE,
  ADD_EXPENSE,
  EDITING_EXPENSE,
  UPDATING_EXPENSE_SUCCESS,
  UPDATING_EXPENSE_CANCELLED,
  DELETING_EXPENSE,
  DELETING_EXPENSE_CANCELLED,
  GET_EXPENSE_CATEGORIES,
} from "./types";

// GET EXPENSES
export const getExpenses = () => (dispatch, getState) => {
  axios
    .get("/api/expenses/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_EXPENSES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE EXPENSE
export const deleteExpense = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/expenses/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteExpense: "Expense Deleted" }));
      dispatch({
        type: DELETE_EXPENSE,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD EXPENSE
export const addExpense = (expense) => (dispatch, getState) => {
  axios
    .post("/api/expenses/", expense, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addExpense: "Expense Added" }));
      dispatch({
        type: ADD_EXPENSE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// EDIT EXPENSE
export const editExpense = (id) => (dispatch, getState) => {
  dispatch({
    type: EDITING_EXPENSE,
    payload: id,
  });
};

//UPDATE EXPENSE
export const updateExpense = (id, expense) => (dispatch, getState) => {
  //expense.expense_date = expense.expense_date + "T00:00";
  axios
    .put(`/api/expenses/${id}/`, expense, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateExpense: "Expense Updated" }));
      dispatch({
        type: UPDATING_EXPENSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const cancelEdit = (id) => (dispatch) => {
  dispatch({
    type: UPDATING_EXPENSE_CANCELLED,
    payload: id,
  });
};

//DELETING EXPENSE
export const deletingExpense = (id) => (dispatch) => {
  dispatch({
    type: DELETING_EXPENSE,
    payload: id,
  });
};

//DELETING_EXPENSE_CANCELLED
export const cancelDelete = (id) => (dispatch) => {
  dispatch({
    type: DELETING_EXPENSE_CANCELLED,
    payload: id,
  });
};

// GET_EXPENSE_CATEGORIES
export const getExpenseCategories = (categories) => (dispatch) => {
  dispatch({
    type: GET_EXPENSE_CATEGORIES,
    payload: categories,
  });
};
