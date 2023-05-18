import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { sidebarItems } from './data';
import { LogoutOutlined } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { DRAWER_WIDTH } from '../../../shared/constants';
import AppLogo from '../../../assets/images/logo-transparent.png';
import styles from './styles.module.css';
import { useAuthentication } from '../../context/AuthenticationContext';

interface Props {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export const SidebarComponent: React.FC<Props> = ({mobileOpen, handleDrawerToggle}) => {

  const {logout} = useAuthentication();
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const drawer = (
    <div>
      <div className={styles.drawerImageContainer}>
        <img 
          src={AppLogo} 
          className={styles.drawerImage}
          alt="Logo do site"
        />
      </div>
      <Divider />
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton 
              selected={pathname === item.path} 
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem key={'Sair'} disablePadding>
          <ListItemButton onClick={() => logout(navigate)}>
            <ListItemIcon>
              <LogoutOutlined />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window.document.body : undefined;
  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}