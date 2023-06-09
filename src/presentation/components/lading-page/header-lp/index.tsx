import {
  AppBar,
  Typography,
  Link,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Drawer,
} from '@mui/material';
import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styles, LogoImg } from './styles';
import MedtrackLogo from '../../../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const ElevationScroll = (props:any) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

interface ILink {
  id: number;
  route: string;
  url: string;
}

export const LandingPageHeader = (props: any) => {

  const links: ILink[] = [
    { id: 1, route: 'Criar conta', url: '/signup' },
    { id: 2, route: 'Entrar', url: '/login' },
  ];

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor:any, open:any) => (event:any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor:any) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {links.map((link) => (
          <ListItem button key={link.id}>
            <ListItemText primary={link.route} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate()

  return (
    <Box sx={{ marginBottom: '70px' }}>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar sx={styles.toolBar}>
            <Link href="#" underline="none">
              <LogoImg src={MedtrackLogo} alt="Logo Medtrack"/>
            </Link>

            {matches ? (
              <Box>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer('right', true)}
              >
                <MenuIcon sx={styles.menuIcon} fontSize="inherit" />
              </IconButton>

              <Drawer
                anchor="right"
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                {list('right')}
              </Drawer>
            </Box>
            ): <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexGrow: '0.1',
              }}
            >
              {links.map((link) => (
                <Link onClick={() => navigate(link.url)} style={{cursor: 'pointer'}} underline="none" key={link.id}>
                  <Typography sx={styles.link}>{link.route}</Typography>
                </Link>
              ))}
            </Box>}
           
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};
