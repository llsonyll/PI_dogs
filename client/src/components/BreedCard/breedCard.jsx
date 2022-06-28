import "./breedCard.scss";
import { Link } from "react-router-dom";

const BreedCard = ({ breed }) => {
  const getTemperaments = () => {
    const temperaments = breed.temperament.split(", ");
    if (temperaments.length > 6) {
      return temperaments.slice(0, 6);
    }
    return temperaments;
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#000",
  };

  const isFromDogAPI = Object.keys(breed).length > 7;

  return (
    <Link
      to={`/breed/${breed.id}?isFromDogAPI=${isFromDogAPI}`}
      style={linkStyle}
    >
      <div className="breedCard">
        <img src={breed.image.url ?? ""} alt="breedImg" className="breedImg" />
        <div className="breedInfo">
          <div className="name"> {breed.name}</div>
          <div className="weight"> {breed.weight.metric}kg </div>
          <div className="temperaments">
            {breed.temperament ? (
              getTemperaments().map((temp, index) => {
                return (
                  <div className="temperament" key={index}>
                    {temp}
                  </div>
                );
              })
            ) : (
              <div className="">Sin temperamentos registrados</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BreedCard;
