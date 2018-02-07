import { combineReducers } from 'redux';
import UIReducer from './UIReducer';
import FormReducer from './FormReducer';
import InvoicesReducer from './InvoicesReducer';
import ContactsReducer from './ContactsReducer';
import SettingsReducer from './SettingsReducer';
import ServicesReducer from './ServicesReducer';

export default combineReducers({
  ui: UIReducer,
  form: FormReducer,
  invoices: InvoicesReducer,
  contacts: ContactsReducer,
  services: ServicesReducer,
  settings: SettingsReducer,
});
