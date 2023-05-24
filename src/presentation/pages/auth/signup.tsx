import { Box, Grid, Typography, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  UseFormReturn,
  Controller,
} from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../components/auth/form-input";
import { LinkItem } from "./login";
import DoctorImage from '../../../assets/images/doctor.png'
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { signUpUseCase } from "../../../modules/authentication/useCases/SignUpUseCase";
import { useAuthentication } from "../../context/AuthenticationContext";
import { toast } from "react-toastify";

const signupSchema = object({
  name: string().min(1, "Digite o nome completo.").max(70),
  cpf: string(),
  crm: string().regex(/^CRM-[A-Z]{2} \d{1,6}$/),
  birth: string().regex(
    /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
    "Digite uma data válida."
  ),
  mobilePhone: string().regex(/^\d{11}$/, 'O número inserido é inválido.').max(11),
  businessPhone: string().regex(/^\d{10}$/, 'O número inserido é inválido.').max(10),
  //gender: string().regex(),
  email: string().min(1, "Digite um email.").email("O email é inválido."), 
  password: string()
    .min(1, "Digite uma senha.")
    .min(8, "A senha precisa ter mais que 8 caracteres.")
    .max(32, "A senha precisa ter menos que 32 caracteres."),
  passwordConfirm: string().min(1, "Confirme sua senha"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "As senhas não correspondem.",
});

type ISignUp = TypeOf<typeof signupSchema>;

const SignupForm: FC<{
  methods: UseFormReturn<ISignUp>;
  onSubmit: SubmitHandler<ISignUp>;
}> = ({ methods, onSubmit }) => {
  return (
    <FormProvider {...methods}>
      <Stack
        display="flex"
        component="form"
        noValidate
        autoComplete="off"
        sx={{ width: "80%" }}
        // onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ textAlign: "center", mb: "1.5rem" }}
        >
          Crie uma conta
        </Typography>

        <Controller
          name="name"
          control={methods.control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormInput
              label="Nome"
              type="text"
              name="name"
              focused
              required 
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Controller
          name="cpf"
          control={methods.control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormInput 
              label="CPF" 
              type="text" 
              id="cpfInput"
              name="cpf" 
              placeholder="111.222.333-11"
              focused
              required
              onChange={onChange}
              value={value}
              sx={{ w: "100%" }} />
          )} 
        />
        <Controller
          name="crm"
          control={methods.control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormInput 
              label="CRM" 
              type="text" 
              name="crm" 
              placeholder="CRM-AL 1234" focused required 
              onChange={onChange}
              value={value}
              sx={{ w: "100%" }} 
            />
          )} 
        />
        <Controller
          name="birth"
          control={methods.control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormInput 
              label="Data de nascimento" 
              type="text" 
              name="birth" 
              onChange={onChange}
              value={value}
              placeholder="XX/XX/XXXX" focused required 
            />
          )} 
        />
        <Controller
          name="mobilePhone"
          control={methods.control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormInput 
              label="Contato pessoal" 
              type="text" 
              name="mobilePhone" 
              onChange={onChange}
              value={value}
              placeholder="Ex: 82990000000" focused required />
          )} 
        />
        <Controller
          name="businessPhone"
          control={methods.control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormInput 
              label="Contato profissional" 
              type="text" 
              name="businessPhone" 
              onChange={onChange}
              value={value}
              placeholder="Ex: 8299000000" focused required 
            />
          )} 
        />
        <Controller
          name="email"
          control={methods.control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormInput 
              label="Email" 
              type="email" 
              name="email" 
              onChange={onChange}
              value={value}
              placeholder="email@email.com" focused required />
          )} 
        />
        <Controller
          name="password"
          control={methods.control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormInput 
              label="Senha" 
              type="password" 
              name="password" 
              onChange={onChange}
              value={value}
              placeholder="" focused required 
            />
          )}
        />
        <Controller
          name="passwordConfirm"
          control={methods.control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormInput 
              label="Confirme a senha" 
              type="password" 
              name="passwordConfirm" required focused 
              onChange={onChange}
              value={value}
            />
          )}
        />

        <LoadingButton
          loading={false}
          type="submit"
          variant="contained"
          onClick={methods.handleSubmit(onSubmit)}
          sx={{
            py: "0.8rem",
            mt: 2,
            width: "60%",
            marginInline: "auto",
          }}
        >
          Cadastre-se
        </LoadingButton>
      </Stack>
      <Stack sx={{ mt: "3rem", textAlign: "center" }}>
        <Typography sx={{ fontSize: "0.9rem", mb: "1rem" }}>
          Já possui uma conta? <LinkItem to="/login">Entrar</LinkItem>
        </Typography>
        <Typography sx={{ fontSize: "0.9rem", mb: "1rem" }}>
          <LinkItem to="/">Voltar para a página inicial</LinkItem>
        </Typography>
      </Stack>
    </FormProvider>
  );
};

export const SignupPage: FC = () => {
  const defaultValues: ISignUp = {
    name: "",
    cpf: "",
    crm: "",
    birth: "",
    mobilePhone: "",
    businessPhone: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const methods = useForm<ISignUp>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  const navigate = useNavigate()
  const { setUser } = useAuthentication();

  const onSubmitHandler: SubmitHandler<ISignUp> = async (values: ISignUp) => {
    const [day, month, year] = values.birth.split('/');
    try {
      const _user = await signUpUseCase.execute({
        birthdate: `${year}-${month}-${day}`,
        businessPhone: values.businessPhone,
        councilRegistration: values.crm,
        cpf: values.cpf.replace(/\D+/g, ''),
        email: values.email,
        gender: '-',
        mobilePhone: values.mobilePhone,
        name: values.name,
        password: values.password,
      });
      setUser(_user);
      navigate('/app')
      toast.success(`Bem vindo, ${_user.name}!`, {
        theme: 'colored'
      });
    } catch (error) {
      toast.error('Erro ao cadastrar', {
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
          backgroundImage: `url(${DoctorImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "75rem",
          height: "150vh",
          boxShadow: {
            sm: "0 0 5px #ddd",
          },
        }}
      ></Box>
      <Box
        sx={{
          background: "white",
          width: "50rem",
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
        <SignupForm methods={methods} onSubmit={onSubmitHandler} />
      </Box>
    </Box>
  );
};
