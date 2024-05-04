import logo from "./logo.svg";
import "./App.css";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import BrowsePage from "./Pages/BrowsePage";
import Hotel from "./Pages/Hotel";
import AddOffer from "./Pages/AddOffer";
import Login from "./Pages/Login";
import hotels_data from "./hotels_data";
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import { useState } from "react";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/add-offer" element={<AddOffer />} />
            <Route path="/login" element={<Login />} />
        </Route>
    )
);

function AppLayout() {
    const [hotels, setHotels] = useState(hotels_data);

    return (
        <div>
            <Nav />
            <Outlet context={[hotels, setHotels]} />
        </div>
    );
}

const App = () => <RouterProvider router={router} />;

export default App;
