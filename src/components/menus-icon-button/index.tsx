import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ReactNode } from "react";

type Props = TouchableOpacityProps & {
  icon: ReactNode;
  onPress: () => void;
};

export default function MenusIconButton({ icon, onPress, ...rest }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} {...rest}>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});
