"use client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { auth } from "../../../firebase";
import {
  addToFirebaseUsers,
  checkEmailExists,
} from "../../utils/commonFunctions";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
const defaultTheme = createTheme();

export default function ForgotPassword() {
  const router = useRouter();
  const [data, setdata] = useState({
    email: "",
  });

  const { email } = data;

  const validateForm = () => {
    const newErrors = {
      email: "",
    };

    let formIsValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      toast.error(newErrors.email);
      formIsValid = false;
      return formIsValid;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      toast.error(newErrors.email);
      formIsValid = false;
      return formIsValid;
    }

    return formIsValid;
  };

  const dataChange = (event) => {
    const newData = { ...data, [event.target.name]: event.target.value };
    setdata(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formIsValid = validateForm();
    if (!formIsValid) {
      //console.log("Form is invalid");
      return;
    } else {
      //console.log("Form is valid");
      const emailExist = await checkEmailExists(email);
      if(!emailExist){
        toast.error("Email does not exist");
        router.push("/register");
        return;
      }
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Please check your email for password reset link.");
          router.push("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1637611331620-51149c7ceb94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVyc3x8fHx8fDE3MDczMjM2Mjg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={18}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              mt: 12,
              mx: 2,
              mb: 4,
              display: "flex",
              flexDirection: "column",
              textAlign:"center"
            }}
          >
            <Avatar sx={{ m: "auto", mb: 4, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 8 , mx:8,}}>
              <Grid container spacing={2}>
                <Grid item xs={24}>
                  <TextField
                    type="email"
                    name="email"
                    label="Email"
                    fullWidth
                    value={data.email}
                    onChange={dataChange}
                    required
                  />
                </Grid>
              </Grid>
              <Button
                onClick={handleSubmit}
                className="login-button"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Forgot Password
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Back to Sign-In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}
