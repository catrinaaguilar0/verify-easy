import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => emailSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email: data.email });

    if (error && error.code !== "23505") {
      // 23505 = unique violation; treat as success for privacy
      console.error("newsletter subscribe failed", error.code);
      throw new Error("Aanmelden mislukt, probeer het later opnieuw.");
    }

    return { ok: true };
  });
