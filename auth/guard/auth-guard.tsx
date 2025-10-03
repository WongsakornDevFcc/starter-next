import { useEffect, useCallback, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { status, data: session } = useSession();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (status === "unauthenticated") {
      const newParams = new URLSearchParams();
      router.replace("signin?" + newParams.toString());
    } else if (status === "authenticated") {
      setChecked(true);
    } else if (status === "loading") {
      return;
    }
  }, [status, router, params, pathname, session]);

  useEffect(() => {
    check();
  }, [status, check]);

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        <CircularProgress disableShrink />
      </div>
    );
  }
  if (!checked && status !== "authenticated") {
    return null;
  }

  return <>{children}</>;
}
