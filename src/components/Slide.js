import React from "react";

export default function Slide() {
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ maxHeight: "300px", overflow: "hidden" }}
      >
        <div className="carousel-inner" id="carousel">
          {/* Search Bar Over Carousel */}
          <div
  className="carousel-caption d-flex justify-content-center align-items-center"
  style={{zIndex: 20,top: 0,bottom: 0,height: "100%",}}>
            <form className="d-flex w-100 justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Type in..."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>

          {/* Carousel Items */}
          <div className="carousel-item active">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3WzjgSiFYnE-FnrUkWbr5x3BIYUKs3XZWQ&s"
              className="d-block w-100"
              style={{ height: "500px", objectFit: "cover", filter: "brightness(30%)" }}
              alt="Slide 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2o86IDNmk8t6E2yl-5LPK401pby8B2BX0Vg&s"
              className="d-block w-100"
              style={{ height: "500px", objectFit: "cover", filter: "brightness(30%)" }}
              alt="Slide 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxQfjge5wtYCjTFDS25TRV79nhA8dzjXOiDg&s"
              className="d-block w-100"
              style={{ height: "500px", objectFit: "cover", filter: "brightness(30%)" }}
              alt="Slide 3"
            />
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
