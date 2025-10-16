import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import Layout from "@/components/layout";
import Input from "@/components/input";
import Button from "@/components/button";
import { useAuthStore } from "@/stores/useAuthStore";

import { KeyboardTypeOptions } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

const fields: {
  name: keyof FormData;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
}[] = [
  { name: "nome", placeholder: "Nome" },
  { name: "sobrenome", placeholder: "Sobrenome" },
  { name: "pronomes", placeholder: "Pronomes" },
  { name: "email", placeholder: "Email", keyboardType: "email-address" },
  { name: "telefone", placeholder: "Telefone", keyboardType: "phone-pad" },
];

// Schema de validação com Zod
const schema = z
  .object({
    nome: z.string().min(2, "Nome obrigatório"),
    sobrenome: z.string().min(2, "Sobrenome obrigatório"),
    pronomes: z.string().optional(),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().min(8, "Telefone obrigatório"),
    senha: z.string().min(3, "Senha muito curta"),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

type FormData = z.infer<typeof schema>;

export default function ProfileForm() {
  const { user } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      pronomes: "",
      email: "",
      telefone: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        nome: user.nome || "",
        sobrenome: user.sobrenome || "",
        pronomes: user.pronouns || "",
        email: user.email || "",
        telefone: user.phone || "",
        senha: "",
        confirmarSenha: "",
      });
    }
  }, [user]);

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    try {
      const response = await fetch(
        "http://appplustecnologi1.hospedagemdesites.ws/api-routes/update_user.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            nome: data.nome,
            sobrenome: data.sobrenome,
            pronomes: data.pronomes,
            email: data.email,
            telefone: data.telefone,
            senha: data.senha,
            confirmarSenha: data.confirmarSenha,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        useAuthStore.getState().login({
          id: user.id,
          nome: data.nome,
          sobrenome: data.sobrenome,
          email: data.email,
          phone: data.telefone,
          pronouns: data.pronomes ?? "",
          loginAt: new Date().toISOString(),
        });

        alert("Dados atualizados com sucesso!");
      } else {
        alert(result.message || "Erro ao atualizar dados");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro na conexão com o servidor");
    }
  };

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permissão para acessar a galeria é necessária");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: false,
    });

    if (result.canceled || result.assets.length === 0) return;

    const image = result.assets[0];

    const resized = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 150, height: 150 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    if (!user?.id) {
      alert("Usuário não encontrado");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", {
      uri: resized.uri,
      name: `avatar_${user.id}.jpg`,
      type: "image/jpeg",
    } as any);
    formData.append("userId", String(user.id));

    try {
      const response = await fetch(
        "https://api-pridecare.com/api-appplus/upload_avatar.php",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const json = await response.json();

      if (response.ok && json.avatar_url) {
        const refreshedUrl = `${json.avatar_url}?t=${Date.now()}`;

        useAuthStore.getState().login({
          ...user,
          avatarUrl: refreshedUrl,
        });

        alert("Imagem enviada com sucesso!");
        console.log("Novo avatar_url:", refreshedUrl);
      } else {
        alert(json.message || "Erro ao enviar imagem");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Falha ao enviar imagem");
    }
  };

  return (
    <Layout>
      <View style={styles.flexContainer}>
        <View style={styles.avatarContainer}>
          {user?.avatarUrl ? (
            <Image
              source={{ uri: user.avatarUrl }}
              style={styles.avatarImage}
            />
          ) : (
            <FontAwesome
              name="user-circle"
              size={150}
              color="#5c00ba"
              style={styles.avatarImage}
            />
          )}

          <TouchableOpacity style={styles.editIcon} onPress={handlePickImage}>
            <FontAwesome name="pencil" size={24} color="#5c00ba" />
          </TouchableOpacity>
        </View>

        {fields.map((field) => (
          <Controller
            key={field.name}
            name={field.name as keyof FormData}
            control={control}
            render={({ field: f }) => (
              <Input
                placeholder={field.placeholder}
                keyboardType={field.keyboardType}
                value={f.value}
                onChangeText={f.onChange}
                onBlur={f.onBlur}
                errorMessage={errors[field.name as keyof FormData]?.message}
              />
            )}
          />
        ))}

        <View style={styles.divider} />

        <Controller
          name="senha"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              errorMessage={errors.senha?.message}
            />
          )}
        />
        <Controller
          name="confirmarSenha"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Confirmar Senha"
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              errorMessage={errors.confirmarSenha?.message}
            />
          )}
        />

        <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
        <Button
          title="Voltar"
          onPress={() => console.log("Voltar")}
          backgroundColor="transparent"
          textColor="#5c00ba"
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 12,
    padding: 20,
  },
  avatar: {},
  avatarContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  editIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
