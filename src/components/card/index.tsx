import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  title: string;
  image?: string | null;
  description?: string;
  price?: string;
  contact?: string;
  onPress?: () => void;
};

export default function Card({
  title,
  image,
  description,
  price,
  contact,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        {image ? (
          <Image source={{ uri: image }} style={styles.cardImage} />
        ) : (
          <View style={[styles.cardImage, styles.placeholderImage]} />
        )}

        <View style={styles.contentContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          {description ? (
            <Text style={styles.cardBody} numberOfLines={2}>
              {description}
            </Text>
          ) : null}
          {price ? (
            <Text style={styles.cardBody}>Valor: R$ {price}</Text>
          ) : null}
          {contact ? (
            <Text style={styles.cardBody}>Contato: {contact}</Text>
          ) : null}
        </View>

        <Feather
          name="arrow-up-right"
          size={24}
          color="black"
          style={{ marginLeft: "auto" }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "93%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    resizeMode: "cover",
    backgroundColor: "#eee",
  },
  placeholderImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 13,
    color: "#555",
  },
});
