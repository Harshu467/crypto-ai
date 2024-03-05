"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { EyeOffOutline, EyeOutline } from "mdi-material-ui";
import { useState, useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import toast, { Toaster } from "react-hot-toast";
import { updatePassword } from "firebase/auth";

const Profile = () => {
  // const {uid}  = useParamss
  const { uid } = useParams();
  const { login, name, email } = useContext(UserContext);
  const [values, setValues] = useState({
    showPassword: false,
  });

  const [data, setdata] = useState({
    Name: "",
    Email: "",
    password: "",
  });
  const { Name, Email, password } = data;
  const validateForm = () => {
    let formIsValid = true;
    if (!newName) {
      toast.error("Name is required");
      formIsValid = false;
      return formIsValid;
    }
    if (!password) {
      toast.error("Password is required");
      formIsValid = false;
      return formIsValid;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      formIsValid = false;
      return formIsValid;
    }
    return formIsValid;
  };
  // const updateName = async (uid, newName) => {
  //   const userRef = query(collection(db, "users"), where("uid", "==", uid));
  //   if (!userRef) {
  //     toast.error("User not found");
  //     return;
  //   } else if (userRef) {
  //     await updateDoc(doc(db, "users", userRef), {
  //       Name: newName,
  //     });
  //     toast.success("Name updated successfully");
  //   }
  // };
  const updateName = async (uid, newName) => {
    try {
        const userQuery = query(collection(db, "users"), where("uid", "==", uid));
        const userSnapshot = await getDocs(userQuery);
        if (userSnapshot.empty) {
            toast.error("User not found");
            return;
        }
        userSnapshot.forEach(async (doc) => {
            try {
                await updateDoc(doc.ref, {
                    name: newName,
                });
                toast.success("Name updated successfully");
            } catch (error) {
                console.error("Error updating name:", error);
                toast.error("Failed to update name");
            }
        });
    } catch (error) {
        console.error("Error querying for user:", error);
        toast.error("Failed to update name");
    }
};

  const updatePass = async (uid, password) => {
    let user = auth.currentUser;
    const valid = validateForm();
    if (!valid) {
      return;
    } else {
      updatePassword(user, password)
        .then(() => {
          toast.success("Password updated successfully");
        })
        .catch((error) => {
          let errorCode = error.code;
          switch (errorCode) {
            case "auth/requires-recent-login":
              toast.error("Please re-login to update password");
              break;
            default:
              toast.error(`Error updating password ${errorCode}`);
              break;
          }
        });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formIsValid = validateForm();
    if (!formIsValid) {
      console.log("form is not valid");
      return;
    } else {
      await updateName(uid, newName);
      await updatePass(uid, password);
    }
  };
  useEffect(() => {
    if (login) {
      setdata({
        Name: name,
        Email: email,
      });
    }
  }, [login]);
  const [newName, setNewName] = useState(data.Name);
  console.log("NewName", newName);
  const dataChange = (event) => {
    const newData = { ...data, [event.target.name]: event.target.value };
    setdata(newData);
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar />
      <section className="flex text-white flex-col gap-4 md:flex-row xsm:my-2 p-4 md:p-8">
        <div className="w-full md:w-[50%] h-full lg:max-w-[35%] flex flex-col shadow-xl rounded-md mb-4 md:sticky md:top-28 px-8 text-white border border-gray-800 mt-1">
          <h1
            className={`text-center text-[20px] text-gradient mb-4 pt-4 sm:pt-12 mx-auto`}
          >
            Update Profile
          </h1>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="Name"
                  name="Name"
                  label="Full Name"
                  variant="filled"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                  required
                  fullWidth
                  sx={{
                    bgcolor: "gray",
                    color: "white",
                    borderColor: "white",
                    borderRadius: "5px",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  name="Email"
                  label="Email"
                  variant="filled"
                  fullWidth
                  value={data.Email}
                  disabled
                  required
                  sx={{
                    bgcolor: "gray",
                    color: "white",
                    borderColor: "white",
                    borderRadius: "5px",
                  }}
                />
              </Grid>
              <FormControl
                sx={{
                  mt: 2,
                  ml: 2,
                  bgcolor: "gray",
                  color: "white",
                  borderColor: "white",
                  borderRadius: "5px",
                }}
                variant="filled"
                fullWidth
              >
                <InputLabel htmlFor="auth-register-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  label="password"
                  name="password"
                  value={data.password}
                  variant="filled"
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
              sx={{ mt: 4, mb: 6, textTransform: "none" }}
            >
              Save Changes
            </Button>
          </Box>
        </div>
        <div className="w-full md:w-3/4 md:mx-2 flex flex-col rounded-md "></div>
      </section>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Profile;
