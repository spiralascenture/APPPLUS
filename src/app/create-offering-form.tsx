import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardTypeOptions,
  TextInput,
} from "react-native";
import { Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { FontAwesome } from "@expo/vector-icons";

import Layout from "@/components/layout";
import Input from "@/components/input";
import Button from "@/components/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { router } from "expo-router";
import * as Location from "expo-location";

const schema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  description: z
    .string()
    .min(150, "Descreva o serviço/produto com pelo menos 150 caracteres"),
  contact: z.string().min(8, "Telefone obrigatório"),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  website: z.string().optional(),
  category_id: z.string().min(1, "Categoria obrigatória"),

  address: z.string().min(5, "Endereço obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function CreateOfferingForm() {
  const { user, isLoggedIn } = useAuthStore();
  const { categories, fetchCategories, loading } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      contact: "",
      instagram: "",
      facebook: "",
      website: "",
    },
  });

  const [imageUri, setImageUri] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    if (!user || !user.id) {
      alert("Usuário não autenticado");
      return;
    }

    try {
      // Geocodifica o endereço
      const geo = await Location.geocodeAsync(data.address);

      if (!geo || geo.length === 0) {
        alert("Não foi possível localizar esse endereço");
        return;
      }

      const { latitude, longitude } = geo[0];

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value ?? "");
      });

      formData.append("user_id", String(user.id));
      formData.append("latitude", String(latitude));
      formData.append("longitude", String(longitude));

      const response = await fetch(
        "https://api-pridecare.com/api-appplus/create_offering.php",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Produto ou serviço criado com sucesso!");
        reset();
        setImageUri(null);
        router.navigate("/vendor-panel");
      } else {
        alert(result.message || "Erro ao criar produto ou serviço");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  const fields: {
    name: keyof FormData;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
  }[] = [
    { name: "name", placeholder: "Nome do serviço/produto" },
    { name: "description", placeholder: "Descrição do serviço/produto" },
    {
      name: "contact",
      placeholder: "Melhor contato",
      keyboardType: "phone-pad",
    },
    { name: "instagram", placeholder: "Instagram" },
    { name: "facebook", placeholder: "Facebook" },
    { name: "website", placeholder: "Website" },
  ];

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <FontAwesome name="image" size={100} color="#ccc" />
            </View>
          )}
          {/* <TouchableOpacity onPress={handlePickImage} style={styles.imageBtn}>
            <FontAwesome name="upload" size={20} color="#5c00ba" />
          </TouchableOpacity> */}
        </View>

        {fields.map((field) => {
          if (field.name === "description") return null;

          return (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              render={({ field: f }) => (
                <Input
                  placeholder={field.placeholder}
                  keyboardType={field.keyboardType}
                  value={f.value}
                  onChangeText={f.onChange}
                  onBlur={f.onBlur}
                  errorMessage={errors[field.name]?.message}
                />
              )}
            />
          );
        })}
        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <Picker.Item label="Selecione uma categoria" value="" />
                  {categories.map((cat) => (
                    <Picker.Item
                      key={cat.id}
                      label={cat.name}
                      value={String(cat.id)}
                    />
                  ))}
                </Picker>
              </View>

              {errors.category_id?.message && (
                <Text style={{ color: "red" }}>Defina uma categoria</Text>
              )}
            </>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="Descrição"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              multiline
              numberOfLines={5}
              style={styles.textarea}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Endereço completo"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              errorMessage={errors.address?.message}
            />
          )}
        />

        <Button
          title="Criar Produto/Serviço"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    gap: 12,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  imageBtn: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
  textarea: {
    textAlign: "left",
    flex: 1,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    minHeight: 200,
    borderColor: "#000",
  },
  pickerContainer: {
    borderWidth: 1.3,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderRadius: 99,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 16,
    paddingLeft: 10,
  },
});
