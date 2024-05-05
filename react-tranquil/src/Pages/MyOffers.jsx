import Browse from "../Components/Browse";
import { readMyOffers } from "../data/offerService";
import { useEffect, useState } from "react";
import { useUser } from "../data/userService";

const MyOffers = () => {
    const [offers, setOffers] = useState([]);
    const user = useUser();

    useEffect(() => {
        readMyOffers().then((docs) => setOffers(docs));
    }, [user]);

    return (
        <div>
            <section className="page-title">
                <article>
                    <p className="title-large">
                        Your offers
                    </p>
                </article>
            </section>
            <Browse hotels={offers} />
        </div>
    );
};

export default MyOffers;
