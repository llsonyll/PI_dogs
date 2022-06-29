import "./breedDetail.scss";
// import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreedById, cleanCurrentBreed } from "../../actions";
import { useParams, useLocation } from "react-router-dom";

const BreedDetail = () => {
  const dispatch = useDispatch();
  const breed = useSelector((state) => state.currentBreed);
  const { id } = useParams();
  const { search } = useLocation();

  useEffect(() => {
    dispatch(getBreedById(id, search.split("=")[1] === "true"));
    return () => {
      dispatch(cleanCurrentBreed());
    };
  }, []);

  return (
    <div className="breedDetail">
      <NavBar landing={false} justify="space-between" title={`Breed Detail`} />
      <div className="content">
        {Object.keys(breed).length <= 0 ? (
          <div className="loadingContainer">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="dogCard">
              <img
                src={
                  breed.reference_image_id
                    ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
                    : "https://image.shutterstock.com/shutterstock/photos/563030956/display_1500/stock-vector-vector-black-silhouette-of-a-dog-isolated-on-a-white-background-563030956.jpg"
                }
                alt="breedImg"
              />
            </div>
            <div className="detailsCard">
              <div className="title"> {`Breed: ${breed.name}`} </div>
              <div className="detailRow">
                <div className="subtitle"> LifeTrail </div>
                <div className="text"> {breed.life_span}</div>
              </div>
              <div className="detailRow">
                <div className="subtitle"> Height </div>
                <div className="text"> {breed.height.metric} cm</div>
              </div>
              <div className="detailRow">
                <div className="subtitle"> Weight </div>
                <div className="text"> {breed.weight.metric} kg</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BreedDetail;
