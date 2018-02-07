import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as ACTION_TYPES from '../constants/actions';

const initialState = {
  rows: []
};

const ServicesReducer = handleActions(
  {
    [ACTION_TYPES.SERVICE_ITEM_ADD]: (state, action) =>
      Object.assign({}, state, {
        rows: [...state.rows, action.payload],
      }),
    [ACTION_TYPES.SERVICE_ITEM_REMOVE]: (state, action) =>
      Object.assign({}, state, {
        rows: state.rows.filter(item => item.id !== action.payload),
      }),
    [ACTION_TYPES.SERVICE_ITEM_UPDATE]: (state, action) =>
      Object.assign({}, state, {
        rows: state.rows.map(
          item => (item.id !== action.payload.id ? item : action.payload)
        ),
      }),
    [ACTION_TYPES.SERVICE_ITEM_MOVE]: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragRow = state.rows[dragIndex];
      const newRows = state.rows;
      newRows.splice(dragIndex, 1);
      newRows.splice(hoverIndex, 0, dragRow);
      return Object.assign({}, state, {
        rows: newRows,
      });
    }
  },
  initialState
);

export default ServicesReducer;

// Selector
const getServicesState = state => state.services;
export const getRows = createSelector(
  getServicesState,
  servicesState => servicesState.rows
);
