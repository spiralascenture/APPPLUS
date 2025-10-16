import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/input";
import Button from "@/components/button";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardTypeOptions,
} from "react-native";
import { router } from "expo-router";

// URL da sua API
const API_URL = "https://webftp.locaweb.com.br/view/public_html/api-routes/login.php";

type InputConfig = {
  name: keyof FormData;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
};

const fields: InputConfig[] = [
  { name: "nome", placeholder: "Nome" },
  { name: "sobrenome", placeholder: "Sobrenome" },
  { name: "email", placeholder: "Email", keyboardType: "email-address" },
  { name: "telefone", placeholder: "Telefone", keyboardType: "phone-pad" },
  { name: "pronomes", placeholder: "Pronomes" },
  { name: "senha", placeholder: "Senha", secureTextEntry: true },
  {
    name: "confirmarSenha",
    placeholder: "Confirmar Senha",
    secureTextEntry: true,
  },
];

// Validação com Zod
const schema = z
  .object({
    nome: z.string().min(2, "Nome obrigatório"),
    sobrenome: z.string().min(2, "Sobrenome obrigatório"),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().min(8, "Telefone obrigatório"),
    pronomes: z.string().optional(),
    senha: z.string().min(3, "Mínimo 6 caracteres"),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

type FormData = z.infer<typeof schema>;

export default function ProfileForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      telefone: "",
      pronomes: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", result.message);
        router.navigate("/");
      } else {
        Alert.alert("Erro", result.message || "Erro ao cadastrar");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro de conexão com o servidor");
    }
  };

  return (
    <LinearGradient
      colors={["#fff7ad", "#ffa9f9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.flexContainer}>
        <Text style={styles.heading1}>Faça seu cadastro no App Plus+</Text>
        <Text style={styles.body1}>
          Aqui você encontra serviços e produtos da comunidade LGBTI+
        </Text>

        {fields.map((fieldConfig) => (
          <Controller
            key={fieldConfig.name}
            control={control}
            name={fieldConfig.name as keyof FormData}
            render={({ field }) => (
              <Input
                placeholder={fieldConfig.placeholder}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                keyboardType={fieldConfig.keyboardType}
                secureTextEntry={fieldConfig.secureTextEntry}
                errorMessage={
                  errors[fieldConfig.name as keyof FormData]?.message
                }
              />
            )}
          />
        ))}

        <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
        <Button
          title="Já tenho cadastro"
          onPress={() => router.navigate("/")}
          backgroundColor="transparent"
          textColor="#5c00ba"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  flexContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 12,
    marginTop: 40,
  },
  heading1: {
    fontWeight: "700",
    fontSize: 28,
    textAlign: "center",
  },
  body1: {
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 40,
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
