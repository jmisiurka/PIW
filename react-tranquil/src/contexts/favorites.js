import { createContext, useReducer } from "react";

const initialState = {
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favReducer = (state, action) => {
    const { type, payload } = action;

    console.log(type);
    console.log(payload);

    switch (type) {
        case "ADD_TO_FAV":
            state = { favorites: [...state.favorites, payload] };
            break;
        case "REMOVE_FROM_FAV":
            state = {
                favorites: state.favorites.filter((id) => id !== payload),
            };
            break;
        default:
            console.error("Incorrect action type");
    }

    localStorage.setItem("favorites", JSON.stringify(state.favorites));

    return state;
};

const FavContext = createContext();

export const FavProvider = ({ children }) => {
    const [favoritesState, favoritesDispatch] = useReducer(
        favReducer,
        initialState
    );

    return (
        <FavContext.Provider value={{ favoritesState, favoritesDispatch }}>
            {children}
        </FavContext.Provider>
    );
};

export default FavContext;
