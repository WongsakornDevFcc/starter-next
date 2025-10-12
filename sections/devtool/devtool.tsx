"use client";
import React, { useState } from "react";
import { Button, Grid, List, ListItem, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import NotistacksComponent from "@/components/notistacks/notistacks";
import { DefaultModal, ErrorModal, SuccessModal } from "@/components/modal";
import DefaultDialog from "@/components/dialogmodal/defaultDialog";

export default function DevTool() {
  const t = useTranslations("devTool");
  const [openDefault, setOpenDefault] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const handleOpenDefault = () => setOpenDefault(true);
  const handleCloseDefault = () => setOpenDefault(false);
  const handleOpenSuccess = () => setOpenSuccess(true);
  const handleCloseSuccess = () => setOpenSuccess(false);
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Grid container spacing={2} padding={2}>
      <Grid size={{ xs: 12 }}>{t("title")}</Grid>
      {/* -------------------- Notistack Components ------------------------ */}
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4">Notistack Components</Typography>
      </Grid>
      <List>
        <Typography>It need 2 parameter to use NotistacksComponent</Typography>
        <ListItem>parameter 1: message</ListItem>
        <ListItem>parameter 2: variant</ListItem>
      </List>
      <Grid container size={{ xs: 12 }} spacing={2}>
        <Grid size={{ xs: 1 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => NotistacksComponent(t("error"), "error")}
          >
            {t("error")}
          </Button>
        </Grid>
        <Grid size={{ xs: 1 }}>
          <Button
            variant="contained"
            color="info"
            onClick={() => NotistacksComponent(t("info"), "info")}
          >
            {t("info")}
          </Button>
        </Grid>
        <Grid size={{ xs: 1 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => NotistacksComponent(t("success"), "success")}
          >
            {t("success")}
          </Button>
        </Grid>
      </Grid>
      {/* -------------------- Modal Components ------------------------ */}
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4">Modal Components</Typography>
      </Grid>
      <List>
        <Typography>
          Modal is a component that displays content overlaying the main
          application content.
        </Typography>
      </List>
      <Grid container size={{ xs: 12 }} spacing={2}>
        <Grid size={{ xs: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDefault}
          >
            Open Default Modal
          </Button>
          <DefaultModal
            open={openDefault}
            onClose={handleCloseDefault}
            title="This is Title"
            message="This is a default modal This is a default modal This is a default modal"
          />
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Button variant="contained" color="error" onClick={handleOpenError}>
            Open Error Modal
          </Button>
          <ErrorModal
            open={openError}
            onClose={handleCloseError}
            title="This is Title"
            message="This is an error modal This is an error modal This is an error modal"
          />
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenSuccess}
          >
            Open Success Modal
          </Button>
          <SuccessModal
            open={openSuccess}
            onClose={handleCloseSuccess}
            title="This is Title"
            message="This is a success modal This is a success modal This is a success modal"
          />
        </Grid>
      </Grid>
      {/* -------------------- Dialog Components ------------------------ */}
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4">Dialog Components</Typography>
      </Grid>
      <Grid container size={{ xs: 12 }} spacing={2}>
        <Button variant="outlined" onClick={handleOpenDialog}>
          Open form dialog
        </Button>
        <DefaultDialog open={openDialog} onClose={handleCloseDialog} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography>Coming Soon...</Typography>
      </Grid>
    </Grid>
  );
}
