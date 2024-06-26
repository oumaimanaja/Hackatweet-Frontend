import styles from '../styles/Login.module.css';
import { Modal, Button } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useRouter } from 'next/router';


function Login() {
    // TODO : Redirect to Home page if user is already connected.
	const user = useSelector((state) => state.user.value);
    const router = useRouter();

    user.token && router.push('/Home');

    const [ isSigninModalOpen, setIsSigninModalOpen ] = useState(false);
    const [ isSignupModalOpen, setIsSignupModalOpen ] = useState(false);

    const showSigninModal = () => {
        setIsSigninModalOpen(true);
    }
    
    const showSignupModal = () => {
        setIsSignupModalOpen(true);
    }

    console.log('open status : ', isSigninModalOpen)
    return(
        <div>
            <h1> See what's happening</h1>
            <p>Join Hackatweet today.</p>
            <div>
                <Button type="primary" onClick={() => showSignupModal()}>
                    Signup
                </Button>
                <Modal title="Sigup" open={isSignupModalOpen} footer={null} closable={true} >
                    <SignUp />
                </Modal>
            </div>
            <br />
            <div>
                <Button type="primary" onClick={() => showSigninModal()}>
                    Signin
                </Button>
                <Modal title="Signin" open={isSigninModalOpen} footer={null} closable={true}>
                    <SignIn />
                </Modal>
            </div>
        </div>
    )
}

export default Login;