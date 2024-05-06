import { useEffect, useState } from "react";
import { addOffer, updateOffer } from "../data/offerService";
import { useUser } from "../data/userService";
import { useLocation, useNavigate } from "react-router-dom";

const OfferDetailsForm = () => {
    const user = useUser();
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        location: "",
        description: "",
        stars: 0,
        price: 0,
    });

    const state = useLocation().state;
    useEffect(() => {
        if (state != null) {
            setData(state);
        }
    }, [state]);

    const handleChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        console.log(data);
        if (state == null) {
            const id = await addOffer(data);
            navigate("/hotel", { state: { id: id } });
        } else {
            await updateOffer(state.id, data);
            navigate("/hotel", { state: { id: state.id } });
        }
    };

    return (
        <div>
            <section className="page-title">
                <article>
                    <p className="title-large">
                        {state == null
                            ? "Fill in your offer details"
                            : "Edit your offer details"}
                    </p>
                </article>
            </section>
            {!!user || (
                <div className="hotel-details-form">
                    <b>You need to be logged in to add an offer</b>
                </div>
            )}

            {!!user && (
                <div className="hotel-details-form">
                    <label htmlFor="name">
                        <b>Name: </b>
                    </label>
                    <input
                        name="name"
                        className="textbox"
                        placeholder="Your hotel name"
                        onChange={handleChange}
                        value={data.name}
                    ></input>

                    <label htmlFor="location">
                        <b>Location: </b>
                    </label>
                    <input
                        name="location"
                        className="textbox"
                        placeholder="Location of your hotel"
                        onChange={handleChange}
                        value={data.location}
                    ></input>

                    <label htmlFor="description">
                        <b>Description: </b>
                    </label>
                    <textarea
                        name="description"
                        className="textbox textbox-large"
                        type="textarea"
                        placeholder="Enter your description"
                        onChange={handleChange}
                        value={data.description}
                    />

                    <label htmlFor="stars">
                        <b>Rating: </b>
                    </label>
                    <input
                        name="stars"
                        className="numeric-input"
                        type="number"
                        min="0"
                        max="5"
                        placeholder="5"
                        onChange={handleChange}
                        value={data.stars}
                    />

                    <label htmlFor="price">
                        <b>Price: </b>
                    </label>
                    <input
                        name="price"
                        className="numeric-input"
                        type="number"
                        min="0"
                        placeholder="Price in euro/night"
                        onChange={handleChange}
                        value={data.price}
                    />
                    <button
                        id="submit-offer"
                        className="button primary"
                        onClick={handleSubmit}
                    >
                        Submit offer
                    </button>
                </div>
            )}
        </div>
    );
};

export default OfferDetailsForm;
