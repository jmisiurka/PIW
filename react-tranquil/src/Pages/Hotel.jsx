// import { useOutletContext } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const Hotel = () => {
    const hotel = useLocation().state;

    console.log(hotel);

    return (
        <section id="hotel" className="grid hotel-section">
            <article className="hotel-main">
                <p className="title-large">{hotel.name}</p>
                <div className="hotel-image">
                    <p className="chip">
                        Add to favorites <FontAwesomeIcon icon={faHeart} />
                    </p>
                </div>
            </article>

            <section className="hotel-info">
                <article className="hotel-details">
                    <p>
                        <b>Location: </b>
                        {hotel.city}
                        <br />
                        <b>Local category: </b>
                        {"★".repeat(hotel.stars) + "☆".repeat(5 - hotel.stars)}
                        <br />
                        <b>Price: </b>
                        {hotel.price}€/room/night
                        <br />
                        <b>Description:</b>
                        <p className="text-small hotel-description">
                            {hotel.description}
                        </p>
                        <button
                            className="button primary"
                            onclick="contact.show()"
                        >
                            Contact <FontAwesomeIcon icon={faEnvelope} />
                        </button>
                    </p>
                </article>
                <article className="hotel-photos">
                    <div className="card-image"></div>
                    <div className="card-image"></div>
                </article>
            </section>
        </section>
    );
};

export default Hotel;
