import { Box, Grid, Typography, Stack } from "@mui/material";
import { FC } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  UseFormReturn,
} from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../components/auth/form-input";
import { LinkItem } from "./login";
import DoctorImage from '../../../assets/images/doctor.png'
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

const signupSchema = object({
  name: string().min(1, "Digite o nome completo.").max(70),
  cpf: string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
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
        sx={{ width: "100%" }}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ textAlign: "center", mb: "1.5rem" }}
        >
          Crie uma conta
        </Typography>

        <FormInput label="Nome" type="text" name="name" focused required />
        <FormInput label="CPF" type="text" name="cpf" placeholder="111.222.333-11" focused required sx={{ w: "100%" }} />
        <FormInput label="CRM" type="text" name="crm" placeholder="CRM-AL 1234" focused required sx={{ w: "100%" }} />
        <FormInput label="Data de nascimento" type="text" name="birth" placeholder="XX/XX/XXXX" focused required />
        <FormInput label="Contato pessoal" type="text" name="mobilePhone" placeholder="Ex: 82990000000" focused required />
        <FormInput label="Contato profissional" type="text" name="businessPhone" placeholder="Ex: 8299000000" focused required />
        <FormInput label="Email" type="email" name="email" placeholder="email@email.com" focused required />
        <FormInput label="Senha" type="password" name="password" placeholder="" focused required />
        <FormInput label="Confirme a senha" type="password" name="passwordConfirm" required focused />

        <LoadingButton
          loading={false}
          type="submit"
          variant="contained"
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

  const onSubmitHandler: SubmitHandler<ISignUp> = (values: ISignUp) => {
    navigate('/app')
  };

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
          background: "white",
          width: "50rem",
          padding: "1rem",
          boxShadow: {
            sm: "0 0 5px #ddd",
          },
          alignSelf: { sm: "initial", md: "stretch" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <SignupForm methods={methods} onSubmit={onSubmitHandler} />
      </Box>
      {/* <Box
        sx={{
          display: { sm: "none", md: "block" },
          backgroundImage: `url('../../assets/images/doctor.png')`,
          width: "15rem",
          height: "100vh",
          boxShadow: {
            sm: "0 0 5px #ddd",
          },
        }}
      ></Box> */}
    </Box>
  );
};
