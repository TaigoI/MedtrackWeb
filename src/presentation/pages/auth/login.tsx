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
import MedicalImage from '../../../assets/images/consulta_medica.jpg'
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

      if (value.length > 11) {
        value = value.slice(0, 11); // Limit to 11 digits
      }

      const maskedValue = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      methods.setValue('cpf', maskedValue)
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        background: "#ddd",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: { sm: "none", md: "block" },
          backgroundImage: `url(${MedicalImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "75rem",
          height: "100vh",
          boxShadow: {
            sm: "0 0 5px #ddd",
          },
        }}
      ></Box>
      <Box
        sx={{
          background: "white",
          width: "40rem",
          padding: "5rem",
          boxShadow: {
            sm: "0 0 5px #ddd",
          },
          alignSelf: { sm: "flex-end", md: "stretch" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormProvider {...methods}>
          <Typography
            variant="h6"
            component="h1"
            sx={{ textAlign: 'center', mb: '1.5rem' }}
          >
            Acesse sua conta
          </Typography>

          <Controller
            control={methods.control}
            name="cpf"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormInput
                label="CPF"
                type="text"
                name="cpf"
                id="cpfInput"
                focused
                required
                onChange={onChange}
                value={value}
                sx={{ width: "400px" }}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="password"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormInput
                label="Senha"
                onChange={onChange}
                value={value}
                type="password"
                name="password"
                required
                focused
                sx={{ width: "400px" }}
              />
            )}
          />

          <Controller
            control={methods.control}
            name="persistUser"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    aria-label="trust this device checkbox"
                    required
                    name="persistUser"
                    onChange={onChange}
                    value={value}
                  />
                }
                label={
                  <Typography
                    variant="body2"
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
            type="submit"
            variant="contained"
            onClick={methods.handleSubmit(onSubmitHandler)}
            sx={{
              py: '0.8rem',
              mt: 2,
              width: '60%',
              marginInline: 'auto',
            }}
          >
            Login
          </LoadingButton>
          <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
              Não possui conta? <LinkItem to="/signup">Cadastre-se</LinkItem>.
            </Typography>
          </Stack>
        </FormProvider>
      </Box>
    </Box>
  );
};
