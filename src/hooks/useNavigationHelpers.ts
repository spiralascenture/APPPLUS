import { Keyboard } from "react-native";
import { router, usePathname } from "expo-router";

export const useNavigationHelpers = () => {
  const pathname = usePathname();

  const navigateWithKeyboardDismiss = (
    path: Parameters<typeof router.navigate>[0],
    delay = 100
  ) => {
    Keyboard.dismiss();
    setTimeout(() => {
      router.navigate(path);
    }, delay);
  };

  const getIconColor = (targetPath: string) => {
    return pathname === targetPath ? "#D25D42" : "#000";
  };

  return {
    pathname,
    navigateWithKeyboardDismiss,
    getIconColor,
  };
};
