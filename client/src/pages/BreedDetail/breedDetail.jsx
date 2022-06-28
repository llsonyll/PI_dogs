import "./breedDetail.scss";
// import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner";
import { breeds } from "../../constants/data";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreedById } from "../../actions";

import { useParams } from "react-router-dom";

const breed = breeds[0];

const BreedDetail = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const currentBreed = useSelector((state) => state.currentBreed);

  const { id } = useParams();

  useEffect(() => {
    console.log("onMounted");
    dispatch(getBreedById(id, true));
  }, []);

  useEffect(() => {
    console.log(currentBreed);
  }, [currentBreed]);

  return (
    <div className="breedDetail">
      <NavBar landing={false} justify="space-between" title={`Breed Detail`} />
      <div className="content">
        {loading ? (
          <div className="loadingContainer"></div>
        ) : (
          <>
            <div className="dogCard">
              <img src={breed.image.url} alt="breedImg" />
            </div>
            <div className="detailsCard">
              <div className="title"> {`Breed: ${breed.name}`} </div>
              <div className="detailRow">
                <div className="subtitle"> LifeTrail </div>
                <div className="text"> {breed.life_span}</div>
              </div>
              <div className="detailRow">
                <div className="subtitle"> Height </div>
                <div className="text"> {breed.height.imperial}</div>
              </div>
              <div className="detailRow">
                <div className="subtitle"> Weight </div>
                <div className="text"> {breed.weight.imperial}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BreedDetail;
