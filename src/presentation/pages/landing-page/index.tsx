import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { LandingPageHeader } from '../../components/lading-page/header-lp';
import { Footer } from '../../components/lading-page/footer';
import { Hero } from '../../components/lading-page/hero';
import { Section } from '../../components/lading-page/section';
import { AboutUs } from '../../components/lading-page/about-us';
import { Testimonial } from '../../components/lading-page/testimonial';
import { ContactUs } from '../../components/lading-page/contact-us';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif'
    ].join(',')
  }
});

export const LandingPage: React.FC = () => (
  <ThemeProvider theme={theme}>
      <LandingPageHeader />
      <Hero />
      <Section />
      <AboutUs />
      {/* <Testimonial />
      <ContactUs /> */}
      <Footer />
  </ThemeProvider>
);
