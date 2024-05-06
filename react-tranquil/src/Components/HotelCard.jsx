import { useNavigate } from "react-router-dom";
import arrow from "../Assets/Arrow.svg";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const HotelCard = ({ id, name, description, location, stars, price, imageURL }) => {
    const navigate = useNavigate();

    const handleOfferClick = () => {
        navigate("/hotel", {
            state: {
                id: id,
            },
        });
    };

    return (
        <article className="hotel-card">
            <div
                className="card-image browse-image"
                style={{ backgroundImage: `url(${imageURL})` }}
            >
                <p className="chip">{location}</p>
                <p className="chip heart">
                    <FontAwesomeIcon icon={faHeart} />
                </p>
            </div>
            <p className="text-middle">{name}</p>
            <p className="text-small">{description}</p>
            <div className="hotel-card-footer">
                <p className="text-middle">{"★".repeat(stars) + "☆".repeat(5 - stars)}</p>
                <p className="text-middle">{price}€/room</p>
            </div>
            <button className="button primary" onClick={handleOfferClick}>
                View offer <img src={arrow} alt="arrow" />
            </button>
        </article>
    );
};

export default HotelCard;
