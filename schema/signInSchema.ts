import * as zod from "zod"
import { TranslationProps } from "@/app/i18n/request"

export default function SignInSchema(t: TranslationProps) {
    return zod.object({
        email: zod
            .string()
            .min(1, t("required", { name: t("email") })),
        password: zod
            .string()
            .min(1, t("required", { name: t("password") })),
    })
}
