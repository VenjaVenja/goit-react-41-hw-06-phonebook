import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const itemsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
  },
  reducers: {
    addContacts(state, action) {
      state.items.push(action.payload);
    },
    removeContacts(state, action) {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContacts(state, action) {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReduser = persistReducer(
  persistConfig,
  itemsSlice.reducer
);

export const { addContacts, removeContacts, filterContacts } =
  itemsSlice.actions;

export const getContacts = ({ contacts }) => contacts.items;

export const getFilter = ({ contacts }) => contacts.filter;
