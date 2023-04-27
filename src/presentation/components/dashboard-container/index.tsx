import React, { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SidebarComponent } from '../side-bar';
import { DRAWER_WIDTH } from '../../../shared/constants';
import { Avatar } from '@mui/material';

interface Props {
  children: ReactNode;
  appBar: {
    title: string;
    image?: string;
  }
}

export const DashboardContainerComponent: React.FC<Props> = ({ children, appBar: { title, image } }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {
            image && <Avatar src={image} alt="Foto do usuário" style={{marginRight: '.8rem'}} />
          }
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <SidebarComponent  handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen}/>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}
      >
        {children}
      </Box>
    </Box>
  );
};
