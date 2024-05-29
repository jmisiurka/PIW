import { useNavigate } from "react-router-dom";
import arrow from "../Assets/Arrow.svg";
import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import FavContext from "../contexts/favorites";

const HotelCard = ({
    id,
    name,
    description,
    location,
    stars,
    price,
    imageURL,
}) => {
    const navigate = useNavigate();
    const { favoritesState, favoritesDispatch } = useContext(FavContext);

    const handleOfferClick = () => {
        navigate("/hotel", {
            state: {
                id: id,
            },
        });
    };

    const isFavorite = () => {
        return favoritesState.favorites.some((offer) => offer === id);
    };

    return (
        <article className="hotel-card">
            <div
                className="card-image browse-image"
                style={{ backgroundImage: `url(${imageURL})` }}
            >
                <p className="chip">{location}</p>
                {isFavorite() && (
                    <button
                        className="chip heart"
                        onClick={() =>
                            favoritesDispatch({ type: "REMOVE_FROM_FAV", payload: id })
                        }
                    >
                        <FontAwesomeIcon icon={fullHeart} />
                    </button>
                )}
                {isFavorite() || (
                    <button
                        className="chip heart"
                        onClick={() =>
                            favoritesDispatch({ type: "ADD_TO_FAV", payload: id })
                        }
                    >
                        <FontAwesomeIcon icon={emptyHeart} />
                    </button>
                )}
            </div>
            <p className="text-middle">{name}</p>
            <p className="text-small">{description}</p>
            <div className="hotel-card-footer">
                <p className="text-middle">
                    {"★".repeat(stars) + "☆".repeat(5 - stars)}
                </p>
                <p className="text-middle">{price}€/room</p>
            </div>
            <button className="button primary" onClick={handleOfferClick}>
                View offer <img src={arrow} alt="arrow" />
            </button>
        </article>
    );
};

export default HotelCard;
