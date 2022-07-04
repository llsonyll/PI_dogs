import "./breedDetail.scss";
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
  }, [dispatch, id, search]);

  return (
    <div className="breedDetail">
      {Object.keys(breed).length <= 0 ? (
        <div className="loadingContainer">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="dogCard">
            <img
              src={
                breed.url
                  ? breed.url
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
  );
};

export default BreedDetail;
