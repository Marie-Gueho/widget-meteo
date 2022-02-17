import MeteoForm from "../MeteoForm";
import "./App.scss";

function App() {
  return (
    <main className="main">
      <MeteoForm defaultCity="Paris" />
    </main>
  );
}

export default App;
