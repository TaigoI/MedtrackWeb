import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import bestTeams from '../images/bestTeams.jpg';

const classes = {
    aboutUsContainer: {
        width: '100%',
        display: 'flex',
        minHeight: '400px',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '30px 0px 50px 0px',
      },
      aboutUsSubtitle: {
        opacity: '0.7',
        paddingBottom: '30px',
        fontSize: '18px',
      },
      largeImage: {
        width: '100%',
      },
      gridContainer: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: '1300px',
        padding: '50px',
      },
      title: {
        paddingBottom: '15px',
      },
  
}

export const AboutUs = () => {

  return (
    <Box sx={classes.aboutUsContainer}>
      <Grid container spacing={6} sx={classes.gridContainer}>
        <Grid item xs={12} md={5}>
          {/* <img src={bestTeams} alt="My Team" className={classes.largeImage} /> */}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={700} sx={classes.title}>
            We build, We revive
          </Typography>
          <Typography sx={classes.aboutUsSubtitle}>
            Your business needs to be in safe hands at all times. We ensure you
            never run out of customers and not run at loss. We are trusted by
            over 500+ companies to deliver quality marketing campaigns using
            Digital marketing & Offline marketing channels.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            CONTACT US
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
