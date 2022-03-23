import { Entry } from '../../interfaces';

import { EntriesState } from './';

type EntriesActionType =
  | { type: '[Entries] - Add Entries'; payload: Entry }
  | { type: '[Entries] - Entry Udpate'; payload: Entry };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case '[Entries] - Add Entries':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case '[Entries] - Entry Udpate':
      return {
        ...state,
        entries: state.entries.map(entries => {
          if (entries._id === action.payload._id) {
            entries.status = action.payload.status;
            entries.description = action.payload.description;
          }
          return entries;
        }),
      };
    default:
      return state;
  }
};
