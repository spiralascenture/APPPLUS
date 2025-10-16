import { View } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import MenusIconButton from "@/components/menus-icon-button";
import { useNavigationHelpers } from "@/hooks/useNavigationHelpers";
import { layoutStyles } from "@/components/layout/styles";

export default function Footer() {
  const { getIconColor, navigateWithKeyboardDismiss } = useNavigationHelpers();

  return (
    <View style={layoutStyles.layoutBar}>
      <MenusIconButton
        icon={
          <Entypo name="home" size={28} color={getIconColor("/dashboard")} />
        }
        onPress={() => navigateWithKeyboardDismiss("/dashboard")}
      />
      <MenusIconButton
        icon={
          <AntDesign
            name="tags"
            size={36}
            color={getIconColor("/categories")}
          />
        }
        onPress={() => navigateWithKeyboardDismiss("/categories")}
      />
    </View>
  );
}
