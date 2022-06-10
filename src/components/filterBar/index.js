import React from 'react';

// import profilePic from '../../assets/GSale.png';
// import kitchenware from '../../assets/images/kitchenware.png';
// import furniture from '../../assets/images/furniture.png';
// import clothing from '../../assets/images/clothing.png';
// import electronic from '../../assets/images/electronic.png';
// import game from '../../assets/images/game.png';
// import sport from '../../assets/images/sport.png';
// import pet from '../../assets/images/pet.png';
// import bath from '../../assets/images/bath.png';
// import baby from '../../assets/images/baby.png';

function FilterBar() {
  return (
    <div>
      <div className="btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-light btn-sm active">
          {/* <FontAwesomeIcon icon="fa-solid fa-dog-leashed" /> */}
          Kitchenware
        </label>
      </div>
    </div>
  );
}

export default FilterBar;

// const mapStateToProps = state => ({

// });

// const mapDispatchToProps = dispatch => ({

// });

// export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
