import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";

export default function CompanyProfile(): JSX.Element {
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={28} color="black" />
        <Ionicons name="menu" size={28} color="black" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        <View style={styles.card}>

          <View style={styles.topIcons}>
            <Ionicons name="heart-outline" size={20} color="black" />
            <Ionicons name="close" size={20} color="black" />
          </View>
          <View style={styles.logoArea}>
            <Ionicons name="bar-chart" size={60} color="black" />
            <Text style={styles.companyName}>NOME DA EMPRESA</Text>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>PROFISSÃO / CATEGORIA</Text>
              <Ionicons name="chevron-down" size={16} color="black" />
            </View>
          </View>

          <View style={styles.socials}>
            <TouchableOpacity>
              <Ionicons name="logo-instagram" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="twitter" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="facebook" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="logo-whatsapp" size={26} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SOBRE</Text>
            <TextInput
              placeholder="Texto"
              style={[styles.input, { height: 80 }]}
              multiline
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>LOCALIZAÇÃO</Text>
            <TextInput placeholder="Texto" style={styles.input} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SITE</Text>
            <TextInput placeholder="Texto" style={styles.input} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CONTATO</Text>
            <TextInput placeholder="Texto" style={styles.input} />
          </View>

          <View style={styles.actions}>
            <Ionicons name="close-circle-outline" size={28} color="black" />
            <Ionicons name="checkmark-done-circle-outline" size={28} color="black" />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AntDesign name="home" size={28} color="black" />
        <Ionicons name="arrow-forward" size={28} color="black" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f3e7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  card: {
    backgroundColor: "#90CAF9",
    marginHorizontal: 10,
    borderRadius: 35,
    padding: 40,
    marginTop: 10,
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoArea: {
    alignItems: "center",
    marginVertical: 15,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  categoryTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 8,
  },
  categoryText: {
    fontSize: 12,
    marginRight: 5,
  },
  socials: {
    position: "absolute",
    right: 15,
    top: 80,
    justifyContent: "space-around",
    height: 120,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
    padding: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    gap: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
});
