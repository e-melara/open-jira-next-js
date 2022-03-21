import MenuOutlined from '@mui/icons-material/MenuOutlined'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

export const NavBar = () => {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton>
          <MenuOutlined />
        </IconButton>
        <Typography variant='h6'>
          OpenJira
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
