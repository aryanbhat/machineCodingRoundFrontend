import StarRating from "./components/StarRating";
import "./App.css";

function App() {
  return (
    <>
      <div className=" app">
        <StarRating starCount={10} />
      </div>
    </>
  );
}

export default App;
