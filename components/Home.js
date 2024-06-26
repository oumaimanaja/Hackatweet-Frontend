import styles from '../styles/Home.module.css';
import { useSelector } from 'react-redux';

function Home() {

	const user = useSelector((state) => state.user.value);

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome 
          <p>Username : {user.username}</p>
          <p>token: {user.token}</p>
          <p>userid: {user.userid}</p>
        </h1>
      </main>
    </div>
  );
}

export default Home;
