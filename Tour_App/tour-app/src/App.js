import "./App.css";
import { useState } from "react";
import TourContainer from "./components/TourContainer";
import Mock_data from "./constants/mock_data";
import RefreshPage from "./components/Refresh_Page";

function App() {
  const [data, setData] = useState(Mock_data);

  function dataHandler(id) {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  }

  function SetAllData() {
    setData(Mock_data);
  }

  return data.length === 0 ? (
    <RefreshPage SetAllData={SetAllData} />
  ) : (
    <div className="App">
      <TourContainer value={data} dataHandler={dataHandler} />;
    </div>
  );
}

export default App;
