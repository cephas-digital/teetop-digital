import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { GainHeader, StandToGain } from "../home";
import aboutImg from "../../Assets/Saly-21.png";
import aboutImg2 from "../../Assets/Saly-13@2x.png";
import { Container } from "reactstrap";

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
		AOS.init({ duration: 1000 });
	}, []);
	return (
		<>
			<Container className="pb-5">
				<div className="d-grid py-5 blogGrid">
					<img
						src={aboutImg}
						alt="Bg"
						className="img-fluild rounded w-100 h-100 aboutImg"
						data-aos="fade-right"
					/>
					<div className="py-5 d-flex flex-column">
						<h2 className="textColor mb-3">About us</h2>
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
				</div>
				<div className="d-grid py-5 blogGrid">
					<img
						src={aboutImg2}
						alt="Bg"
						className="img-fluild rounded w-100 h-100 aboutImg"
						data-aos="fade-right"
					/>
					<div className="py-5 d-flex flex-column">
						<h2 className="textColor mb-3">Our Mission</h2>
						<p data-aos="zoom-in" data-aos-delay="1000" className="fontReduce">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sit
							earum delectus omnis laboriosam quae ratione dolorem cumque
							pariatur neque dignissimos aut odit incidunt, placeat officia
							eaque quasi corporis et! Hic quo provident quaerat accusamus
							soluta veniam quasi repellat minus itaque ratione, optio ex magnam
						</p>
						<div className="py-5 d-flex flex-column">
							<h2 className="textColor mb-3">Our Vision</h2>
							<p
								data-aos="zoom-in"
								data-aos-delay="1000"
								className="fontReduce">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
								sit earum delectus omnis laboriosam quae ratione dolorem cumque
								pariatur neque dignissimos aut odit incidunt, placeat officia
								eaque quasi corporis et! Hic quo provident quaerat accusamus
								soluta veniam quasi repellat minus itaque ratione, optio ex
								magnam
							</p>
						</div>
					</div>
				</div>
			</Container>
			<GainHeader />
			<StandToGain />
		</>
	);
};

export default About;
