import { useState } from "react";
import Gallery from "./Components/Gallery/Gallery";
import SearchBar from "./Components/SearchBar/SearchBar";


function App() {
  const [search, setSearch] = useState('random');

  const searchBarResult = (data) => {
    setSearch(data)
  }

  return (
    <div className="global-container">
      <SearchBar result={searchBarResult} />
      <Gallery data={search} />
    </div>
  );
}

export default App;
