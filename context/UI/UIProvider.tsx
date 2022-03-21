import { FC, useReducer } from "react"
import { UIContext } from "./UIContext"

import { uiReducer } from "./UIReducer"

export interface UIState {
  sidemenuOpen: boolean
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false
}

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  return (
    <UIContext.Provider value={{
      sidemenuOpen: false
    }}>
    {children}
    </UIContext.Provider>
  )
}
