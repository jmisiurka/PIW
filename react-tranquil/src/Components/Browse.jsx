import { useContext, useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import {
    readMultipleOffersById,
    readMyOffers,
    readOffers,
} from "../data/offerService";
import { useUser } from "../data/userService";
import FavContext from "../contexts/favorites";
import { useLocation } from "react-router-dom";

const Browse = ({ mode = "all", sort }) => {
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState(useLocation().state?.sort || "date");
    const [offersHTML, setOffersHTML] = useState([]);

    const { favoritesState, favoritesDispatch } = useContext(FavContext);

    const [offers, setOffers] = useState([]);
    const user = useUser();

    useEffect(() => {
        switch (mode) {
            case "favorites":
                readMultipleOffersById(favoritesState.favorites).then((docs) =>
                    setOffers(docs)
                );
                break;
            case "my":
                readMyOffers().then((docs) => setOffers(docs));
                break;
            case "all":
            default:
                readOffers().then((docs) => setOffers(docs));
                break;
        }
    }, [mode, favoritesState, user]);

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const HTML = offers
            .filter(
                (it) =>
                    it.name.includes(query) ||
                    it.location.includes(query) ||
                    it.description.includes(query)
            )
            .sort((a, b) => {
                switch (sortBy) {
                    case "name":
                        return a.name < b.name;
                    case "rating":
                        return a.stars < b.stars;
                    case "location":
                        return a.location < b.location;
                    case "price":
                        return a.price < b.price;
                    case "date":
                    default:
                        return a.created < b.created;
                }
            })
            .map((it) => (
                <HotelCard
                    key={it.id}
                    id={it.id}
                    name={it.name}
                    description={it.description}
                    location={it.location}
                    stars={it.stars}
                    price={it.price}
                />
            ));

        setOffersHTML(HTML);
    }, [sortBy, query, offers]);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        console.log(e.target.value);
    };

    return (
        <div>
            <section id="browse" className="browse-section">
                <p className="title-middle">Explore the hotels</p>
                <input
                    className="searchbar"
                    placeholder="Search by hotel name, place etc."
                    value={query}
                    onChange={handleSearch}
                />
                Sort by:
                <select
                    id="sort"
                    className="sort-choice"
                    onChange={handleSortChange}
                    value={sortBy}
                >
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                    <option value="location">Location</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                </select>
            </section>
            <section className="grid hotel-cards">{offersHTML}</section>
        </div>
    );
};

export default Browse;
