import { useNavigate } from "react-router-dom";
import { loginEmail, loginGoogle } from "../data/userService";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        loginEmail(navigate, input).then(navigate("/"))
    };

    return (
        <div>
            <section className="page-title">
                <article>
                    <p className="title-large">Fill in your offer details</p>
                </article>
            </section>

            <main className="login-form">
                <div
                    className="login-form"
                >
                    <label htmlFor="email">
                        <b>E-mail</b>
                    </label>
                    <input
                        name="email"
                        className="textbox"
                        onChange={handleChange}
                        value={input.email}
                    />
                    <label htmlFor="password"><b>Password</b></label>
                    <input
                        name="password"
                        type="password"
                        className="textbox"
                        onChange={handleChange}
                        value={input.password}
                    />
                    <br></br>
                    <button className="button primary" onClick={handleSubmit}>
                        Login with E-mail
                    </button>

                    <Link to="/sign-up">Create an account</Link>
                </div>

                <hr style={{ width: "30%" }} />
                <br />
                <button
                    className="button primary"
                    onClick={() => loginGoogle(navigate)}
                >
                    Login with Google
                </button>
            </main>
        </div>
    );
};

export default Login;
