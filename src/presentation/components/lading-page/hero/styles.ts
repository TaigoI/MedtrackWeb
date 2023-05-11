import { Box, Grid, Typography } from '@mui/material';
import styled from 'styled-components'

export const LargeImg = styled.img`
  height: 100%;
  width: 100%;
`;

export const HeroBox = styled(Box).attrs({
  sx: {
    width: '100%',
    display: 'flex',
    minHeight: '600px',
    alignItems: 'center',
    justifyContent: 'center',
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

export const Title = styled(Typography).attrs({
  variant: 'h3',
  sx: {
    paddingBottom: '15px',
  }
})``;

export const Subtitle = styled(Typography).attrs({
  variant: 'h6',
  sx: {
    opacity: '0.4',
    paddingBottom: '30px',
  }
})``;
