import React from "react";
import "../../css/home1.css";
import pantiasuhan from "../../aset/pantiasuhan/pantiasuhan.png";

function Home1() {
  return (
    <>
      <div class="navbar-top style-2">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 d-lg-inline-block d-none">
              <div class="logo">
                <a href="index.html">
                  <img src="assets/img/logo.webp" alt="img" />
                </a>
              </div>
            </div>
            <div class="col-lg-3 col-md-5 align-self-center">
              <div class="media">
                <div class="media-left">
                  <i class="far fa-clock"></i>
                </div>
                <div class="media-body">
                  <h6>Office time</h6>
                  <p>Opening Hour 9:00am - 10:00pm</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-5 align-self-center">
              <div class="media">
                <div class="media-left">
                  <i class="far fa-envelope"></i>
                </div>
                <div class="media-body">
                  <h6>Office time</h6>
                  <p>Opening Hour 9:00am - 10:00pm</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 d-lg-block d-none align-self-center">
              <div class="social-media-light text-md-end text-center">
                <a href="#">
                  <i class="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i class="fab fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i class="fab fa-instagram" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i class="fab fa-pinterest" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="navbar navbar-area navbar-area-2 navbar-expand-lg">
        <div class="container nav-container">
          <div class="responsive-mobile-menu">
            <button
              class="menu toggle-btn d-block d-lg-none"
              data-target="#Iitechie_main_menu"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="icon-left"></span>
              <span class="icon-right"></span>
            </button>
          </div>
          <div class="logo d-inline-block d-lg-none">
            <a href="index.html">
              <img src="assets/img/logo.webp" alt="img" />
            </a>
          </div>
          <div class="nav-right-part nav-right-part-mobile">
            <a class="search-bar-btn" href="#">
              {/* <svg
                class="svg-inline--fa fa-search fa-w-16"
                aria-hidden="true"
                focusable="false"
                data-prefix="fa"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg="">
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg> */}
            </a>
          </div>
          <div class="collapse navbar-collapse" id="Iitechie_main_menu">
            <ul class="navbar-nav menu-open text-lg-start">
              <li class="menu-item-has-children">
                <a href="#">Home</a>
                <ul class="sub-menu">
                  <li>
                    <a href="index.html">Home 01</a>
                  </li>
                  <li>
                    <a href="index-2.html">Home 02</a>
                  </li>
                  <li>
                    <a href="index-3.html">Home 03</a>
                  </li>
                  <li>
                    <a href="index-4.html">Home 04</a>
                  </li>
                  <li>
                    <a href="index-5.html">Home 05</a>
                  </li>
                </ul>
              </li>
              <li class="menu-item-has-children">
                <a href="#">Service</a>
                <ul class="sub-menu">
                  <li>
                    <a href="service.html">Service</a>
                  </li>
                  <li>
                    <a href="service-details.html">Service Single</a>
                  </li>
                </ul>
              </li>
              <li class="menu-item-has-children">
                <a href="#">Pages</a>
                <ul class="sub-menu">
                  <li>
                    <a href="about.html">About Us</a>
                  </li>
                  <li>
                    <a href="team.html">Team</a>
                  </li>
                  <li>
                    <a href="team-details.html">Team Details</a>
                  </li>
                  <li>
                    <a href="project.html">Project</a>
                  </li>
                  <li>
                    <a href="project-details.html">Project Details</a>
                  </li>
                </ul>
              </li>
              <li class="menu-item-has-children">
                <a href="#">Blog</a>
                <ul class="sub-menu">
                  <li>
                    <a href="blog.html">Blog</a>
                  </li>
                  <li>
                    <a href="blog-details.html">Blog Details</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="contact.html">Contact Us</a>
              </li>
            </ul>
          </div>
          <div class="nav-right-part nav-right-part-desktop align-self-center">
            {/* <a class="search-bar-btn" href="#">
              <svg
                class="svg-inline--fa fa-search fa-w-16"
                aria-hidden="true"
                focusable="false"
                data-prefix="fa"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg="">
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
            </a>
            <a class="btn btn-black" href="#">
              Get Started
            </a> */}
          </div>
        </div>
      </nav>
      <div
        class="banner-area banner-area-2 bg-relative"
        style={{
          backgroundImage: `url(${pantiasuhan})`,
        }}>
        <div class="bg-overlay-gradient"></div>
        <div
          class="banner-bg-img"
          style={{
            backgroundImage:
              "url('https://solverwp.com/demo/html/itechie/assets/img/banner/4.webp')",
          }}
          // style="background-image: url('./assets/img/banner/4.webp')"
        ></div>
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-9">
              <div class="banner-inner">
                <h4 class="sub-title">Pantinya Sang Juara</h4>
                <h2 class="title">
                  Panti Asuhan <span>Muhammadiyah</span>
                </h2>
                <p class="content">
                Sang Juara Muhammadiyah, panti asuhan penuh kasih, membimbing anak-anak yatim menuju masa depan cerah dengan pendidikan dan keimanan.
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home1;
