"use client";

import React, { useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import DataTable from "@/components/table/customTable";
// import { useGetPokemonByNameQuery } from "@/redux/features/pokemon";
import { useLazyGetUserQuery } from "@/redux/features/user";

export default function Dashboard() {
  const t = useTranslations();
  // const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  const [
    trigger,
    { data: userData, error: userError},
  ] = useLazyGetUserQuery();

  useEffect(() => {
    trigger(JSON.stringify({}));
  }, [trigger]);

  if (userError) return null;
  
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 24 }}>
        <Typography variant="h4">{t("welcome")}</Typography>
      </Grid>
      <Grid size={{ xs: 24 }}>
        <Button onClick={() => trigger(JSON.stringify(userData))}>
          Get Data
        </Button>
      </Grid>
      
      <Grid size={{ xs: 24 }}>
        <DataTable rowData={userData} />
      </Grid>
    </Grid>
  );
}
