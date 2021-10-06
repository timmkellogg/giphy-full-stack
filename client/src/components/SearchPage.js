import { useState } from 'react';
import axios from 'axios';

import { useAuth } from './ProvideAuth';

import '../styles/GifViewer.css';

function SearchPage() {
    const [input, setInput] = useState('');
    const [gifs, setGifs] = useState([]);

    const auth = useAuth();

    const handleSearch = () => {
        if (!input) return;

        axios.get(`gifs/search?input=${input}`, {headers: auth.authHeader() }).then((res) => {
            setGifs(res.data);
        }).catch((err) => {
            console.log(err);
        })
    };

    const handleSave = (url) => {
        axios.post('gifs', { url }, {headers: auth.authHeader() })
    };

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSearch}>seach</button>
            <div className='gifs-container'>
                {gifs.map((gif, index) => {
                    return (
                        <div key={index} className='gif-container' style={{ display: 'grid', alignContent: 'center' }}>
                            <img src={gif.images.fixed_width.url} />
                            <button onClick={() => handleSave(gif.images.fixed_width.url)}>save</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchPage;