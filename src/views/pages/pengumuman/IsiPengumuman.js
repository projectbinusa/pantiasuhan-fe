import React, { useState } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import Bawaslu from "../../../component/Bawaslu";
import { API_DUMMY } from "../../../utils/base_URL";
import axios from "axios";
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import AOS from "aos";
import { Helmet } from "react-helmet";

function IsiPengumuman() {
  const [createdDate, setCreatedDate] = useState("");
  const [judulPengumuman, setJudulPengumuman] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [isiPengumuman, setIsiPengumuman] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();
  const [id, setId] = useState();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/bawaslu/api/pengumuman/get/` + params.id)
      .then((ress) => {
        const response = ress.data.data;
        setCreatedDate(response.createdDate);
        setId(response.id);
        setIsiPengumuman(response.isiPengumuman);
        setJudulPengumuman(response.judulPengumuman);
        setTags(response.tags);
        setImage(response.image);
        setAuthor(response.author);
        console.log(ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [pengumuman2, setPengumuman2] = useState([]);
  const getAll = async () => {
    await axios
      .get(
        `${API_DUMMY}/bawaslu/api/pengumuman/related-pengumuman/by-id-pengumuman?id=` +
          params.id
      )
      .then((res) => {
        setPengumuman2(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan" + error);
      });
  };
  useEffect(() => {
    //mengambil data, memperbarui DOM secara langsung,
    getAll(0);
    AOS.init();
  }, []);

  useEffect(() => {
    // Memuat skrip AddToAny setelah komponen di-render
    const script = document.createElement("script");
    script.src = "https://static.addtoany.com/menu/page.js";
    script.async = true;
    document.body.appendChild(script);

    // Membersihkan skrip saat komponen dibongkar
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Helmet>
        <meta property="og:title" content={judulPengumuman} />
        <meta property="og:description" content={isiPengumuman} />
        <meta property="og:media" content={image} />
        <meta
          property="og:url"
          content={`https://bawaslu.excellentsistem.com/pengumuman/isi-pengumuman/${id}`}
        />
      </Helmet>
      <Navbar />

      {/* <!-- blog area start --> */}
      <div class="blog-area pd-top-120 pd-bottom-120">
        <div class="container">
          <div class="row">
            <div data-aos="fade-right" class="col-lg-8">
              <div class="blog-details-page-content">
                <div class="single-blog-inner">
                  <div class="row">
                    <div class="row">
                      <div class="col-sm-7"></div>
                      <div class="col-sm-5 mt-3 mt-sm-0 text-sm-end align-self-center">
                        <div class="blog-share">
                          <ul class="list-inline">
                            <li class="list-inline-item">
                              <FacebookShareButton
                                url={`https://bawaslu.excellentsistem.com/pengumuman/isi-pengumuman/${id}`}
                                title={judulPengumuman}>
                                <FacebookIcon size={38} round={true} />
                              </FacebookShareButton>
                            </li>
                            <li class="list-inline-item">
                              <TwitterShareButton
                                url={`https://bawaslu.excellentsistem.com/pengumuman/isi-pengumuman/${id}`}
                                title={judulPengumuman}>
                                <TwitterIcon size={38} round={true} />
                              </TwitterShareButton>
                            </li>
                            <li class="list-inline-item">
                              <PinterestShareButton
                                url={`https://bawaslu.excellentsistem.com/pengumuman/isi-pengumuman/${id}`}
                                title={judulPengumuman}
                                media={image}>
                                <PinterestIcon size={38} round={true} />
                              </PinterestShareButton>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* // */}
                  <div class="thumb">
                    <img className="pengumuman" src={image} />
                  </div>
                  <div class="details">
                    <ul class="blog-meta">
                      <li>
                        <i class="far fa-user"></i>By {author}
                      </li>
                      <li>
                        <i class="far fa-calendar-alt"></i>
                        {format(
                          new Date(createdDate || new Date()),
                          "dd MMMM yyyy",
                          { locale: idLocale }
                        )}
                        {/* {createdDate} */}
                      </li>
                    </ul>
                    <h4 className="title">{judulPengumuman}</h4>
                    <p>{isiPengumuman}</p>
                  </div>
                  <br />
                  <h4 className="pt-4 mb-4">Related Posts</h4>
                  <div class="row">
                    {pengumuman2.map((isi) => {
                      return (
                        <div class="col-md-6">
                          <div class="media single-choose-inner">
                            <div class="media-left">
                              <div class="icon">
                                <i class="fas fa-bullhorn"></i>
                              </div>
                            </div>
                            <div class="media-body">
                              <p>
                                <a
                                  href={`/pengumuman/isi-pengumuman/${isi.id}`}>
                                  {isi.judulPengumuman}
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-left" class="col-lg-4 col-12">
              <div class="td-sidebar">
                <Bawaslu />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default IsiPengumuman;
