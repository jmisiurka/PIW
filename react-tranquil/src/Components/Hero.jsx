import arrow from "../Assets/Arrow.svg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section id="hero" className="grid hero-section">
            <article className="hero-details">
                <p className="title-large">Your tranquillity oasis awaits</p>
                <p className="text-middle">
                    TranquilTravels is designed to help you find a serene
                    retreat for your next holidays. With us searching for the
                    hotels nestled amidst picturesque landscapes is easier than
                    ever.{" "}
                </p>
                <div className="hero-cards">
                    <div className="card-image">
                        <p
                            className="chip"
                            onClick={() =>
                                navigate("/browse", { state: { sort: "date" } })
                            }
                        >
                            New hotels <img src={arrow} alt="arrow" />
                        </p>
                    </div>
                    <div className="card-image">
                        <p
                            className="chip"
                            onClick={() =>
                                navigate("/browse", {
                                    state: { sort: "rating" },
                                })
                            }
                        >
                            Best reviews <img src={arrow} alt="arrow" />
                        </p>
                    </div>
                </div>
            </article>
            <div className="hero-image-container"></div>
        </section>
    );
};

export default Hero;
