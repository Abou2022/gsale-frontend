import React from 'react';

function Navbar(props) {
    const clickHandler = (event) => {
        const id = event.target.id;
        props.setPage(id);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
                GSALE
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a
                            id="about"
                            className={
                                props.page === "about" ? "nav-link active" : "nav-link"
                            }
                            onClick={clickHandler}
                            href="/about"
                        >
                            About Me
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            id="work"
                            className={props.page === "work" ? "nav-link active" : "nav-link"}
                            onClick={clickHandler}
                            href="/work"
                        >
                            Work
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            id="contact"
                            className={
                                props.page === "contact" ? "nav-link active" : "nav-link"
                            }
                            onClick={clickHandler}
                            href="/contact"
                        >
                            Contact Me
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/resume"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Resume
                        </a>
                        {/* <a href={process.env.PUBLIC_URL+"favicon.ico"}>favicon</a> */}
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/github"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;