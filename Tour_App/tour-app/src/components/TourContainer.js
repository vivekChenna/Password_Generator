import Card from "./Card";

const TourContainer = ({ value, dataHandler }) => {
  return (
    <div className="container">
      <div>
        <h1 className="title">Tour With React</h1>
      </div>

      <div className="cards ">
        {value.map((obj) => {
          return <Card {...obj} key={obj.id} dataHandler={dataHandler} />;
        })}
      </div>
    </div>
  );
};

export default TourContainer;
