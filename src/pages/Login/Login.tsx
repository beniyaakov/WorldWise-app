import { useNavigate } from "react-router-dom";
import PageNav from "../../ui/PageNav/PageNav";
import { useAuth } from "../../contexts/FackAuthContext";
import styles from "./Login.module.css";
import { FormEvent, useEffect, useState } from "react";
import Button from "../../ui/Button/Button";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("beni@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();


  
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  }
  useEffect(() => {
    if (isAuthenticated) navigate("/app",{replace:true});
    
  }, [isAuthenticated,navigate]);
  
  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">login</Button>
        </div>
      </form>
    </main>
  );
}
