import styles from "./Home.module.css";
const Home = () => {
  return (
    <p className={styles.about}>
      Welcome to Contact Manger. The application is designed to provide its
      users with a functionality to manage multiple contacts with an ease.
      Contacts Manager makes it possible to store, edit, delete contacts. The
      application can be accessed from mobile, tablets or computers. The
      application offers a security feature with only register members being
      able to access their data after providing the correct emaild id and
      password.
    </p>
  );
};

export default Home;
