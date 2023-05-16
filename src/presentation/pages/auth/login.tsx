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
  import { FC } from 'react';
  import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
  import { Link } from 'react-router-dom';
  import { literal, object, string, TypeOf } from 'zod';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { FormInput } from '../../components/auth/form-input';
  import styled from '@emotion/styled';
  
  export const LinkItem = styled(Link)`
    text-decoration: none;
    color: #3683dc;
    &:hover {
      text-decoration: underline;
      color: #5ea1b6;
    }
  `;
  
  export const OauthMuiLink = styled(MuiLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3683dc;
    border-radius: 1;
    padding: 0.6rem 0;
    column-gap: 1rem;
    text-decoration: none;
    color: #3683dc;
    font-weight: 500;
    cursor: pointer;
  
    &:hover {
      background-color: #fff;
      box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
    }
  `;
  
  const loginSchema = object({
    email: string().min(1, 'Digite um email.').email('O email é inválido.'),
    password: string()
      .min(1, 'Digite uma senha.')
      .min(8, 'A senha precisa ter mais que 8 caracteres.')
      .max(32, 'A senha precisa ter menos que 32 caracteres.'),
    persistUser: literal(true).optional(),
  });
  
  type ILogin = TypeOf<typeof loginSchema>;
  
  export const LoginPage: FC = () => {
    const defaultValues: ILogin = {
      email: '',
      password: '',
    };
  
    const methods = useForm<ILogin>({
      resolver: zodResolver(loginSchema),
      defaultValues,
    });
  
    const onSubmitHandler: SubmitHandler<ILogin> = (values: ILogin) => {
      console.log(values);
    };
  
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
                      onSubmit={methods.handleSubmit(onSubmitHandler)}
                    >
                      <Typography
                        variant='h6'
                        component='h1'
                        sx={{ textAlign: 'center', mb: '1.5rem' }}
                      >
                        Acesse sua conta
                      </Typography>
  
                      <FormInput
                        label='Email'
                        type='email'
                        name='email'
                        focused
                        required
                      />
                      <FormInput
                        label='Senha'
                        type='password'
                        name='password'
                        required
                        focused
                      />
  
                      <FormControlLabel
                        control={
                          <Checkbox
                            size='small'
                            aria-label='trust this device checkbox'
                            required
                            {...methods.register('persistUser')}
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
  
                      <LoadingButton
                        loading={false}
                        type='submit'
                        variant='contained'
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
  