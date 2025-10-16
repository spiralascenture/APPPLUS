import { View } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import MenusIconButton from "@/components/menus-icon-button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigationHelpers } from "@/hooks/useNavigationHelpers";
import { layoutStyles } from "@/components/layout/styles";
import React from "react";

export default function Header() {
  const { logout } = useAuthStore();
  const { getIconColor, navigateWithKeyboardDismiss } = useNavigationHelpers();

  return (
    <View style={layoutStyles.layoutBar}>
      <MenusIconButton
        icon={
          <FontAwesome name="user-circle-o" size={32} color={getIconColor("/profile")} />
        }
        onPress={() => navigateWithKeyboardDismiss("/profile")}
      />
      <MenusIconButton
        icon={
          <FontAwesome name="bars" size={32} color={getIconColor("/menu")} />
        }
        onPress={() => {
          logout();
          navigateWithKeyboardDismiss("/");
        }}
      />
    </View>
  );
}
