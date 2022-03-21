import { useContext } from 'react'
import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'

import MailOutlineOutlined from '@mui/icons-material/MailOutlineOutlined'
import InboxOutlined from '@mui/icons-material/InboxOutlined'

import { UIContext } from '../../context/UI'

const menus: string[] = [
  'Inbox', 'Stared', 'Send Email', 'Drafts'
]

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext)
  return (
    <Drawer
      anchor='left'
      open={sidemenuOpen}
      onClose={() => closeSideMenu()}
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant='h6'>Menu</Typography>
        </Box>
        <List>
          {menus.map(function(text, index) {
            return (
              <ListItem button key={index}>
                <ListItemIcon>
                  {index % 2 === 0 ? <MailOutlineOutlined /> : <InboxOutlined />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
        </List>
        <Divider />
        <List>
          {menus.map(function(text, index) {
            return (
              <ListItem button key={index}>
                <ListItemIcon>
                  {index % 2 === 0 ? <MailOutlineOutlined /> : <InboxOutlined />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Drawer>
  )
}
