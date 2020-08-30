import {
  SET_BAR_LAYOUT,
  SET_BAR_GROUPING,
  SET_SUMMARY_YEAR,
  SET_BAR_CATEGORY,
} from "../actions/types.js";

const initalState = {
  barLayout: "vertical",
  barGrouping: "stacked",
  summaryYear: "",
  categories: [],
};

export default function (state = initalState, action) {
  switch (action.type) {
    case SET_BAR_LAYOUT:
      return {
        ...state,
        barLayout: action.payload,
      };
    case SET_BAR_GROUPING:
      return {
        ...state,
        barGrouping: action.payload,
      };

    case SET_SUMMARY_YEAR:
      return {
        ...state,
        summaryYear: action.payload,
      };
    case SET_BAR_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
}
