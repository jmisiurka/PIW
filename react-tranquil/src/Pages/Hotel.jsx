import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "../data/userService";
import { readOfferById } from "../data/offerService";
import { useContext, useEffect, useState } from "react";
import FavContext from "../contexts/favorites";
import Toast from "../Components/Toast";

const Hotel = () => {
    const [offer, setOffer] = useState({});
    const [owner, setOwner] = useState(false);
    const [toast, setToast] = useState({ message: "", visible: false });
    const { favoritesState, favoritesDispatch } = useContext(FavContext);
    const user = useUser();

    const [modalShown, setModalShown] = useState(false);

    const offerId = useLocation().state.id;

    const isFavorite = () => {
        return favoritesState.favorites.some((id) => id === offerId);
    };

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

    const handleSendMessage = () => {
        setToast({
            message: "Your message has been sent!",
            visible: true,
        });
        setModalShown(false);
    };

    const onToastClose = () => {
        setToast({ message: "", visible: false });
        console.log(toast);
    };

    return (
        <section id="hotel" className="grid hotel-section">
            {toast.visible && <Toast message={toast.message} onClose={onToastClose}/>}
            {modalShown && (
                <div id="contactDialog">
                    <div className="modal">
                        <button
                            className="button close-button"
                            onClick={() => setModalShown(false)}
                        >
                            <i className="fa fa-regular fa-x"></i>
                        </button>
                        <div className="modal-content">
                            <p className="title-large">Contact</p>
                            <p className="text-small">
                                You are contacting {offer.name}
                            </p>
                            <textarea className="contact-textbox"></textarea>
                        </div>
                        <div className="modal-buttons">
                            <button
                                className="button"
                                onClick={() => setModalShown(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="button primary"
                                onClick={() => handleSendMessage()}
                            >
                                Send
                                <i className="fa fa-regular fa-envelope"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <article className="hotel-main">
                <p className="title-large">{offer.name}</p>
                <div className="hotel-image">
                    {isFavorite() && (
                        <p
                            className="chip"
                            onClick={() =>
                                favoritesDispatch({
                                    type: "REMOVE_FROM_FAV",
                                    payload: offerId,
                                })
                            }
                        >
                            Remove from favorites{" "}
                            <FontAwesomeIcon icon={fullHeart} />
                        </p>
                    )}
                    {isFavorite() || (
                        <p
                            className="chip"
                            onClick={() => {
                                favoritesDispatch({
                                    type: "ADD_TO_FAV",
                                    payload: offerId,
                                });
                            }}
                        >
                            Add to favorites{" "}
                            <FontAwesomeIcon icon={emptyHeart} />
                        </p>
                    )}
                </div>
            </article>

            <section className="hotel-info">
                <article className="hotel-details">
                    <div>
                        {owner && (
                            <button
                                className="button primary"
                                onClick={handleEdit}
                            >
                                Edit hotel info{" "}
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                        )}
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
                            onClick={() => setModalShown(true)}
                        >
                            Contact <FontAwesomeIcon icon={faEnvelope} />
                        </button>
                    </div>
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
