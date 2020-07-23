import React from "react";
import "./styles.css";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";

const third_party_uri =
  "https://raw.githubusercontent.com/denoland/deno_website2/master/database.json";

export default function App() {
  const [searchInput, setSearchInput] = React.useState("");
  const [mods, setMods] = React.useState([]);

  React.useEffect(() => {
    const wrapper = async () => {
      let req = await fetch(third_party_uri).then(res => res.json());

      let __mods = Object.entries(req)
        .filter(mod => mod[0].includes(searchInput))
        .map(mod => {
          mod[2] = `http://3.130.89.246:8000/check?slug=${"x/" + mod[0]}`;
          return mod;
        });

      for (let mod of mods) {
        let sizeReq;
        try {
          sizeReq = await fetch(mod[2]);
          mod[1] = {
            ...mod[1],
            size: sizeReq.text()
          };
        } catch {}
      }

      setMods(__mods);
    };
    wrapper();
  }, [searchInput]);

  return (
    <div className="App">
      <SearchBox
        placeholder="Search"
        value={searchInput}
        onSearch={newValue => setSearchInput(newValue)}
      />
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <ul>
        {mods.map(mod => (
          <li>
            {mod[0]} - {mod[1].size}
            {/* <button onClick={}>See Size</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
