import MenuOutlined from '@mui/icons-material/MenuOutlined'

import { useContext } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

import { UIContext } from '../../context/UI'

export const NavBar = () => {
  const { openSideMenu } = useContext(UIContext)

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton onClick={() => openSideMenu()}>
          <MenuOutlined />
        </IconButton>
        <Typography variant='h6'>
          OpenJira
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
