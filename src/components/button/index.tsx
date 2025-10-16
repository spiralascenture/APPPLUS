import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { style } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  backgroundColor?: string;
  textColor?: string;
};

export default function Button({
  title,
  backgroundColor = "#5c00ba",
  textColor = "#fff",
  ...rest
}: Props) {
  return (
    <TouchableOpacity style={[style.button, { backgroundColor }]} {...rest}>
      <Text style={[style.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}
