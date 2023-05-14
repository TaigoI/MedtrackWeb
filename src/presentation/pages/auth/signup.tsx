import { Container, Grid, Box, Typography, Stack } from '@mui/material';
import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../../components/auth/FormInput';
import { LinkItem, OauthMuiLink } from './styles';
import LoadingButton from '@mui/lab/LoadingButton';

const signupSchema = object({
  name: string().min(1, 'Digite o nome completo.').max(70),
  cpf: string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
  birth: string().regex(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/),
  //gender: string().regex(),
  email: string().min(1, 'Digite um email.').email('O email é inválido.'),
  password: string()
    .min(1, 'Digite uma senha.')
    .min(8, 'A senha precisa ter mais que 8 caracteres.')
    .max(32, 'A senha precisa ter menos que 32 caracteres.'),
  passwordConfirm: string().min(1, 'Confirme sua senha'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'As senhas não correspondem.',
});

type ISignUp = TypeOf<typeof signupSchema>;

export const SignupPage: FC = () => {
  const defaultValues: ISignUp = {
    name: '',
    cpf: '',
    birth: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const methods = useForm<ISignUp>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  const onSubmitHandler: SubmitHandler<ISignUp> = (values: ISignUp) => {
    console.log(JSON.stringify(values, null, 5));
  };

  // 👇 Returned JSX
  return (
    <Container
      maxWidth={false}
      sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}
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
          <Grid
            container
            sx={{
              boxShadow: { sm: '0 0 5px #ddd' },
              py: '6rem',
              px: '1rem',
            }}
          >
            <FormProvider {...methods}>
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
                      Crie uma conta
                    </Typography>

                    <FormInput
                      label='Nome'
                      type='text'
                      name='name'
                      focused
                      required
                    />
                    <FormInput
                      label='CPF'
                      type='text'
                      name='cpf'
                      placeholder='111.222.333-11'
                      focused
                      required
                    />
                    <FormInput
                      label='Data de nascimento'
                      type='text'
                      name='birth'
                      placeholder='XX/XX/XXXX'
                      focused
                      required
                    />
                    <FormInput
                      label='Email'
                      type='email'
                      name='email'
                      placeholder='email@email.com'
                      focused
                      required
                    />
                    <FormInput
                      label='Senha'
                      type='password'
                      name='password'
                      placeholder=''
                      focused
                      required
                    />
                    <FormInput
                      label='Confirme a senha'
                      type='password'
                      name='passwordConfirm'
                      required
                      focused
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
                      Cadastre-se
                    </LoadingButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{}}>
                </Grid>
              </Grid>
              <Grid container justifyContent='center'>
                <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                    Já possui uma conta? <LinkItem to='/'>Entrar</LinkItem>
                  </Typography>
                </Stack>
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
