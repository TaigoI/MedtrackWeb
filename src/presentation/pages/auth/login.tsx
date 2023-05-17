import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FC, useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../../components/auth/form-input';

import styled from '@emotion/styled';
import { useAuthentication } from '../../context/AuthenticationContext';
import { Cpf } from '../../../modules/authentication/entities/Cpf';
import { toast } from 'react-toastify';

export const LinkItem = styled(Link)`
  text-decoration: none;
  color: #3683dc;
  &:hover {
    text-decoration: underline;
    color: #5ea1b6;
  }
`;


const cpfSchema = string().refine((value) => /^\d{11}$/.test(value.replace(/\D+/, '')), {
    message: 'Invalid CPF format',
  }).transform((value) => {
    const maskedCPF = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return maskedCPF;
  })
const loginSchema = object({
  cpf: string(),
  password: string()
    .min(1, 'Digite uma senha.'),
  persistUser: literal(true).optional(),
});

type ILogin = TypeOf<typeof loginSchema>;

export const LoginPage: FC = () => {
  const defaultValues: ILogin = {
    cpf: '',
    password: '',
  };

  const methods = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const { authenticate } = useAuthentication();

  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<ILogin> = async (values: ILogin) => {
    try {
      const cpf = new Cpf(values.cpf)
      console.log(values, cpf.value);
      const _user = await authenticate({
        password: values.password,
        username: cpf.value.replace(/\D+/g, ''),
      }, !!values.persistUser);
      navigate('/app');

      toast.success(`Bem vindo, ${_user.name}!`, {
        theme: 'colored'
      }); 
    } catch (error) {
      toast.error('Dados inválidos! Tente novamente!', {
        theme: 'colored'
      }); 
    }
  };

  useEffect(() => {

    const cpfInput = document.getElementById('cpfInput');
  
    cpfInput?.addEventListener('input', (event: any) => {
      const input = event.target;
      let value = input?.value.replace(/\D/g, ''); // Remove non-digit characters
      console.log('Replace ['+ value+ ']')
  
      if (value.length > 11) {
        value = value.slice(0, 11); // Limit to 11 digits
      }
  
      const { success } = cpfSchema.safeParse(value);
      const maskedValue = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      methods.setValue('cpf', maskedValue)
      // if (success) {
      // } else {
      //   methods.setValue('cpf', value)
      //   // Handle validation error
      //   // console.log(error.message);
      // }
    });
  }, []);



  return (
    <Container
      maxWidth={false}
      sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#3683dc' } }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%', height: '100%' }}
      >
        <Grid
          item
          sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}
        >
          <FormProvider {...methods}>
            <Grid
              container
              sx={{
                boxShadow: { sm: '0 0 5px #ddd' },
                py: '6rem',
                px: '1rem',
              }}
            >
              <Grid
                item
                container
                justifyContent='space-between'
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: '45rem' },
                  marginInline: 'auto',
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ borderRight: { sm: '1px solid #ddd' } }}
                >
                  <Box
                    display='flex'
                    flexDirection='column'
                    component='form'
                    noValidate
                    autoComplete='off'
                    sx={{ paddingRight: { sm: '3rem' } }}
                  >
                    <Typography
                      variant='h6'
                      component='h1'
                      sx={{ textAlign: 'center', mb: '1.5rem' }}
                    >
                      Acesse sua conta
                    </Typography>

                    <Controller
                      control={methods.control}
                      name='cpf'
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormInput
                          label='CPF'
                          type='text'
                          name='cpf'
                          id="cpfInput"
                          focused
                          required
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <Controller
                      control={methods.control}
                      name='password'
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <FormInput
                          label='Senha'
                          onChange={onChange}
                          value={value}
                          type='password'
                          name='password'
                          required
                          focused
                        />
                      )}
                    />
                    
                    <Controller
                      control={methods.control}
                      name='persistUser'
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                size='small'
                                aria-label='trust this device checkbox'
                                required
                                name='persistUser'
                                onChange={onChange}
                                value={value}
                              />
                            }
                            label={
                              <Typography
                                variant='body2'
                                sx={{
                                  fontSize: '0.8rem',
                                  fontWeight: 400,
                                  color: '#5e5b5d',
                                }}
                              >
                                Mantenha-me conectado.
                              </Typography>
                            }
                          />
                      )}
                    />
                    

                    <LoadingButton
                      loading={false}
                      type='submit'
                      variant='contained'
                      onClick={methods.handleSubmit(onSubmitHandler)}
                      sx={{
                        py: '0.8rem',
                        mt: 2,
                        width: '80%',
                        marginInline: 'auto',
                      }}
                    >
                      Login
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
              <Grid container justifyContent='center'>
                <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                    Não possui conta?{' '}
                    <LinkItem to='/signup'>Cadastre-se</LinkItem>
                    .
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem' }}>
                    <LinkItem to='/forgotPassword'>Esqueceu sua senha?</LinkItem>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </FormProvider>
        </Grid>
      </Grid>
    </Container>
  );
};
