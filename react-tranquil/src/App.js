import logo from "./logo.svg";
import "./App.css";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import BrowsePage from "./Pages/BrowsePage";
import Hotel from "./Pages/Hotel";
import AddOffer from "./Pages/AddOffer";
import MyOffers from "./Pages/MyOffers";
import Login from "./Pages/Login";
// import hotels_data from "./hotels_data";
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import SignUp from "./Pages/SignUp";
import { readOffers } from "./data/offerService";
import { useUser } from "./data/userService";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/add-offer" element={<AddOffer />} />
            <Route path="/my-offers" element={<MyOffers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
        </Route>
    )
);

function AppLayout() {
    const [offers, setOffers] = useState([]);
    const user = useUser();

    useEffect(() => {
        readOffers().then((docs) => setOffers(docs));
    }, [user]);

    return (
        <div>
            <Nav />
            <Outlet id="outlet" context={[offers, setOffers]} />
        </div>
    );
}

const App = () => <RouterProvider router={router} />;

export default App;
