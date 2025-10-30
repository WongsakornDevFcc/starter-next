"use client";

import React, { useEffect, useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import useAxiosAuth from "@/api/hooks/useAxiosAuth";
import { Button, Grid, Typography } from "@mui/material";
import LocaleSwitcher from "@/components/localeSwither/localeSwither";
import { useTranslations } from "next-intl";
import DataTable from "@/components/table/customTable";
import { UsersResponse } from "@/types/userType";

export default function Dashboard() {
  const t = useTranslations();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<UsersResponse | null>(null);
  const axiosAuth = useAxiosAuth();

  const fetchPosts = async () => {
    const res = await axiosAuth.get("/api/v1/user");
    setPosts(res.data);
    console.log(res.data); //{content: "test", message: "Hello"}
  };

  useEffect(() => {
    fetchPosts();
    console.log("Session Data:", session);
  }, [session]);

  return (
    <Grid container spacing={2}>
      <LocaleSwitcher />
      <Grid size={{ xs: 24 }}>
        <Button onClick={fetchPosts}>Get Data</Button>
        <Button
          onClick={() => {
            setPosts(null);
          }}
        >
          {t("clearData")}
        </Button>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Grid>
      <Grid size={{ xs: 24 }}>
        <Typography>total is {posts?.total}</Typography>
      </Grid>
      <Grid size={{ xs: 24 }}>
        <Typography variant="h4">{t("welcome")}</Typography>
        <Button href="/devtool">{t("devTool.goToDevTool")}</Button>
      </Grid>
      <Grid size={{ xs: 24 }}>
        <Typography variant="h4">{t("devTool.dataGrid")}</Typography>
      </Grid>
      <Grid size={{ xs: 24 }}>
        <DataTable rowData={posts}/>
      </Grid>
    </Grid>
  );
}
