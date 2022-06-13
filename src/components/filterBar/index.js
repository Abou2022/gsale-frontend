import React from 'react';
import './filterBar.css';

// import profilePic from '../../assets/GSale.png';
import kitchenware from '../../assets/images/kitchenware.png';
import furniture from '../../assets/images/furniture.png';
import clothing from '../../assets/images/clothing.png';
import electronic from '../../assets/images/electronic.png';
import game from '../../assets/images/game.png';
import sport from '../../assets/images/sport.png';
import pet from '../../assets/images/pet.png';
import bath from '../../assets/images/bath.png';
import baby from '../../assets/images/baby.png';

function FilterBar() {
  return (
    <div className="d-flex">
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
        >
          <img src={kitchenware} alt="kitchenware" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
        >
          <img src={furniture} alt="furniture" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
        >
          <img src={clothing} alt="clothing" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
        >
          <img src={electronic} alt="electronic" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
        >
          <img src={game} alt="game" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
        >
          <img src={sport} alt="sport" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
        >
          <img src={pet} alt="pet" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
        >
          <img src={bath} alt="bath" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
        >
          <img src={baby} alt="baby" />
        </button>
      </div>
      {/* <button type="submit" className="btn btn-outline-light  filter__option-icon mx-auto d-block">
          <img src={furniture} alt="furniture" />
          furniture
        </button> */}
    </div>
  );
}

export default FilterBar;

// const mapStateToProps = state => ({

// });

// const mapDispatchToProps = dispatch => ({

// });

// export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
