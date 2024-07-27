import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCurrentUserApi,
  checkEmailApi,
  loginApi,
  registerUserApi,
} from "@/api/auth.api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUserApi(),
    retry: 1,
    staleTime: 1000 * 60 * 60,
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

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data) => registerUserApi(data),
  });
};
