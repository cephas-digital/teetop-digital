import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { GainHeader, ProductServices, StandToGain } from "../home";
import aboutImg from "../../Assets/Saly-21.png";
import { Container } from "reactstrap";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
      <Container className="pb-5">
        <div className="d-grid py-5 blogGrid">
          <div className="py-5 d-flex flex-column" data-aos="fade-right">
            <h2 className="textColor mb-3">
              What we can do{" "}
              <span className="textColor2 fontInherit">for you</span>
            </h2>
            <p data-aos="zoom-in" data-aos-delay="1000" className="fontReduce">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sit
              earum delectus omnis laboriosam quae ratione dolorem cumque
              pariatur neque dignissimos aut odit incidunt, placeat officia
              eaque quasi corporis et! Hic quo provident quaerat accusamus
              soluta veniam quasi repellat minus itaque ratione, optio ex magnam
              in dolores iure dicta. Ipsum inventore ducimus blanditiis quas
              expedita repellendus! Consequatur sapiente laudantium optio,
              expedita dolor obcaecati praesentium necessitatibus eos illo a
              facere suscipit quisquam alias dolorem, sunt doloremque
              dignissimos blanditiis iste, sit earum distinctio culpa architecto
              voluptas. Sunt aliquid voluptate eos itaque repudiandae, eum est.
              Repellendus molestias, est nemo dolorum iure dignissimos. Dolorum.
            </p>
          </div>
          <img
            src={aboutImg}
            alt="Bg"
            className="img-fluild rounded aboutImg mx-auto"
            data-aos="fade-left"
          />
        </div>
      </Container>
      <ProductServices />
      <GainHeader />
      <StandToGain />
    </>
  );
};

export default Services;
