import styles from "../styles/Login.module.css";
import { Modal, Button } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useRouter } from "next/router";

function Login() {
  // TODO : Redirect to Home page if user is already connected.
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  user.token && router.push("/Home");

  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const showSigninModal = () => {
    setIsSigninModalOpen(true);
  };

  const showSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  console.log("open status : ", isSigninModalOpen);
  return (
    <div className=" min-h-screen flex bg-slate-900 text-white">
      <div className="w-1/2 flex items-center justify-center bg-slate-900 text-white">
        <img
          src="../twitter.png"
          className="w-full h-full object-cover"
          alt="Picture of the author"
        ></img>
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center bg-slate-900 text-white">
        <h1 className="text-5xl font-bold mb-4 "> See what's happening</h1>
        <p className="text-2xl mb-8">Join Hackatweet today.</p>
        <div>
          <Button
            className="rounded-full w-32  py-4"
            type="primary"
            onClick={() => showSignupModal()}
          >
            Signup
          </Button>
          <Modal
            title="Sigup"
            open={isSignupModalOpen}
            footer={null}
            closable={true}
          >
            <SignUp />
          </Modal>
        </div>
        <br />
        <div className="italic  text-slate-900">Already have an account ? </div>
        <div>
          <Button
            className="bg-slate-400 rounded-full  w-32 py-4"
            type="primary"
            onClick={() => showSigninModal()}
          >
            Signin
          </Button>
          <Modal
            title="Signin"
            open={isSigninModalOpen}
            footer={null}
            closable={true}
          >
            <SignIn />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Login;
