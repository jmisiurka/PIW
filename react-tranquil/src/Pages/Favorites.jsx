import Browse from "../Components/Browse";

const Favorites = () => {
    return (
        <div>
            <section className="page-title">
                <article>
                    <p className="title-large">
                        Your favorite offers
                    </p>
                </article>
            </section>
            <Browse favorites={true} />
        </div>
    );
};

export default Favorites;
