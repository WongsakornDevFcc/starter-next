import { useCallback, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

type GuestGuardProps = {
  children: React.ReactNode
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { status, data: session } = useSession()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const check = useCallback(() => {
    if (status === "authenticated") {
      // const redirect_to = params.get("redirect_to")
      // if (redirect_to) {
        // router.replace(redirect_to)
      // } else 
      router.replace("dashboard")
    }
  }, [status, router, pathname, session])

  useEffect(() => {
    check()
  }, [check])

  return <>{children}</>
}
