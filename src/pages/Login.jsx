import { useState } from 'react';
import styles from '../styles.module.css';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Chame a função isAuthenticated aqui com username e password
      const usuarioValidado = await isAuthenticated(usuario, password);
      // localStorage.setItem('usuarioValidado', usuarioValidado);

    if (usuarioValidado) {
      // Se o usuário for validado, defina o valor 'true' no localStorage
      localStorage.setItem('authenticated', true);
      navigate("/home");
    } else {
      // Se a autenticação falhar, exiba uma mensagem de erro
      setMessage("Usuário ou senha inválidos"); 
    } 

  } catch (error) {
    console.error('Erro ao enviar requisição: ', error);
    setMessage("Erro ao enviar requisição: " + error.message);
  }
  };

  return (
    <div className={styles.login}>
      <div className={styles.texto_login}>
        <h1 className={styles.logo}> <img src=".\src\assets\logo.png" alt="Logo" id="logo" /> ASSET HUB</h1>
        <h3 className={styles.texto}>Bem-Vindo</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.container_login}>
          <div className={styles.wrap_login}>
            <form className={styles.login_form} onSubmit={handleSubmit}>
              <span className={styles.login_form_title}>Acesse sua conta</span>
              <div className={styles.wrap_input}>
                <input
                  className={`${usuario !== "" ? styles.has_val : ""} ${styles.input}`}
                  type="text" 
                  value={usuario}
                  onChange={e => setUsuario(e.target.value)}               
                />
                <span className={styles.focus_input} data-placeholder="Usuario"></span>
              </div>

              <div className={styles.wrap_input}>
                <input 
                  className={`${password !== "" ? styles.has_val : ""} ${styles.input}`} 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <span className={styles.focus_input} data-placeholder="Senha"></span>
              </div>

              <div className={styles.container_login_form_btn}>
                <button type="submit" className={styles.login_form_btn}>
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className='versao'>Versão 1.0.0</p>
    </div>
  );
}

export default Login;