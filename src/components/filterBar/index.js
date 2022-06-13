import React from 'react';
import { connect } from 'react-redux';
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

// eslint-disable-next-line
import { searchCriteriaUpdate } from '../../actions/searchCriteria-actions.js';
// eslint-disable-next-line
import {
  garageSaleEventsFilterRequest,
  filterGarageSaleEvents,
} from '../../actions/garageSaleEvent-actions.js';

// eslint-disable-next-line
function FilterBar(props) {
  const handleFilter = e => {
    const category = e.target.name;
    let categoryFilter;
    if (!props.searchCriteria.categories.includes(category)) {
      categoryFilter = [...props.searchCriteria.categories, category];
    } else {
      categoryFilter = [...props.searchCriteria.categories].splice();
      categoryFilter.splice(categoryFilter.indexOf(category), 1);
    }
    console.log('categoryFilter: ', categoryFilter);
    const filter = {
      startDate: props.searchCriteria.startDate,
      endDate: props.searchCriteria.endDate,
      lat: props.searchCriteria.lat,
      lng: props.searchCriteria.lng,
      categories: categoryFilter,
    };
    props
      .garageSaleEventsFilter(filter)
      .catch(err => console.log('err: ', err));
  };
  return (
    <div className="d-flex">
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
          onClick={handleFilter}
        >
          <img name="kitchenware" src={kitchenware} alt="kitchenware" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
          onClick={handleFilter}
        >
          <img src={furniture} name="furniture" alt="furniture" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
          onClick={handleFilter}
        >
          <img src={clothing} name="clothing" alt="clothing" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
          onClick={handleFilter}
        >
          <img src={electronic} name="electronic" alt="electronic" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
          onClick={handleFilter}
        >
          <img src={game} name="game" alt="game" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
          onClick={handleFilter}
        >
          <img src={sport} name="sport" alt="sport" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
          onClick={handleFilter}
        >
          <img src={pet} name="pet" alt="pet" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
          onClick={handleFilter}
        >
          <img src={bath} name="bath" alt="bath" />
        </button>
      </div>
      <div className="mx-auto">
        <button
          type="submit"
          className="btn p-0 btn-outline-light filter__option-icon"
          onClick={handleFilter}
        >
          <img src={baby} name="baby" alt="baby" />
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line
const mapStateToProps = state => ({
  searchCriteria: state.searchCriteria,
});
// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({
  garageSaleEventsFilter: data => dispatch(garageSaleEventsFilterRequest(data)),
  filterGarageSaleEventsRequest: (data, filterObject) =>
    dispatch(filterGarageSaleEvents(data, filterObject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
