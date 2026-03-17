import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/auth";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: getCurrentUser,
    retry: false,
  });
}
