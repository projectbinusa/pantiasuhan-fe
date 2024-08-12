import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDebugValue } from "react";
import { API_DUMMY } from "../../../utils/base_URL";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import {  FacebookIcon, FacebookShareButton, PinterestIcon, PinterestShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import AOS from 'aos';
import Bawaslu from "../../../component/Bawaslu";


function IsiRekap() {
  const [judulBerita, setJudulBerita] = useState("");
  const [isiBerita, setIsiBerita] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [relatedPost, setRelatedPost] = useState([]);
  const [createdDate, setCreatedDate] = useState("");
  const param = useParams();

  const getAllRelatedPost = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/berita/related-berita/by-id-berita?id=` +
          param.id
      );
      setRelatedPost(response.data.data);
      console.log("related post : ", response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  //berita get
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/bawaslu/api/berita/get/` + param.id)
      .then((res) => {
        const list_data = res.data.data;
        setJudulBerita(list_data.judulBerita);
        setIsiBerita(list_data.isiBerita);
        setAuthor(list_data.author);
        setImage(list_data.image);
        setCreatedDate(list_data.createdDate);
      });
  }, [param.id]);

  useEffect(() => {
    getAllRelatedPost();
    AOS.init()
  }, []);
  const createParagraphs = (text) => {
    const paragraphs = text.split("\n").map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));

    const result = [];
    for (let i = 0; i < paragraphs.length; i += 5) {
      result.push(
        <div key={i / 5} className="five-paragraphs">
          {paragraphs.slice(i, i + 5)}
        </div>
      );
    }
    return result;
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="blog-area pd-top-120 pd-bottom-120">
        <div className="container">
          <div className="row">
            <div
          data-aos="fade-right" className="col-lg-8">
              <div className="single-blog-inner">
                <div className="tag-and-share">
                  <div className="row">
                    <div className="col-sm-7"></div>
                    <div
          data-aos="fade-right" className="col-sm-5 mt-3 mt-sm-0 text-sm-end align-self-center">
                      <div className="blog-share">
                        <ul>
                          <li>
                        <FacebookShareButton
                                  url={`https://bawaslu.excellentsistem.com/isi-rekap/data-berita/${param.id}`}
                                  media={image}
                                  quote={judulBerita}>
                                 <FacebookIcon size={38} round={true}/>
                                </FacebookShareButton>
                              </li>
                              <li>
                                <TwitterShareButton
                                  url={`https://bawaslu.excellentsistem.com/isi-rekap/data-berita/${param.id}`}
                                  media={image}
                                  title={judulBerita}>
                                               <TwitterIcon size={38} round={true}/>

                                </TwitterShareButton>
                              </li>
                              <li>
                                <PinterestShareButton
                                  url={`https://bawaslu.excellentsistem.com/isi-rekap/data-berita/${param.id}`}
                                  quote={judulBerita}
                                  media={image}>
                                  <PinterestIcon size={38} round={true}/>
                                </PinterestShareButton>
                              </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="thumb">
                  <img style={{ height: "450px" }} src={image}  />
                </div>
                <div className="details">
                  <h2>
                    <a style={{ color: "black", textDecoration: "none" }}>
                      {judulBerita}
                    </a>
                  </h2>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-user"></i>BY {author}
                    </li>
                    <li>
                      <i className="far fa-calendar-alt"></i>   <span>{format(new Date(createdDate || new Date()), "dd MMMM yyyy", { locale: idLocale })}</span>

                    </li>
                  </ul>
                  <p> {createParagraphs(isiBerita)}</p>
                  <br />
                  <div className="row">
                    <h2 className="title">Related Post</h2>
                    {relatedPost.map((category) => {
                      return (
                        <div className="col-md-6">
                          <div className="media single-choose-inner">
                            <div className="media-left">
                              <div className="icon">
                                <i className="fas fa-bullhorn"></i>
                              </div>
                            </div>
                            <div className="media-body">
                              <a href="">
                                {judulBerita}
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div
          data-aos="fade-left" className="col-lg-4 col-12">
              <div className="sidebar-container">
                <div className="td-sidebar">
                 <Bawaslu/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- blog area end --> */}
      <Footer />
    </>
  );
}

export default IsiRekap;
