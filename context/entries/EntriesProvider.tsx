import { FC, useReducer, useEffect } from 'react';

import { EntriesApi } from '../../api';
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

  const addEntries = async (description: string) => {
    const { data } = await EntriesApi.post<Entry>('/entries', { description });
    dispatch({ type: '[Entries] - Add Entries', payload: data });
  };

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await EntriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: '[Entries] - Entry Udpate', payload: data });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const refreshEntries = async () => {
    const { data } = await EntriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entries] - Refresh Data', payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

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
