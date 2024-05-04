const AddOffer = () => {
    return (
        <div>
            <section className="page-title">
                <article>
                    <p className="title-large">Fill in your offer details</p>
                </article>
            </section>
            <article className="hotel-details-form">
                <label htmlFor="name">
                    <b>Name: </b>
                </label>
                <input
                    id="name"
                    className="textbox"
                    placeholder="Your hotel name"
                ></input>

                <label htmlFor="location">
                    <b>Location: </b>
                </label>
                <input
                    id="location"
                    className="textbox"
                    placeholder="Location of your hotel"
                ></input>

                <label htmlFor="description">
                    <b>Description: </b>
                </label>
                <textarea
                    id="description"
                    className="textbox textbox-large"
                    type="textarea"
                    placeholder="Enter your description"
                />

                <label htmlFor="stars">
                    <b>Rating: </b>
                </label>
                <input
                    id="stars"
                    className="numeric-input"
                    type="number"
                    min="0"
                    max="5"
                    placeholder="5"
                />

                <label htmlFor="price">
                    <b>Price: </b>
                </label>
                <input
                    id="price"
                    className="numeric-input"
                    type="number"
                    min="0"
                    placeholder="Price in euro/night"
                />
            <button id="submit-offer" className="button primary">
                Submit offer
            </button>
            </article>

        </div>
    );
};

// {
//     id: 2,
//     name: "Serene Retreat",
//     description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
//     city: "Madrid",
//     stars: 5,
//     price: 250,
//     imageURL: "/cards1.jpg"
// },

export default AddOffer;
