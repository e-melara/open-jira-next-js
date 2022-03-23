import { Button, TextField } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { EntriesContext } from '../../../context/entries';
import { UIContext } from '../../../context/UI';

export const NewEntry = () => {
  const { addEntries } = useContext(EntriesContext);
  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

  const [touched, isTouched] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue('');
    isTouched(false);
  }, [isAddingEntry]);

  const onTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const save = () => {
    if (!inputValue.trim()) return;
    addEntries(inputValue);
    setIsAddingEntry(false);
  };
  return (
    <Box
      sx={{
        marginBottom: 2,
        paddingX: 2,
      }}
    >
      {isAddingEntry && (
        <>
          <TextField
            fullWidth
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
            placeholder='Nueva Entrada'
            autoFocus
            multiline
            label='Nueva entrada'
            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
            error={inputValue.length <= 0 && touched}
            onChange={onTextChanged}
            onBlur={() => isTouched(true)}
          />
          <Box display={'flex'} justifyContent='space-between'>
            <Button variant='text' onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={save}
              endIcon={<SaveOutlinedIcon />}
            >
              Guardar
            </Button>
          </Box>
        </>
      )}
      {!isAddingEntry && (
        <Button
          onClick={() => setIsAddingEntry(true)}
          startIcon={<AddIcon />}
          fullWidth
          variant='outlined'
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
