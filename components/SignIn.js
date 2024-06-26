import styles from '../styles/SignIn.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login, logout } from '../reducers/user';

function SignIn() {

    const [ userDetails, setUserDetails ] = useState({ username: '', password: ''});

    const dispatch = useDispatch();
    const router = useRouter();

    const handleSignin = () => {
        console.log('User login details : ', userDetails);
		fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 
                username: userDetails.username, 
                password: userDetails.password
            }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
                    console.log('Login OK, details are : ', data);
					dispatch(login({ 
                        username: userDetails.username,
                        userid: data.userid,
                        token: data.token
                    }));
					setSignInUsername('');
					setSignInPassword('');
                    router.push('/Home');
				}
			});
    };  

    const setSignInUsername = (username) => {
        setUserDetails({
            ...userDetails,
            username: username
        });
    }    

    const setSignInPassword = (password) => {
        setUserDetails({
            ...userDetails,
            password: password
        });
    }

    return(
    <>
		<div className={styles.registerSection}>
			<p>Connect to hackatweet</p>
			<input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={userDetails.username} />
			<input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={userDetails.password} />
			<button id="connection" onClick={() => handleSignin()}>Signin</button>
		</div>
      </>
    )
}

export default SignIn;
