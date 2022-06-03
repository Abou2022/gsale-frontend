import React from 'react';

function Navbar(props) {
    const clickHandler = (event) => {
        const id = event.target.id;
        props.setPage(id);
    }
    return (
      <ul className="nav nav-pills nav-fill p-2 border border-success">
        <li className="nav-item p-2">
          <a className="nav-link active" aria-current="page" href="#">
            Active
          </a>
        </li>
        <li className="nav-item p-2">
          <a className="nav-link active" aria-current="page" href="#">
            Location
          </a>
        </li>
        <li className="nav-item p-2">
          <a className="nav-link" href="#">
            Date
          </a>
        </li>
        <li className="nav-item p-2">
          <a className="nav-link disabled">Filter</a>
        </li>
        <form className="d-flex form-inline my-2 my-lg-0 p-2">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className={
              props.page === "search"
                ? "nav-link active"
                : "btn btn-outline-success my-2 my-sm-0"
            }
            type="submit"
          >
            Search
          </button>
        </form>
        <form className="d-flex flex-row form-inline my-2 my-lg-0 p-2">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Create Event
          </button>
        </form>
        <form className="d-flex flex-row form-inline my-2 my-lg-0 p-2">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Login/Sign Up
          </button>
        </form>
      </ul>

      // <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //   <button
      //     className="navbar-toggler"
      //     type="button"
      //     data-toggle="collapse"
      //     data-target="#navbarTogglerDemo01"
      //     aria-controls="navbarTogglerDemo01"
      //     aria-expanded="false"
      //     aria-label="Toggle navigation"
      //   >
      //     <span className="navbar-toggler-icon" />
      //   </button>
      //   <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      //     <a className="navbar-brand" href="#">
      //       GSALE
      //     </a>
      //     <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      //       <li className="nav-item active">
      //         <a
      //           id="home"
      //           className={
      //             props.page === "home" ? "nav-link active" : "nav-link"
      //           }
      //           href="#"
      //           onClick={clickHandler}
      //         >
      //           Home
      //         </a>
      //       </li>
      //       <li className="nav-item">
      //         <a
      //           id="link"
      //           className={
      //             props.page === "link" ? "nav-link active" : "nav-link"
      //           }
      //           href="#"
      //           onClick={clickHandler}
      //         >
      //           Link
      //         </a>
      //       </li>
      //       <li className="nav-item">
      //         <a
      //           id="disabled"
      //           className={
      //             props.page === "disabled" ? "nav-link active" : "nav-link"
      //           }
      //           href="#"
      //           onClick={clickHandler}
      //         >
      //           Disabled
      //         </a>
      //       </li>
      //     </ul>
      // <form className="d-flex form-inline my-2 my-lg-0">
      //   <input
      //     className="form-control mr-sm-2"
      //     type="search"
      //     placeholder="Search"
      //     aria-label="Search"
      //   />
      //   <button
      //     className={props.page==="search"? "nav-link active" : "btn btn-outline-success my-2 my-sm-0"}
      //     type="submit"
      //   >
      //     Search
      //   </button>
      // </form>
      // <form className="d-flex flex-row form-inline my-2 my-lg-0">
      //   <button
      //     className="btn btn-outline-success my-2 my-sm-0"
      //     type="submit"
      //   >
      //     Create Event
      //   </button>
      // </form>
      //   </div>
      // </nav>

      //         <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //   <a className="navbar-brand" href="#">
      //     GSALE
      //   </a>
      //   <button
      //     className="navbar-toggler"
      //     type="button"
      //     data-toggle="collapse"
      //     data-target="#navbarText"
      //     aria-controls="navbarText"
      //     aria-expanded="false"
      //     aria-label="Toggle navigation"
      //   >
      //     <span className="navbar-toggler-icon" />
      //   </button>
      //   <div className="collapse navbar-collapse" id="navbarText">
      //     <ul className="navbar-nav mr-auto">
      //       <li className="nav-item active">
      //         <a
      //           id="about"
      //           className={
      //             props.page === "about" ? "nav-link active" : "nav-link"
      //           }
      //           onClick={clickHandler}
      //           href="#"
      //         >
      //           About Me
      //         </a>
      //       </li>
      //       <li className="nav-item">
      //         <a
      //           id="work"
      //           className={props.page === "work" ? "nav-link active" : "nav-link"}
      //           onClick={clickHandler}
      //           href="#"
      //         >
      //           Work
      //         </a>
      //       </li>
      //       <li className="nav-item">
      //         <a
      //           id="contact"
      //           className={
      //             props.page === "contact" ? "nav-link active" : "nav-link"
      //           }
      //           onClick={clickHandler}
      //           href="#"
      //         >
      //           Contact Me
      //         </a>
      //       </li>
      //       <li className="nav-item">
      //         <a
      //           className="nav-link"
      //           href="#"
      //           target="_blank"
      //           rel="noreferrer"
      //         >
      //           Resume
      //         </a>
      //         {/* <a href={process.env.PUBLIC_URL+"favicon.ico"}>favicon</a> */}
      //       </li>
      //       <li className="nav-item">
      //         <a
      //           className="nav-link"
      //           href="#"
      //           target="_blank"
      //           rel="noreferrer"
      //         >
      //           GitHub
      //         </a>
      //       </li>
      //     </ul>
      //   </div>
      // </nav>
    );
            };

export default Navbar;