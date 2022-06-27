import "./breedForm.scss";

// Components
import NavBar from "../../components/NavBar";
import State from "../../components/StateCard";

const BreedDetail = () => {
  return (
    <div className="breedDetail">
      <NavBar landing={false} justify="space-between" title="New Breed" />
      <div className="content">
        <State />
      </div>
    </div>
  );
};

export default BreedDetail;
