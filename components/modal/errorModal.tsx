import * as React from "react";
import Box from "@mui/material/Box";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Grid } from "@mui/material";
import { useTranslations } from "next-intl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  onClose?: () => void;
  title?: string;
  message?: string;
}

export default function ErrorModal({ open, onClose, title, message }: Props) {
  const t = useTranslations();

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Grid container spacing={1} alignItems="center">
            <Grid size={{ xs: 12 }} textAlign="center">
              <ErrorOutlineIcon sx={{ fontSize: 60 }} color="error" />
            </Grid>
            <Grid size={{ xs: 12 }} textAlign="center">
              <Typography variant="h6" component="h2" color="error">
                {title}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }} textAlign="center">
              <Typography variant="caption" sx={{ mt: 2 }}>
                {message}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }} textAlign="center">
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={onClose}
              >
                {t("close")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
