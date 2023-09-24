import { useLocalStorage } from "@uidotdev/usehooks";
import { useFetchData } from "./useFetchData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useVerify = async () => {
  const [token] = useLocalStorage("token", undefined);
  const { status } = useFetchData(
    `${import.meta.env.VITE_IMAGE_API}/api/account/verify`,
    token
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!status) return
    if (status !== 200) {
      navigate("/login");
    }
  }, [navigate, status]);
};
