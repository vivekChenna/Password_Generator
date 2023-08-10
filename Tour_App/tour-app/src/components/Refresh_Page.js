const RefreshPage = ({ SetAllData }) => {
  return (
    <div className="refresh-pg">
      <p>No Tours Left</p>
      <button onClick={SetAllData} className="refresh-btn">Refresh</button>
    </div>
  );
};

export default RefreshPage;
