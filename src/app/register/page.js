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
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import { Toaster, toast } from "react-hot-toast";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../firebase";
import {
  addToFirebaseUsers,
  checkEmailExists,
} from "../../utils/commonFunctions";
import { Github, GoogleIcon } from "@/helpers/icons";
const defaultTheme = createTheme();

export default function SignUp() {
  const [values, setValues] = useState({
    showPassword: false,
  });

  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = data;

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    let formIsValid = true;

    if (!firstName) {
      newErrors.firstName = "First Name is required";
      toast.error(newErrors.firstName);
      formIsValid = false;
      return formIsValid;
    }

    if (!lastName) {
      newErrors.lastName = "Last Name is required";
      toast.error(newErrors.lastName);
      formIsValid = false;
      return formIsValid;
    }

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

    if (!password) {
      newErrors.password = "Password is required";
      toast.error(newErrors.password);
      formIsValid = false;
      return formIsValid;
    } else if (password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long";
      toast.error(newErrors.password);
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
      console.log("Form is invalid");
      return;
    } else {
      console.log("Form is valid");
      await setPersistence(auth, browserSessionPersistence).then(async () => {
        await createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const uid = await auth.currentUser?.uid;
            await addToFirebaseUsers(uid, email, `${firstName} ${lastName}`);
            toast.success("User added successfully", { duration: 5000 });
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
                toast.error("Email already in use", { duration: 5000 });
                break;
              case "auth/invalid-email":
                toast.error("Invalid Email", { duration: 5000 });
                break;
              case "auth/weak-password":
                toast.error("Weak Password", { duration: 5000 });
                break;
              default:
                toast.error("Something went wrong", { duration: 5000 });
                break;
            }
          });
      });
    }
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
            toast.success("SignUp Successfully with Google ", {
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
            toast.success("SignUp Successfully with Github ", {
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              mt: 8,
              mx: 4,
              mb: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 6 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={data.firstName}
                    onChange={dataChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={data.lastName}
                    onChange={dataChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
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
                <FormControl sx={{ mt: 2, ml: 2 }} fullWidth>
                  <InputLabel htmlFor="auth-register-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    label="password"
                    name="password"
                    value={data.password}
                    id="auth-register-password"
                    onChange={dataChange}
                    required
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
                            <EyeOutline fontSize="small" />
                          ) : (
                            <EyeOffOutline fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Button
                onClick={handleSubmit}
                className="login-button"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
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
            <Link className="cursor-pointer" onClick={loginWithGithub} passHref>
              <Github />
            </Link>
            <Link className="cursor-pointer" onClick={LoginWithgoogle} passHref>
              <GoogleIcon />
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}
