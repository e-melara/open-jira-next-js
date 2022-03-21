import { List, Paper } from "@mui/material"
import { FC, useContext, useMemo } from "react"

import { EntryCard } from "./EntryCard"
import { EntryStatus } from "../../../interfaces"
import { EntriesContext } from "../../../context/entries"

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext)
  const entryFilters = useMemo(() => entries.filter((item) => item.status === status), [entries])

  return (
    <div>
      <Paper sx={{
        height: 'calc(100vh - 250px)',
        overflow: 'scroll',
        backgroundColor: 'transparent',
        padding: '3px 5px'
      }}>
        <List sx={{ opacity: 1 }} >
          {
            entryFilters.map(function(item) {
              return (
                <EntryCard key={item._id} entry={item} />
              )
            })
          }
        </List>
      </Paper>
    </div >
  )
}
