import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/button";
import Input from "@/components/input";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { Image } from "react-native";

const API_URL = "http://appplustecnologi1.hospedagemdesites.ws/api-routes/login.php";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuthStore();

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: usuario, password: senha }),
      });

      const result = await response.json();

      if (response.ok) {
        login(result.user);

        Alert.alert("Login realizado com sucesso!");

        Keyboard.dismiss();
      } else {
        Alert.alert("Erro", result.message || "Usuário ou senha inválidos");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar com o servidor");
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
        <Text style={styles.heading1}>Bem-vinde ao App Plus+</Text>
        <Text style={styles.body1}>
          Aqui você encontra serviços e produtos da comunidade LGBTI+
        </Text>
      </View>

      <View style={styles.flexContainer}>
        <Input
          icon={<AntDesign name="user" size={22} color="#1000e2" />}
          placeholder="Email de cadastro"
          value={usuario}
          onChangeText={setUsuario}
        />
        <Input
          icon={<AntDesign name="lock" size={22} color="#1000e2" />}
          placeholder="Senha"
          secureTextEntry={!showPassword}
          value={senha}
          onChangeText={setSenha}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={22}
                color="#1000e2"
              />
            </TouchableOpacity>
          }
        />
      </View>

      <View style={styles.flexContainer}>
        <Button
          title="Criar Conta"
          backgroundColor="#fff"
          textColor="#5c00ba"
          onPress={() => router.navigate("/register")}
        />
        <Button title="Entrar" onPress={handleLogin} />
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
  heading1: {
    fontWeight: "700",
    fontSize: 28,
    textAlign: "center",
  },
  body1: {
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center",
  },
  flexContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 12,
    padding: 20,
  },
});
