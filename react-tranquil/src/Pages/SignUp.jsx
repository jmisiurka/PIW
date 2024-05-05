import { useState } from "react";
import { registerEmail } from "../data/userService";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        registerEmail(navigate, input).then(navigate("/"))
    };

    return (
        <div>
            <section className="page-title">
                <article>
                    <p className="title-large">Fill in your offer details</p>
                </article>
            </section>
            <main className="register-form">
                <div className="register-form">
                    <label htmlFor="email">
                        <b>E-mail</b>
                    </label>
                    <input
                        name="email"
                        className="textbox"
                        onChange={handleChange}
                        value={input.email}
                    />
                    <label htmlFor="password">
                        <b>Password</b>
                    </label>
                    <input
                        name="password"
                        type="password"
                        className="textbox"
                        onChange={handleChange}
                        value={input.password}
                    />
                    <br></br>
                    <button className="button primary" onClick={handleSubmit}>
                        Register with E-mail
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SignUp;
