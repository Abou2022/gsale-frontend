import React, { useState } from "react";
import profilePic from "../../assets/GSale.png";

function Profile() {
  const [editFirstName, setEditFirstName] = useState(false);
  const firstNameHandler = () => {
    if (editFirstName) {
      setEditFirstName(false);
    } else {
      setEditFirstName(true);
    }
  };

  const tempObject = {
    firstName: "Andrew",
    lastName: "Ryu",
    email: "email@email.com",
    phoneNumber: "123-456-7899",
  };
  const [tempData, setTempData] = useState(tempObject);
  const firstNameOnChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2 className="my-4 py-2">Profile</h2>
      <div className="row">
        <div className="col-md-7">
          <div className="d-flex justify-content-between">
            <div className="">
              <p className="mb-0">First Name</p>
              <p className="text-muted mb-0">
                {editFirstName ? (
                  <input
                    type="text"
                    name="firstName"
                    value={tempData.firstName}
                    onChange={firstNameOnChange}
                  />
                ) : (
                  tempData.firstName
                )}
              </p>
            </div>
            <button onClick={firstNameHandler} className="btn my-2 my-sm-0">
              <u>{editFirstName ? "Save" : "Edit"}</u>
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <p className="mt-3 mb-0">Last Name</p>
              <p className="text-muted mb-0">Ryu</p>
            </div>
            <button className="btn my-2 my-sm-0">
              <u>Edit</u>
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <p className="mt-3 mb-0">Email</p>
              <p className="text-muted mb-0">email@email.com</p>
            </div>
            <button className="btn my-2 my-sm-0">
              <u>Edit</u>
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <p className="mt-3 mb-0">Phone Number</p>
              <p className="text-muted mb-0">123-456-7890</p>
            </div>
            <button className="btn my-2 my-sm-0">
              <u>Edit</u>
            </button>
          </div>
          <div>
            <p className="mt-3 mb-1">Categories</p>
            <div className="row">
              <div className="">
                <div className="form-check form-check-inline col-md-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="kitchenware"
                    defaultValue="kitchenware"
                  />
                  <label className="form-check-label" htmlFor="kitchenware">
                    Kitchenware
                  </label>
                </div>
                <div className="form-check form-check-inline col-md-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="furniture"
                    defaultValue="furniture"
                  />
                  <label className="form-check-label" htmlFor="furniture">
                    Furniture
                  </label>
                </div>
                <div className="form-check form-check-inline col-md-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="clothing"
                    defaultValue="clothing"
                  />
                  <label className="form-check-label" htmlFor="clothing">
                    Clothing
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="">
                <div className="form-check form-check-inline col-md-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="electronic"
                    defaultValue="electronic"
                  />
                  <label className="form-check-label" htmlFor="electronic">
                    Electronic
                  </label>
                </div>
                <div className="form-check form-check-inline col-md-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="game"
                    defaultValue="game"
                  />
                  <label className="form-check-label" htmlFor="game">
                    Game
                  </label>
                </div>
                <div className="form-check form-check-inline col-md-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="sportsEquipment"
                    defaultValue="sportsEquipment"
                  />
                  <label className="form-check-label" htmlFor="sportsEquipment">
                    Sports Equipment
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <img src={profilePic} alt="pic" />
        </div>
      </div>
    </div>
  );
}

export default Profile;

// function showUploadWidget() {
//   cloudinary.openUploadWidget(
//     {
//       cloudName: "<cloud name>",
//       uploadPreset: "<upload preset>",
//       sources: ["local", "url", "camera", "google_drive"],
//       googleApiKey: "<image_search_google_api_key>",
//       showAdvancedOptions: true,
//       cropping: true,
//       multiple: false,
//       defaultSource: "local",
//       styles: {
//         palette: {
//           window: "#FFFFFF",
//           windowBorder: "#90A0B3",
//           tabIcon: "#20B832",
//           menuIcons: "#5A616A",
//           textDark: "#000000",
//           textLight: "#FFFFFF",
//           link: "#20B832",
//           action: "#FF620C",
//           inactiveTabIcon: "#0E2F5A",
//           error: "#F44235",
//           inProgress: "#20B832",
//           complete: "#20B832",
//           sourceBg: "#E4EBF1",
//         },
//         fonts: { default: null, "sans-serif": { url: null, active: true } },
//       },
//     },
//     (err, info) => {
//       if (!err) {
//         console.log("Upload Widget event - ", info);
//       }
//     }
//   );
// }
