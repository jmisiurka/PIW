import { useOutletContext } from "react-router-dom";
import Browse from "../Components/Browse";

const BrowsePage = () => {
    // const [offers, setOffers] = useOutletContext();

    return (
        <div>
            <section className="page-title">
                <article>
                    <p className="title-large">
                        Welcome, your tranquillity oasis awaits
                    </p>
                </article>
            </section>
            <Browse favorites="false" />
        </div>
    );
};

export default BrowsePage;
