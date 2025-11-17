"use client";

import React, {  useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignInSchema from "@/schema/signInSchema";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import LoadingButtonComponent from "@/components/button/loadingButtonComponent";

interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => void;
  isSubmitting: boolean;
}

export default function LoginForm({ onSubmit, isSubmitting }: LoginFormProps) {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignInSchema(t)) });

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Grid
            container
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            gap={2}
          >
            <Grid size={24}>
              <Typography gutterBottom variant="h5" textAlign={"center"}>
                {t("login")}
              </Typography>
            </Grid>
            <Grid size={24}>
              <TextField
                {...register("email")}
                label={t("email")}
                name="email"
                variant="standard"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                {...register("password")}
                name="password"
                type={showPassword ? "text" : "password"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
                error={!!errors.password}
                helperText={errors.password?.message}
                label={t("password")}
                fullWidth
              />
            </Grid>
            <Grid size={24} textAlign={"right"}>
              <Link href="" underline="none">
                <Typography variant="caption">{t("forgotPassword")}</Typography>
              </Link>
            </Grid>
            <Grid size={24}>
              <LoadingButtonComponent
                isSubmitting={isSubmitting}
                text={t("login")}
              />
            </Grid>
            <Grid size={24} textAlign={"center"}>
              <Typography variant="caption">
                {t("noAccountYet")}{" "}
                <Link href="/signup" underline="none">
                  {t("createOne")}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
