import MenuOutlined from '@mui/icons-material/MenuOutlined';

import { useContext } from 'react';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';

import { UIContext } from '../../context/UI';
import NextLink from 'next/link';

export const NavBar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton onClick={() => openSideMenu()}>
          <MenuOutlined />
        </IconButton>
        <NextLink href='/' passHref>
          <Link underline='none' color='white'>
            <Typography variant='h6'>OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
