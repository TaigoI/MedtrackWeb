import { Box, Grid, Typography } from '@mui/material';
import styled from 'styled-components'

export const LargeImg = styled.img`
  height: 100%;
  width: 100%;
`;

export const AboutUsContainer = styled(Box).attrs({
  sx: {
    width: '100%',
    display: 'flex',
    minHeight: '400px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '30px 0px 50px 0px',
  }
})``;

export const Title = styled(Typography).attrs({
  sx: {
    paddingBottom: '15px',
  }
})``;


export const Subtitle = styled(Typography).attrs({
  sx: {
    opacity: '0.7',
    paddingBottom: '30px',
    fontSize: '18px',
  }
})``;

export const GridContainer = styled(Grid).attrs({
  container: true,
  sx: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1300px',
    padding: '50px',
  }
})``;