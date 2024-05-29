import arrow from "../Assets/Arrow.svg"

const Rent = () => {
    return (
        <section id="rent" className="footer grid">
            <div className="card-image"></div>
            <article className="footer-details">
                <p className="title-large">Rent with us!</p>
                <p className="text-middle">
                    If you’re a hotel or an apartament owner who’s looking to
                    reach more customers you can now rent your property with
                    TranquilTravels.{" "}
                </p>
                <button className="button secondary">
                    Learn more <img src={arrow} alt="arrow" />
                </button>
            </article>
        </section>
    );
};

export default Rent;