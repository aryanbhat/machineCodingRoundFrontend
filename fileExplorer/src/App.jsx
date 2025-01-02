import "./App.css";
import Folder from "./components/folder";
import fileData from "./data/fileData.json";

function App() {
  return (
    <>
      <h1>Your File explorer</h1>
      <div className="folder__list">
        <Folder files={fileData[0]} />
      </div>
    </>
  );
}

export default App;
