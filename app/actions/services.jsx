import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

// Create a new Service
export const createService = createAction(ACTION_TYPES.SERVICE_ITEM_ADD);

// Save a Service
export const saveService = createAction(
  ACTION_TYPES.SERVICE_SAVE,
  serviceData => serviceData
);

// Update a Service
export const updateService = createAction(
  ACTION_TYPES.SERVICE_ITEM_UPDATE,
  serviceData => serviceData
);

// Delete a service
export const deleteService = createAction(
  ACTION_TYPES.SERVICE_ITEM_REMOVE,
  serviceID => serviceID
);

export const moveRow = createAction(
  ACTION_TYPES.SERVICE_ITEM_MOVE,
  (dragIndex, hoverIndex) => ({ dragIndex, hoverIndex })
);
