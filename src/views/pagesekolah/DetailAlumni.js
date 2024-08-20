import React from "react";
import NavbarSekolah from "../../component/NavbarSekolah";
import "../../css/alumni/alumni.css"
import FooterSekolah from "../../component/FooterSekolah";

function DetailAlumni() {
    return (
        <section>
            <NavbarSekolah />
            <main className="container-alumni">
                <div className='header-alumni'>
                    <ul>
                        <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                        <li><a href="/"><i class="fas fa-angle-right"></i> Alumni </a></li>
                        <li><i class="fas fa-angle-right"></i> Test </li>
                    </ul>
                </div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s"/>
                <h4 style={{color: "#002147", fontWeight: "600", marginTop: "2rem"}}>Drs Dinda</h4>
                <hr />
                <p></p>
            </main>
            <FooterSekolah/>
        </section>
    )
}

export default DetailAlumni;