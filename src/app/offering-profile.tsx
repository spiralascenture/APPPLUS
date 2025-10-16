import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { Offering } from "@/interfaces";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/stores/useAuthStore";

export default function OfferingProfile() {
  const [isFavorite, setSetIsFavorite] = useState(false);
  const { id } = useLocalSearchParams();
  const { user } = useAuthStore();

  const [data, setData] = useState<Offering | null>(null);
  const [loading, setLoading] = useState(true);

  const checkIfFavorite = async () => {
    console.log(id);
    if (!user || !id) {
      console.warn("Usuário não logado ou dados não carregados.");
      return;
    }

    try {
      const response = await fetch(
        "https://api-pridecare.com/api-appplus/check_favorite_product_service.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            productServiceId: id,
          }),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        setSetIsFavorite(result.exists);
        console.log(result.exists);
        // aqui você pode setar um estado, ex: setIsFavorite(result.exists)
      } else {
        console.warn("Erro ao verificar favorito:", result.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    if (id) fetchData();
    checkIfFavorite();
  }, [id]);

  const fetchData = async () => {
    try {
      const formData = new FormData();
      formData.append("id", String(id));

      const response = await fetch(
        "https://api-pridecare.com/api-appplus/get_offering_by_id.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const json = await response.json();
      if (response.ok) {
        setData(json.data);
      } else {
        console.warn(json.message);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!user || !user.id || !data) {
      console.warn("Usuário não logado ou dados não carregados.");
      return;
    }

    try {
      const response = await fetch(
        "https://api-pridecare.com/api-appplus/toggle_favorite_product_service.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            productServiceId: data.id,
          }),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        console.log("Favoritado com sucesso:", result.message);
        await checkIfFavorite(); // <-- aqui você força o reload do estado favorito
      } else {
        console.warn("Erro ao favoritar:", result.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Text style={styles.loading}>Carregando...</Text>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <Text style={styles.error}>Produto ou serviço não encontrado.</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color="#5c00ba" />
        </TouchableOpacity>

        {/* Imagem (ou placeholder) */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Imagem não disponível</Text>
        </View>

        <TouchableOpacity onPress={handleFavorite} style={{ maxWidth: 50 }}>
          {!isFavorite && <AntDesign name="staro" size={24} color="black" />}
          {isFavorite === true && (
            <AntDesign name="star" size={24} color="black" />
          )}
        </TouchableOpacity>

        <Text style={styles.title}>{data.name}</Text>

        {data.description && (
          <Text style={styles.text}>{data.description}</Text>
        )}

        <Text style={styles.label}>Contato:</Text>

        {data.contact && (
          <TouchableOpacity
            onPress={() => {
              const phone = data.contact.replace(/\D/g, "");
              const url = `https://wa.me/${phone}`;
              Linking.openURL(url);
            }}
          >
            <Text style={styles.link}>Falar no WhatsApp</Text>
          </TouchableOpacity>
        )}

        {data.instagram && (
          <TouchableOpacity onPress={() => Linking.openURL(data.instagram!)}>
            <Text style={styles.link}>Instagram</Text>
          </TouchableOpacity>
        )}

        {data.facebook && (
          <TouchableOpacity onPress={() => Linking.openURL(data.facebook!)}>
            <Text style={styles.link}>Facebook</Text>
          </TouchableOpacity>
        )}

        {data.website && (
          <TouchableOpacity onPress={() => Linking.openURL(data.website!)}>
            <Text style={styles.link}>Website</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    flexGrow: 1,
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 60,
  },
  error: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 60,
    color: "red",
  },
  imagePlaceholder: {
    /* width: Dimensions.get("window").width, */
    height: 300,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -20, // compensar padding do container
    marginRight: -20,
  },
  imageText: {
    color: "#666",
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  link: {
    fontSize: 16,
    color: "#5c00ba",
    textDecorationLine: "underline",
  },
});
