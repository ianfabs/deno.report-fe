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

      setMods(
        Object.entries(req)
          .filter(mod => mod[0].includes(searchInput))
          .map(async mod => {
            let reqSize = await fetch(
              "http://localhost:8000/check?slug=x/" + mod[0] + "/mod.ts"
            ).then(res => res.text());

            mod[2] = reqSize;
          })
      );
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
          <li>{mod[0]}</li>
        ))}
      </ul>
    </div>
  );
}
