import SiteNav from "./components/Sitenav/SiteNav";
import "./index.scss";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <SiteNav />
      <Home />
    </div>
  );
}

export default App;
