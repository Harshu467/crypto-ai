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
import {
  browserSessionPersistence,
  fetchSignInMethodsForEmail,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import { auth } from "../../../firebase";
import { Github, GoogleIcon } from "@/helpers/icons";
import { addToFirebaseUsers, checkEmailExists } from "@/utils/commonFunctions";
import { useRouter } from "next/navigation";
const defaultTheme = createTheme();

export default function Login() {
  const [values, setValues] = useState({
    showPassword: false,
  });
  const router = useRouter();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const { email, password } = data;

  const dataChange = (event) => {
    const newData = { ...data, [event.target.name]: event.target.value };
    setdata(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setPersistence(auth, browserSessionPersistence).then(async () => {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success("Login Success");
          router.push("/")
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/user-not-found":
              toast.error("User Not Found");
              break;
            case "auth/invalid-credential":
              toast.error("Invalid Credential");
              break;
            case "auth/missing-email":
              toast.error("Please provide a valid email");
              break;
            case "auth/invalid-email":
              toast.error("Invalid Email");
              break;
            case "auth/missing-password":
              toast.error("Please provide a valid password");
              break;
            case "auth/wrong-password":
              toast.error("Wrong Password");
              break;
            default:
              toast.error("Something went wrong. Please try again.");
              break;
          }
        });
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const LoginWithgoogle = async (link = true, linkCredential) => {
    const provider = new GoogleAuthProvider();
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user;
          console.log("user", user);
          let userWithEmail = await checkEmailExists(user.email);
          console.log("userWithEmail", userWithEmail);
          if (link && linkCredential != undefined) {
            return await linkWithCredential(result.user, linkCredential);
          }
          if (!userWithEmail) {
            console.log("userWithEmail1", userWithEmail);
            console.log("User", user.uid, user.email, user.displayName);
            await addToFirebaseUsers(user.uid, user.email, user.displayName);
            toast.success("Login Successfully with Google ", {
              duration: 5000,
            });
          }
        })
        .catch(async (error) => {
          console.log("error here :: ", error.message);
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          if (error.code === "auth/account-exists-with-different-credential") {
            const credential = GoogleAuthProvider.credentialFromError(error);
            var email = error.customData.email;
            const providers = await fetchSignInMethodsForEmail(auth, email);
          }
        });
    });
  };
  const loginWithGithub = async (link = true, linkcredential) => {
    const provider = new GithubAuthProvider();
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          let displayName = user.displayName;
          let userWithEmail = await checkEmailExists(user.email);
          console.log("userWithEmail", userWithEmail);
          if (link && linkcredential != undefined) {
            return await linkWithCredential(result.user, linkcredential);
          }
          const githubResponse = await fetch(`https://api.github.com/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          let githubUserData;
          if (githubResponse.ok) {
            githubUserData = await githubResponse.json();
            displayName = githubUserData.login;
            console.log("githubUserData", githubUserData);
          }

          if (!userWithEmail) {
            if (user.displayName == null && !githubResponse.ok) {
              displayName = "User";
            } else if (user.displayName != null) {
              displayName = user.displayName;
              console.log("displayName1", displayName);
            }
            await addToFirebaseUsers(user.uid, user.email, displayName);
            toast.success("Login Successfully with Github ", {
              duration: 5000,
            });
          }
        })
        .catch(async (error) => {
          if (error.code === "auth/account-exists-with-different-credential") {
            const cred = GithubAuthProvider.credentialFromError(error);
            var email = error.customData.email;
            console.log("email", email);
            const providers = await fetchSignInMethodsForEmail(auth, email);
            if (providers[0] === "google.com") {
              setPersistence(auth, browserSessionPersistence).then(() => {
                LoginWithgoogle(true, cred);
              });
            }
          }
        });
    });
  };

  return (
    <>
      {/* <ThemeProvider theme={defaultTheme}> */}
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
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                mt: 14,
                mb: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 6 }}
              >
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  sx={{ marginBottom: 2 }}
                  name="email"
                  value={data.email}
                  onChange={dataChange}
                  required
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="auth-login-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    label="Password"
                    value={data.password}
                    id="password"
                    name="password"
                    onChange={dataChange}
                    type={values.showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label="toggle password visibility"
                        >
                          {values.showPassword ? (
                            <EyeOutline />
                          ) : (
                            <EyeOffOutline />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  className="login-button"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Link
                className="cursor-pointer"
                onClick={loginWithGithub}
                passHref
              >
                <Github />
              </Link>
              <Link
                className="cursor-pointer"
                onClick={LoginWithgoogle}
                passHref
              >
                <GoogleIcon />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Toaster position="top-center" reverseOrder={false} />
      {/* </ThemeProvider> */}
    </>
  );
}
