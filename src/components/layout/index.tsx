import { ReactNode } from "react";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { layoutStyles } from "./styles";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <LinearGradient
      colors={["#F1EFE4", "#F1EFE4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={layoutStyles.container}
    >
      <Header />

      <KeyboardAvoidingView
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: 8,
          marginTop: 10,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={layoutStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>

      <Footer />
    </LinearGradient>
  );
}
