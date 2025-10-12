"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import useAxiosAuth from "@/api/hooks/useAxiosAuth";
import { Button, Grid, Typography } from "@mui/material";
import LocaleSwitcher from "@/components/localeSwither/localeSwither";
import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any>(null);
  const axiosAuth = useAxiosAuth();

  console.log("session", session);
  const fetchPosts = async () => {
    const res = await axiosAuth.get("/api/v1/user");
    setPosts(res.data);
    console.log(res.data); //{content: "test", message: "Hello"}
  };
  return (
    <Grid container spacing={2}>
      <LocaleSwitcher />
      <Grid size={{ xs: 24 }}>
        <Button onClick={fetchPosts}>Get Data</Button>
        <Button
          onClick={() => {
            setPosts("");
          }}
        >
          {t("clearData")}
        </Button>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Grid>
      <Grid size={{ xs: 24 }}>
        {posts && <pre>{JSON.stringify(posts, null, 2)}</pre>}
      </Grid>
      <Grid size={{ xs: 24 }}>
        <Typography variant="h4">{t("welcome")}</Typography>
        <Button href="/devtool">{t("goToDevTool")}</Button>
      </Grid>
    </Grid>
  );
}
