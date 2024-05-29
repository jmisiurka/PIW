import logo from "./logo.svg";
import "./App.css";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import BrowsePage from "./Pages/BrowsePage";
import Hotel from "./Pages/Hotel";
import OfferDetailsForm from "./Pages/OfferDetailsForm";
import MyOffers from "./Pages/MyOffers";
import Login from "./Pages/Login";
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import SignUp from "./Pages/SignUp";
import { useUser } from "./data/userService";
import { FavProvider } from "./contexts/favorites";
import Favorites from "./Pages/Favorites";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/edit-offer" element={<OfferDetailsForm />} />
            <Route path="/my-offers" element={<MyOffers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/favorites" element={<Favorites />} />
        </Route>
    )
);

const InnerLayout = () => {
    const user = useUser();

    return (
        <div>
            <Nav />
            <Outlet id="outlet" />
        </div>
    );
};

function AppLayout() {
    return (
        <div>
                <FavProvider>
                    <InnerLayout />
                </FavProvider>
        </div>
    );
}

const App = () => <RouterProvider router={router} />;

export default App;
