import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
} from '@mui/material';

const classes = {
    formContainer: {
        flexGrow: 1,
        padding: '10px',
        maxWidth: '700px',
        margin: '30px auto',
        // [theme.breakpoints.between('xs', 'sm')]: {
        //   width: '100%',
        // },
      },
      form: {
        marginTop: '30px',
      },
      formHeading: {
        textAlign: 'center',
      },
      inputField: {
        marginBottom: '20px !important',
      },
      textArea: {
        width: '100%',
        marginBottom: '20px',
        fontSize: '16px',
        padding: '10px',
      },
}

export const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = (e:any) => {
    e.preventDefault();
    console.log({ email, firstName, subject, message });
  };

  return (
    <Box sx={classes.formContainer}>
      <Typography variant="h4" sx={classes.formHeading}>
        Contact Us
      </Typography>
      <Box
        sx={classes.form}
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          sx={classes.inputField}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={classes.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Subject"
          variant="outlined"
          fullWidth
          sx={classes.inputField}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <TextareaAutosize
          aria-label="minimum height"
          minRows={6}
          placeholder="Enter a message"
        //   sx={classes.textArea}
          spellCheck
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{ width: '200px', fontSize: '16px' }}
          onClick={submitForm}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
