import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "../data/userService";
import { readOfferById } from "../data/offerService";
import { useEffect, useState } from "react";

const Hotel = () => {
    const [offer, setOffer] = useState({});
    const [owner, setOwner] = useState(false);
    const user = useUser();

    const offerId = useLocation().state.id;

    console.log(offerId);

    useEffect(() => {
        readOfferById(offerId).then((doc) => setOffer(doc));
    }, [offerId]);

    const navigate = useNavigate();

    useEffect(() => {
        // user is null before it loads
        if (user != null) {
            setOwner(user.uid === offer.userId);
        }
    }, [offer, user]);

    const handleEdit = () => {
        navigate("/edit-offer", { state: { ...offer, id: offerId } });
    };

    return (
        <section id="hotel" className="grid hotel-section">
            <article className="hotel-main">
                <p className="title-large">{offer.name}</p>
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
                        {offer.location}
                        <br />
                        <b>Local category: </b>
                        {"★".repeat(offer.stars) + "☆".repeat(5 - offer.stars)}
                        <br />
                        <b>Price: </b>
                        {offer.price}€/room/night
                        <br />
                        <b>Description:</b>
                        <p className="text-small hotel-description">
                            {offer.description}
                        </p>
                        <button
                            className="button primary"
                            onclick="contact.show()"
                        >
                            Contact <FontAwesomeIcon icon={faEnvelope} />
                        </button>
                        {owner && (
                            <button
                                className="button primary"
                                onClick={handleEdit}
                            >
                                Edit hotel info
                            </button>
                        )}
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
