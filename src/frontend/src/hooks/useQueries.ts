import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      country: string;
      phone: string;
      medicalIssue: string;
      age: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const timestamp = BigInt(Date.now());
      await actor.submitInquiry(
        data.name,
        data.country,
        data.phone,
        data.medicalIssue,
        data.age,
        timestamp,
      );
    },
  });
}
