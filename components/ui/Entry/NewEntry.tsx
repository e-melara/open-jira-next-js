import { Button, TextField } from "@mui/material"

import { Box } from '@mui/material'
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

export const NewEntry = () => {
  return (
    <Box sx={{
      marginBottom: 2, paddingX: 2
    }}>
      <Button
        startIcon={<AddIcon />}
        fullWidth
        variant='outlined'
      >
        Agregar Tarea
      </Button>
      <TextField
        fullWidth
        sx={{
          marginTop: 2,
          marginBottom: 2
        }}
        placeholder='Nueva Entrada'
        autoFocus
        multiline
        label='Nueva entrada'
        helperText='Ingrese un valor'
      />
      <Box display={'flex'} justifyContent='space-between'>
        <Button variant='text'>
          Cancelar
        </Button>
        <Button variant='outlined' color='secondary' endIcon={<SaveOutlinedIcon />}>
          Guardar
        </Button>
      </Box>
    </Box>
  )
}
