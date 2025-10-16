import {
  Image,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import Layout from "@/components/layout";
import Button from "@/components/button";
import { FontAwesome } from "@expo/vector-icons";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";

export default function Profile() {
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <View style={styles.profileContainer}>
        {/* Ícone grande */}
        {user?.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} />
        ) : (
          <FontAwesome
            name="user-circle"
            size={150}
            color="#825858"
            style={styles.avatarImage}
          />
        )}

        {/* Nome */}
        <Text style={styles.name}>Pedro Soares</Text>

        {/* Pronomes */}
        <Text style={styles.pronouns}>(ele/dele)</Text>

        {/* Botões */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Dados Pessoais"
            backgroundColor="#D25D42"
            onPress={() => router.navigate("/profile-form")}
          />
            <Button
              title="Fale Conosco"
              backgroundColor="#825858"
              onPress={() => {
                Linking.openURL(
                  "https://wa.me/5511989295671?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20o%20APP%20PLUS+"
                );
              }}
            />
          <Button
            title="Saved"
            onPress={() => router.navigate("/categories")}
            backgroundColor="#93BCB3"
          />
          <Button
            title="Serviços e Produtos"
            onPress={() => router.navigate("/")}
            backgroundColor="#0097B2"
          />
          <Button
            title="Chat"
            onPress={() => router.navigate("/")}
            backgroundColor="#D25D42"
          />
          <Button
            title="Configurações"
            onPress={() => router.navigate("/")}
            backgroundColor="#825858"
          />
          <Button
            title="Alterar cor"
            onPress={() => router.navigate("/")}
            backgroundColor="#93BCB3"
          />

          {user?.role === "vendor" && (
            <Button
              title="Painel de Vendedor"
              onPress={() => router.navigate("/vendor-panel")}
              backgroundColor="#5c00ba"
              textColor="#fff"
            />
          )}

          <Button
            title="Quero oferecer meu produto ou serviço!"
            onPress={() => setShowModal(true)}
            backgroundColor="transparent"
            textColor="#5c00ba"
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 10,
              width: "85%",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 28, fontWeight: "bold", marginBottom: 30 }}
            >
              Confirmação
            </Text>
            <Text
              style={{ textAlign: "center", marginBottom: 20, fontSize: 18 }}
            >
              Você está prestes a fazer alterações irreversíveis no seu perfil.
              Tem certeza que deseja oferecer um produto ou serviço pelo APP
              Plus+?
            </Text>

            <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
              <Pressable
                style={{
                  backgroundColor: "#D25D42",
                  padding: 10,
                  borderRadius: 5,
                  minWidth: 100,
                }}
                onPress={async () => {
                  try {
                    const response = await fetch(
                      "https://api-pridecare.com/api-appplus/set_role_vendor.php",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: user?.id }),
                      }
                    );

                    const data = await response.json();

                    if (response.ok) {
                      alert(
                        "Seu perfil foi atualizado com sucesso! Agora você tem um painel de vendedor!"
                      );
                      setShowModal(false);
                      useAuthStore.getState().login(data.user);
                    } else {
                      alert(data.message || "Erro ao atualizar perfil.");
                    }
                  } catch (error) {
                    alert("Erro de rede ao tentar atualizar o perfil.");
                    console.error(error);
                  }
                }}
              >
                <Text
                  style={{ color: "#fff", textAlign: "center", fontSize: 18 }}
                >
                  Confirmar
                </Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: "#ccc",
                  padding: 10,
                  borderRadius: 5,
                  minWidth: 100,
                }}
                onPress={() => setShowModal(false)}
              >
                <Text
                  style={{ color: "#000", textAlign: "center", fontSize: 18 }}
                >
                  Cancelar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  pronouns: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 32,
  },
  buttonsContainer: {
    width: "100%",
    gap: 12,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
  },
});
