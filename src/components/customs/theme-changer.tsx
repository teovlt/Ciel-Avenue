import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";

export const ThemeChanger = () => {
  const { setTheme, theme } = useTheme();
  
  const getCurrentTheme = () => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme;
  };
  
  const currentTheme = getCurrentTheme();
  
  return (
    <Button 
      variant="outline" 
      className="cursor-pointer relative overflow-hidden" 
      size="sm" 
      onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ${currentTheme === "dark" ? "rotate-90 scale-0 absolute" : "rotate-0 scale-100"}`} />
      <Moon className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ${currentTheme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0 absolute"}`} />
    </Button>
  );
};
