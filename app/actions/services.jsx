import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

// Get All Services
export const getServices = createAction(ACTION_TYPES.SERVICE_GET_ALL);

// Create a new Service
export const createService = createAction(
  ACTION_TYPES.SERVICE_CREATE,
  service => service
);

// Save a Service
export const saveService = createAction(
  ACTION_TYPES.SERVICE_SAVE,
  serviceData => serviceData
);

// Edit a Service
export const editService = createAction(
  ACTION_TYPES.SERVICE_EDIT,
  serviceData => serviceData
);

// Update a Service
export const updateService = createAction(
  ACTION_TYPES.SERVICE_UPDATE,
  (serviceID, data) => ({ serviceID, data })
);

// Delete a service
export const deleteService = createAction(
  ACTION_TYPES.SERVICE_UPDATE,
  serviceID => serviceID
);
