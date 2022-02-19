import React, { useState } from 'react';
import './SearchBar.css';
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { IconContext } from 'react-icons/lib';

const SearchBar = ({ result }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e) => setSearchInput(e.target.value)
    const clearInput = () => setSearchInput('')

    const preventEvent = (e) => {
        e.preventDefault()
        sendSearchData()
    }

    const sendSearchData = () => {
        result(searchInput)
        setSearchInput('')
    }

    return (
        <form className='search-form' onSubmit={preventEvent}>
            <label htmlFor="search">Votre recherche</label>
            <div className="input-icon">
                <IconContext.Provider
                    value=
                    {
                        {
                            color: "#878787",
                            className: 'search-icon'
                        }
                    }
                >
                    <AiOutlineSearch onClick={sendSearchData} />
                </IconContext.Provider>

                {searchInput !== '' && <IconContext.Provider
                    value=
                    {
                        {
                            color: "#878787",
                            className: 'clear-icon'
                        }
                    }
                >
                    <AiOutlineClose onClick={clearInput} />
                </IconContext.Provider>}

                <input type="text" className='search-input' placeholder='Search free high-resolution photos' autoComplete='on' onChange={handleChange} value={searchInput} />
            </div>
        </form>
    );
};

export default SearchBar;