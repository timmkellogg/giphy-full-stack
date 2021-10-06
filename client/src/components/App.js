import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import axios from 'axios';

import { ProvideAuth } from './ProvideAuth';
import PrivateRoute from './PrivateRoute';
import LoginPage from './LoginPage';
import SearchPage from './SearchPage';
import SavedPage from './SavedPage';
import Navi from './Navi';


function App() {
    const [gifs, setGifs] = useState([]);
    const [savedGifs, setSavedGifs] = useState([]);
    const [gifInput, setGifInput] = useState('');

    useEffect(() => {
        const savedGifs = localStorage.getItem('savedGifs');

        if (savedGifs) setSavedGifs(JSON.parse(savedGifs));
    }, []);

    const handleInput = (event) => {
        setGifInput(event.target.value);
    };

    const handleRemoveGif = (gif) => {
        const newArray = savedGifs.filter((savedGif) => savedGif !== gif);

        setSavedGifs(newArray);
        localStorage.setItem('savedGifs', JSON.stringify(newArray));
    };

    const handleSaveGif = (gif) => {
        const newArray = [...savedGifs, gif];

        setSavedGifs(newArray);
        localStorage.setItem('savedGifs', JSON.stringify(newArray));
    };

    const handleSearchGifs = async () => {
        if (!gifInput) return;

        const res = await axios.get(`https://api.giphy.com/v1/gifs/search?&q=${gifInput}&api_key=HmEX7II3wXDKvQ7d1d10aO23CimFAj1J&rating=g&limit=10`);

        setGifs(res.data.data);
    };

    return (
        <ProvideAuth>
            <Router>
                <div>
                    <Navi />

                    <Switch>
                        <PrivateRoute path='/saved'>
                            <SavedPage />
                        </PrivateRoute>
                        <PrivateRoute path='/search'>
                            <SearchPage />
                        </PrivateRoute>

                        <Route path='/login' exact>
                            <LoginPage />
                        </Route>

                        <Route path='/'>
                            <h1>Homepage</h1>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    );
}

export default App;
