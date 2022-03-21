import { FC, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'

export interface EntriesState {
  entries: Entry[]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [{
    _id: uuidv4(),
    status: 'pending',
    createdAt: Date.now(),
    description: 'Pendientes: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has'
  }, {
    _id: uuidv4(),
    status: 'in-progress',
    createdAt: Date.now() - 1000000,
    description: 'Progress: It is a long established fact that a reader will be distracted by the readable content of a page'
  }, {
    _id: uuidv4(),
    status: 'finished',
    createdAt: Date.now() - 1000,
    description: 'Finished: Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical'
  }]
}

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

  return (
    <EntriesContext.Provider value={{
      ...state
    }}>
      {children}
    </EntriesContext.Provider>
  )
}
