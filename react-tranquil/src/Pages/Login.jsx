import { useNavigate } from "react-router-dom";
import { login } from "../data/userService";

const Login = () => {
    const navigate = useNavigate();

    return (
        <main>
            <label htmlFor="email">E-mail</label>
            <input id="email" />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" />
            <br></br>
            <button className="button primary">Login with e-mail</button>

            <br />
            <br />
            <button className="button primary" onClick={() => login(navigate)}>
                Login with Google
            </button>
        </main>
    );
};

export default Login;
