import "./breedDetail.scss";
// import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import { breeds } from "../../constants/data";

// Icons
// import { MdDoubleArrow } from "react-icons/md";

const dogBreed = breeds[0];

const BreedDetail = () => {
  return (
    <div className="breedDetail">
      <NavBar landing={false} justify="space-between" title={`Breed Detail`} />
      <div className="content">
        <div className="dogCard">
          <img src={dogBreed.image.url} alt="breedImg" />
        </div>
        <div className="detailsCard">
          <div className="title"> {`Breed: ${dogBreed.name}`} </div>
          <div className="detailRow">
            <div className="subtitle"> LifeTrail </div>
            <div className="text"> {dogBreed.life_span}</div>
          </div>
          <div className="detailRow">
            <div className="subtitle"> Height </div>
            <div className="text"> {dogBreed.height.imperial}</div>
          </div>
          <div className="detailRow">
            <div className="subtitle"> Weight </div>
            <div className="text"> {dogBreed.weight.imperial}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedDetail;
