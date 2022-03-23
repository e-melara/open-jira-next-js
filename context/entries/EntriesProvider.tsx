import { FC, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesApi } from "../../api";
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addEntries = (description: string) => {
    const newEntries: Entry = {
      _id: uuidv4(),
      status: 'pending',
      createdAt: Date.now(),
      description: description,
    };
    dispatch({ type: '[Entries] - Add Entries', payload: newEntries });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entries] - Entry Udpate', payload: entry });
  };

  const refreshEntries = async () => {
    const {data} = await EntriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entries] - Refresh Data', payload: data });
  }

  useEffect(() => {
    refreshEntries();
  }, [])

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // methods
        addEntries,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
