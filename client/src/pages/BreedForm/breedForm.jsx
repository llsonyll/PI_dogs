import './breedForm.scss';
import NavBar from "../../components/NavBar";

const BreedForm = () => {

    const handleFormSubmit = () => {

    }

    return <div className="breedForm"> 
        <NavBar  landing={false} justify="space-between"  title="Breed Detail "/>
        <div className="content">
            <form submit={handleFormSubmit}>

                <div className="textField">
                    <label htmlFor="name"> Name </label>
                    <input type="text" name="name" />
                </div>

                <div className="minmaxField">
                    <div className="title"> Altura(m) </div>
                    <div className="fields">
                        <div className="field">
                            <label htmlFor="minHeight"> Min </label>
                            <input type="text" name="minHeight" />
                        </div>
                        <div className="field">
                            <label htmlFor="maxHeight"> Max </label>
                            <input type="text" name="maxHeight" />
                        </div>
                    </div>
                </div>

                <div className="minmaxField">
                    <div className="title"> Peso(kg) </div>
                    <div className="fields">
                        <div className="field">
                            <label htmlFor="minWeight"> Min </label>
                            <input type="number" min={1} max={20} name="minWeight" />
                        </div>
                        <div className="field">
                            <label htmlFor="maxWeight"> Max </label>
                            <input type="number" min={1} max={20} name="maxWeight" />
                        </div>
                    </div>
                </div>

                <div className="textField">
                    <label htmlFor="lifeTrail"> Life trail </label>
                    <input type="text" name="lifeTrail" />
                </div>
                

            </form>
        </div>
     </div>
}

export default BreedForm;
