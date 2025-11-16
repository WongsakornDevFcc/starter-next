"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { Button, Grid, Typography } from "@mui/material";
import LocaleSwitcher from "@/components/localeSwither/localeSwither";
import { useTranslations } from "next-intl";
import DataTable from "@/components/table/customTable";
import { UsersResponse } from "@/types/userType";
import { useGetPokemonByNameQuery } from "@/redux/features/pokemon";
import { useLazyGetUserQuery  } from "@/redux/features/user";

export default function Dashboard() {
  const t = useTranslations();
  // const [posts, setPosts] = useState<UsersResponse | null>(null);
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
   const [trigger, { data: userData, error: userError, isLoading: userIsLoading }] = useLazyGetUserQuery();
  console.log(userData);
   if (userError) return null;
  return (
    <Grid container spacing={2}>
      <LocaleSwitcher />
      <Grid size={{ xs: 24 }}>
        <Button onClick={() => trigger(JSON.stringify(userData))}>Get Data</Button>
        {/* <Button
          onClick={() => {
            setPosts(null);
          }}
        >
          {t("clearData")}
        </Button> */}
        <Button onClick={() => signOut()}>Sign out</Button>
      </Grid>
      <Grid size={{ xs: 24 }}>
        {/* <Typography>total is {posts?.total}</Typography> */}
      </Grid>
      <Grid size={{ xs: 24 }}>
        <Typography variant="h4">{t("welcome")}</Typography>
        <Button href="/devtool">{t("devTool.goToDevTool")}</Button>
      </Grid>
      <Grid size={{ xs: 24 }}>
        <Typography variant="h4">{t("devTool.dataGrid")}</Typography>
      </Grid>
      <Grid size={{ xs: 24 }}>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.species.name}</h3>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          </>
        ) : null}
        <DataTable rowData={userData} />
      </Grid>
    </Grid>
  );
}
