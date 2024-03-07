import React from "react";
import { useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { signInSuccess } from "../redux/user/userSlice.js";

const OAuth = () => {
  const navigate = useNavigate()
  const dispatch  = useDispatch();
  const handleGoogleClick = async () => {
    const auth = getAuth(app);
    
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogleAuth = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogleAuth.user.displayName,
          email: resultFromGoogleAuth.user.email,
          googlePhotoUrl: resultFromGoogleAuth.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/")
      }
    } catch (error) {
      console.log("Error with google oauth", error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
