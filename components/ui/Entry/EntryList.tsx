import { List, Paper } from '@mui/material';
import { FC, useContext, useMemo, DragEvent } from 'react';

import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../../interfaces';
import { EntriesContext } from '../../../context/entries';
import { UIContext } from '../../../context/UI';

import styles from './Entry.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entryFilters = useMemo(
    () => entries.filter(item => item.status === status),
    [entries, status]
  );

  const onDropHandler = (event: DragEvent) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find(item => item._id === id)!;
    entry.status = status;

    updateEntry(entry);
    endDragging();
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const onDragEnd = () => {};

  return (
    <div
      onDrop={onDropHandler}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 250px)',
          overflow: 'scroll',
          backgroundColor: 'transparent',
          padding: '3px 5px',
        }}
      >
        <List
          sx={{
            opacity: isDragging ? 0.2 : 1,
            transition: 'all 0.5s ease-out',
          }}
        >
          {entryFilters.map(function (item) {
            return <EntryCard key={item._id} entry={item} />;
          })}
        </List>
      </Paper>
    </div>
  );
};
