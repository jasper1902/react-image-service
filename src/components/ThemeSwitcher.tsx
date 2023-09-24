import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme !== "dark" && theme !== "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [theme, setTheme]);

  if (!mounted || !theme) return null;

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <button onClick={changeTheme}>
        {theme === "light" ? <BsFillMoonFill /> : <BsSunFill />}
      </button>
    </div>
  );
}