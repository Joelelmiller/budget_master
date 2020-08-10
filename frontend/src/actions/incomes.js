import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_INCOMES,
  DELETE_INCOME,
  ADD_INCOME,
  EDITING_INCOME,
  UPDATING_INCOME_SUCCESS,
  UPDATING_INCOME_CANCELLED,
  DELETING_INCOME,
  DELETING_INCOME_CANCELLED,
} from "./types";

// GET INCOMES
export const getIncomes = () => (dispatch, getState) => {
  axios
    .get("/api/incomes/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_INCOMES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE INCOME
export const deleteIncome = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/incomes/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteIncome: "Income Deleted" }));
      dispatch({
        type: DELETE_INCOME,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD INCOME
export const addIncome = (income) => (dispatch, getState) => {
  axios
    .post("/api/incomes/", income, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addIncome: "Income Added" }));
      dispatch({
        type: ADD_INCOME,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// EDIT INCOME
export const editIncome = (id) => (dispatch, getState) => {
  dispatch({
    type: EDITING_INCOME,
    payload: id,
  });
};

//UPDATE INCOME
export const updateIncome = (id, income) => (dispatch, getState) => {
  //income.income_date = income.income_date + "T00:00";
  axios
    .put(`/api/incomes/${id}/`, income, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateIncome: "Income Updated" }));
      dispatch({
        type: UPDATING_INCOME_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const cancelEdit = (id) => (dispatch) => {
  dispatch({
    type: UPDATING_INCOME_CANCELLED,
    payload: id,
  });
};

//DELETING INCOME
export const deletingIncome = (id) => (dispatch) => {
  dispatch({
    type: DELETING_INCOME,
    payload: id,
  });
};

//DELETING_INCOME_CANCELLED
export const cancelDelete = (id) => (dispatch) => {
  dispatch({
    type: DELETING_INCOME_CANCELLED,
    payload: id,
  });
};
