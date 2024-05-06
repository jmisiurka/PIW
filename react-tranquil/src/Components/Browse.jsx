import { useState } from "react";
import HotelCard from "./HotelCard";

const Browse = (hotels) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    // without it it crashes on all pages other than browse
    if (hotels.hotels == null) {
        return null;
    }

    const hotelsHTML = hotels.hotels
        .filter(
            (it) =>
                it.name.includes(query) ||
                it.city.includes(query) ||
                it.description.includes(query)
        )
        .map((it) => (
            <HotelCard
                key={it.id}
                id={it.id}
                name={it.name}
                description={it.description}
                city={it.city}
                stars={it.stars}
                price={it.price}
            />
        ));

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
                <select id="sort">
                    <option>Date</option>
                    <option></option>
                </select>
            </section>
            <section className="grid hotel-cards">{hotelsHTML}</section>
        </div>
    );
};

export default Browse;
