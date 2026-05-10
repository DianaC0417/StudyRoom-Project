import { type FormEvent, useState } from "react";
import "./LoginForm.css";

interface Props {
  onLogin?: (username: string) => void;
}

const LoginForm = ({ onLogin }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!username.trim()) e.username = "Escribe tu nombre de usuario";
    if (!password) e.password = "Escribe tu contraseña";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    onLogin?.(username.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="login-form" noValidate>
      <div className="input-group">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={errors.username ? "error" : ""}
        />
        {errors.username && <span className="input-error">{errors.username}</span>}
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? "error" : ""}
        />
        {errors.password && <span className="input-error">{errors.password}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
   
              
