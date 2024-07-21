import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUserApi, checkEmailApi, loginApi } from "@/api/auth.api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUserApi(),
    retry: 1,
  });
};

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: (email) => checkEmailApi(email),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => loginApi(data),
  });
};
