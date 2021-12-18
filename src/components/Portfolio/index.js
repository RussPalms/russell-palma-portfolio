import { useEffect, useState } from "react";
import About from "./About";
import Banner from "./Banner";
import Contact from "./Contact";
import Navigation from "./Navigation";
import Projects from "./Projects";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Link from "next/link";
import Image from "next/image";

function Portfolio() {
	// const [isOpen, setIsOpen] = useState(true);
	// const openNav = () => {
	// 	setIsOpen(!isOpen);
	// };

	// const [isTheme, setIsTheme] = useState(false);
	// const toggleTheme = () => {
	// 	setIsTheme(!isTheme);
	// };

	function toggleMenu() {
		let navigation = document.querySelector(".navigation");
		let main = document.querySelector(".main");
		// let topbar = document.querySelector(".topbar");
		// let toggle = document.querySelector(".toggle");
		navigation.classList.remove("active");
		// topbar.classList.remove("active");
		// toggle.classList.remove("active");
		main.classList.remove("active");

		// useEffect(() => {
		// 	let toggle = document.querySelector(".toggle");
		// 	let topbar = document.querySelector(".topbar");
		// 	let navigation = document.querySelector(".navigation");
		// 	let main = document.querySelector(".main");
		// 	let themeSwitch = document.querySelector(".themeSwitch");
		// 	let body = document.querySelector(".body0");

		// 	toggle.onclick = function () {
		// 		toggle.classList.toggle("active");
		// 		topbar.classList.toggle("active");
		// 		navigation.classList.toggle("active");
		// 		main.classList.toggle("active");
		// 	};

		// 	themeSwitch.onclick = function () {
		// 		body.classList.toggle("dark");
		// 	};
		// }, []);
	}

	useEffect(() => {
		let toggle = document.querySelector(".toggle");
		let topbar = document.querySelector(".topbar");
		let navigation = document.querySelector(".navigation");
		let main = document.querySelector(".main");
		let themeSwitch = document.querySelector(".themeSwitch");
		let body = document.querySelector("body");
		toggle.onclick = function () {
			// toggle.classList.toggle("active");
			topbar.classList.toggle("active");
			navigation.classList.toggle("active");
			main.classList.toggle("active");
		};

		themeSwitch.onclick = function () {
			body.classList.toggle("dark");
		};
	}, [toggleMenu]);

	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const [errors, setErrors] = useState({});

	const [buttonText, setButtonText] = useState("Send");

	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showFailureMessage, setShowFailureMessage] = useState(false);

	const handleValidation = () => {
		let tempErrors = {};
		let isValid = true;

		if (fullname.length <= 0) {
			tempErrors["fullname"] = true;
			isValid = false;
		}
		if (email.length <= 0) {
			tempErrors["email"] = true;
			isValid = false;
		}
		if (subject.length <= 0) {
			tempErrors["subject"] = true;
			isValid = false;
		}
		if (message.length <= 0) {
			tempErrors["message"] = true;
			isValid = false;
		}

		setErrors({ ...tempErrors });
		console.log("errors", errors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let isValidForm = handleValidation();

		if (isValidForm) {
			setButtonText("Sending");
			const res = await fetch("/api/sendgrid", {
				body: JSON.stringify({
					email: email,
					fullname: fullname,
					subject: subject,
					message: message,
				}),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});

			const { error } = await res.json();
			if (error) {
				console.log(error);
				setShowSuccessMessage(false);
				setShowFailureMessage(true);
				setButtonText("Send");

				// Reset form fields
				setFullname("");
				setEmail("");
				setMessage("");
				setSubject("");
				return;
			}
			setShowSuccessMessage(true);
			setShowFailureMessage(false);
			setButtonText("Send");
			setFullname("");
			setEmail("");
			setMessage("");
			setSubject("");
		}

		console.log(fullname, email, subject, message);
	};
	return (
		<>
			<div className="body0">
				{/* <div className="container0"> */}
				<div className="navigation">
					<ul>
						<li>
							<a href="#banner" onClick={toggleMenu}>
								Home
							</a>
						</li>
						<li>
							<a href="#about" onClick={toggleMenu}>
								About
							</a>
						</li>
						{/* <li>
								<a href="#services" onClick={toggleMenu}>
									Services
								</a>
							</li> */}
						<li>
							<a href="#projects" onClick={toggleMenu}>
								Projects
							</a>
						</li>
						{/* <li>
								<a href="#testimonials" onClick={toggleMenu}>
									Testimonials
								</a>
							</li> */}
						<li>
							<a href="#contact" onClick={toggleMenu}>
								Contact
							</a>
						</li>
					</ul>
					<div
						className="themeSwitch"
						// onClick={toggleTheme}
					></div>
				</div>

				<div className="main">
					<div className="topbar">
						<a href="#" className="logo flex-nowrap">
							rPalm's Portfolio
						</a>
						<div
							className="toggle"
							// onClick={openNav}
						>
							<i className="fa fa-bars" aria-hidden="true"></i>
						</div>
					</div>

					<section className="banner" id="banner">
						<div className="content">
							<div className="imgBx">
								<img src="images/user.jpeg" />
							</div>
							<h3>Russell Palma</h3>
							<p>I'm a creative Full Stack Developer.</p>
							<Link href="/resume" passHref>
								<a className="btn">Cover Letter</a>
							</Link>

							<ul className="socialMedia">
								<Link
									href="https://www.facebook.com/PinoyWakeboarder"
									passHref
								>
									<li>
										<a href="#">
											<i
												className="fa fa-facebook"
												aria-hidden="true"
											></i>
										</a>
									</li>
								</Link>
								<Link
									href="https://www.instagram.com/rpalmpinoy/"
									passHref
								>
									<li>
										<a href="#">
											<i
												className="fa fa-instagram"
												aria-hidden="true"
											></i>
										</a>
									</li>
								</Link>
								<Link
									href="https://www.linkedin.com/in/russell-palma-6b9700b9/"
									passHref
								>
									<li>
										<a href="#">
											<i
												className="fa fa-linkedin"
												aria-hidden="true"
											></i>
										</a>
									</li>
								</Link>
								<Link
									href="https://twitter.com/rPalmPinoy"
									passHref
								>
									<li>
										<a href="#">
											<i
												className="fa fa-twitter"
												aria-hidden="true"
											></i>
										</a>
									</li>
								</Link>
							</ul>
						</div>
					</section>

					<section className="about adjust" id="about">
						<div className="title">
							<h2>About Me</h2>
						</div>
						<div className="content">
							<div className="textBox">
								<p className="p-4">
									&emsp; Hello 👋🏾, my name is Russell Brian
									Fulache Dugaduga Jale (pernounced "hall-ee")
									Palma. I have a burning passion for science,
									technology, and exploration of both the
									human mind and of the universe. At the
									beginning of my academic career I dove into
									the world of computer engineering and
									discovered my love for learning about the
									physics of electronics, but initially didn't
									realize how much I wanted to know more about
									the software side of my degree. After a
									couple years of college I found myself
									looking more into web technologies. I was
									very fascinated with this part of the
									engineering world and jumped at the
									opportunity of becoming a full stack
									developer.
									<br />
									<br />
									&emsp; Some of my stretch goals include
									extending my reach towards software design
									and implementing machine learning into my
									workflow. Eventually, I would like to
									continue my education, transfer the knowlege
									I gain from freelancing into the world of
									Quantum Computing, and tackle humanity's
									most difficult problems.
								</p>
							</div>
							<div className="imgBc">
								<img src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.18169-9/26195481_1766345603383802_3332231310837428390_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=174925&_nc_ohc=kYbwS4PNrMAAX9ia1XN&_nc_ht=scontent-lax3-1.xx&oh=00_AT-qVNGJwwZslMSgMG4GTXdePVFeeNIGqbTl91ZNqRb4dQ&oe=61DF5A4C" />
							</div>
						</div>
					</section>

					{/* <section className="services adjust" id="services">
							<div className="title">
								<h2>Our Services</h2>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua.
								</p>
							</div>
							<div className="content">
								<div className="serviceBox">
									<img src="images/icon1.png" />
									<h2>Web Design</h2>
									<p>
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna
										aliqua. Fusce id velit ut tortor.
									</p>
								</div>
								<div className="serviceBox">
									<img src="images/icon2.png" />
									<h2>Web Development</h2>
									<p>
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna
										aliqua. Fusce id velit ut tortor.
									</p>
								</div>
								<div className="serviceBox">
									<img src="images/icon3.png" />
									<h2>Android Apps</h2>
									<p>
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna
										aliqua. Fusce id velit ut tortor.
									</p>
								</div>
								<div className="serviceBox">
									<img src="images/icon4.png" />
									<h2>Photography</h2>
									<p>
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna
										aliqua. Fusce id velit ut tortor.
									</p>
								</div>
								<div className="serviceBox">
									<img src="images/icon5.png" />
									<h2>Content Writing</h2>
									<p>
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna
										aliqua. Fusce id velit ut tortor.
									</p>
								</div>
								<div className="serviceBox">
									<img src="images/icon6.png" />
									<h2>Video Editing</h2>
									<p>
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna
										aliqua. Fusce id velit ut tortor.
									</p>
								</div>
							</div>
						</section> */}

					<section className="projects adjust" id="projects">
						<div className="title">
							<h2>Recent Work</h2>
							<p>
								Checkout some of the clones that I've build out
								(click links to redirect).
							</p>
						</div>
						<div className="content">
							<Link
								href="https://rpalm-spotify-clone-next.vercel.app/"
								passHref
							>
								<div className="workBx">
									<div className="imgBx">
										{/* <Image
												className="object-contain"
												layout="fill"
												src="https://links.papareact.com/9xl"
												priority="true"
											/> */}
									</div>{" "}
									SP
									<div className="textBx">
										<h3>Spotify</h3>
									</div>
								</div>
							</Link>
							<Link
								href="https://rpalm-netflix-clone--react.web.app/"
								passHref
							>
								<div className="workBx">
									<div className="imgBx">
										{/* <Image
												className="object-contain"
												layout="fill"
												src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo-700x394.png"
											/> */}
										NF
									</div>
									<div className="textBx">
										<h3>Netflix</h3>
									</div>
								</div>
							</Link>
							<Link
								href="https://amazon-clone-react-kappa.vercel.app/"
								passHref
							>
								<div className="workBx">
									<div className="imgBx">
										{/* <Image
												className="object-contain"
												layout="fill"
												src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG"
											/> */}
										AZ
									</div>
									<div className="textBx">
										<h3>Amazon</h3>
									</div>
								</div>
							</Link>
							<Link
								href="https://rpalm-yt-clone--react.web.app/"
								passHref
							>
								<div className="workBx">
									<div className="imgBx">
										{/* <Image
												className="object-contain"
												layout="fill"
												src="https://assets.turbologo.com/blog/en/2019/10/19084944/youtube-logo-illustration.jpg"
											/> */}
										YT
									</div>
									<div className="textBx">
										<h3>YouTube</h3>
									</div>
								</div>
							</Link>
							<Link
								href="https://huluclone-react.vercel.app/"
								passHref
							>
								<div className="workBx">
									<div className="imgBx">
										{/* <Image
												className="object-contain"
												layout="fill"
												src="https://assetshuluimcom-a.akamaihd.net/h3o/facebook_share_thumb_default_hulu.jpg"
											/> */}
										HU
									</div>
									<div className="textBx">
										<h3>Hulu</h3>
									</div>
								</div>
							</Link>
							<Link
								href="https://whats-app-clone-react.vercel.app/"
								passHref
							>
								<div className="workBx">
									<div className="imgBx">
										{/* <Image
												className="object-contain"
												layout="fill"
												src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
											/> */}
										WA
									</div>
									<div className="textBx">
										<h3>WhatsApp</h3>
									</div>
								</div>
							</Link>
							<Link
								href="https://russellportfolio.netlify.app"
								passHref
							>
								<div className="workBx">
									<div className="imgBx">
										{/* <Image
												className="object-contain"
												layout="fill"
												src="https://repository-images.githubusercontent.com/252413723/e6f28180-8882-11ea-9e76-78d72dfa2af0"
											/> */}
										SA
									</div>
									<div className="textBx">
										<h3>Sanity Blog CMS</h3>
									</div>
								</div>
							</Link>
							<Link
								className="cursor-pointer"
								href="https://ecstatic-leavitt-a2e426.netlify.app"
								passHref
							>
								<div className="workBx">
									<div className="imgBx">
										{/* <Image
												className="object-contain"
												layout="fill"
												src="https://ecstatic-leavitt-a2e426.netlify.app/_next/static/images/logo-dc45e16445beb0dd598e41ae68c69c61.svg"
											/> */}
										SL
									</div>
									<div className="textBx">
										<h3>Startup Landing</h3>
									</div>
								</div>
							</Link>
							<Link href="https://nervous-ramanujan-132263.netlify.app">
								<div className="workBx">
									<div className="imgBx">
										{/* <Image
												className="object-contain"
												layout="fill"
												src="https://nervous-ramanujan-132263.netlify.app/static/media/svg-3.5f11287c.svg"
											/> */}
										DO
									</div>
									<div className="textBx">
										<h3>Dolla</h3>
									</div>
								</div>
							</Link>
						</div>
					</section>

					{/* <section
							className="testimonials adjust"
							id="testimonials"
						>
							<div className="title">
								<h2>Testimonials</h2>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua.
								</p>
							</div>
							<div className="content">
								<div className="testimonialsBox">
									<div className="imgBx">
										<img src="images/user1.jpg" />
									</div>
									<p>
										Tortor condimentum lacinia quis vel
										eros. Sed euismod nisi porta lorem
										mollis aliquam ut porttitor leo. Sed
										euismod nisi porta lorem. Justo laoreet
										sit amet cursus sit amet dictum sit.
										Quam viverra orci sagittis eu volutpat
										odio facilisis mauris sit. Dui nunc
										mattis enim ut tellus elementum
										sagittis. Vitae nunc sed velit dignissim
										sodales. Massa sapien faucibus et
										molestie ac feugiat. Pulvinar sapien et
										ligula ullamcorper malesuada proin.
										Porttitor rhoncus dolor purus non enim
										praesent elementum facilisis leo.
									</p>
									<h4>
										Someone Famous
										<br />
										<span>Website Designer</span>
									</h4>
								</div>
								<div className="testimonialsBox">
									<div className="imgBx">
										<img src="images/user2.jpg" />
									</div>
									<p>
										Tortor condimentum lacinia quis vel
										eros. Sed euismod nisi porta lorem
										mollis aliquam ut porttitor leo. Sed
										euismod nisi porta lorem. Justo laoreet
										sit amet cursus sit amet dictum sit.
										Quam viverra orci sagittis eu volutpat
										odio facilisis mauris sit. Dui nunc
										mattis enim ut tellus elementum
										sagittis. Vitae nunc sed velit dignissim
										sodales. Massa sapien faucibus et
										molestie ac feugiat. Pulvinar sapien et
										ligula ullamcorper malesuada proin.
										Porttitor rhoncus dolor purus non enim
										praesent elementum facilisis leo.
									</p>
									<h4>
										Someone Famous
										<br />
										<span>Website Designer</span>
									</h4>
								</div>
								<div className="testimonialsBox">
									<div className="imgBx">
										<img src="images/user3.jpg" />
									</div>
									<p>
										Tortor condimentum lacinia quis vel
										eros. Sed euismod nisi porta lorem
										mollis aliquam ut porttitor leo. Sed
										euismod nisi porta lorem. Justo laoreet
										sit amet cursus sit amet dictum sit.
										Quam viverra orci sagittis eu volutpat
										odio facilisis mauris sit. Dui nunc
										mattis enim ut tellus elementum
										sagittis. Vitae nunc sed velit dignissim
										sodales. Massa sapien faucibus et
										molestie ac feugiat. Pulvinar sapien et
										ligula ullamcorper malesuada proin.
										Porttitor rhoncus dolor purus non enim
										praesent elementum facilisis leo.
									</p>
									<h4>
										Someone Famous
										<br />
										<span>Website Designer</span>
									</h4>
								</div>
								<div className="testimonialsBox">
									<div className="imgBx">
										<img src="images/user1.jpg" />
									</div>
									<p>
										Tortor condimentum lacinia quis vel
										eros. Sed euismod nisi porta lorem
										mollis aliquam ut porttitor leo. Sed
										euismod nisi porta lorem. Justo laoreet
										sit amet cursus sit amet dictum sit.
										Quam viverra orci sagittis eu volutpat
										odio facilisis mauris sit. Dui nunc
										mattis enim ut tellus elementum
										sagittis. Vitae nunc sed velit dignissim
										sodales. Massa sapien faucibus et
										molestie ac feugiat. Pulvinar sapien et
										ligula ullamcorper malesuada proin.
										Porttitor rhoncus dolor purus non enim
										praesent elementum facilisis leo.
									</p>
									<h4>
										Someone Famous
										<br />
										<span>Website Designer</span>
									</h4>
								</div>
							</div>
						</section> */}

					<section className="contact adjust" id="contact">
						<div className="title">
							<h2>Let's Say Hi</h2>
							<p>
								Feel free to contact me. Just leave your details
								and I'll get back to you as soon as I can.
							</p>
						</div>
						<form className="contactForm" onSubmit={handleSubmit}>
							<div className="row">
								{/* <input
                                    htmlFor="fullname"
										type="text"
										name=""
										placeholder="First Name"
									/>
									<input
										type="text"
										name=""
										placeholder="Last Name"
									/> */}
								<input
									type="text"
									value={fullname}
									onChange={(e) => {
										setFullname(e.target.value);
									}}
									name="fullname"
									placeholder="Enter Your Full Name"
								/>
								{errors?.fullname}
							</div>
							<div className="row">
								<input
									type="text"
									name="email"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									placeholder="Enter Your E-Mail"
								/>
								{errors?.email}
								{/* <input
										type="text"
										name=""
										placeholder="Mobile #"
									/> */}
								<input
									type="text"
									name="subject"
									value={subject}
									onChange={(e) => {
										setSubject(e.target.value);
									}}
									placeholder="Subject"
								/>
								{errors?.subject}
							</div>
							<div className="row2">
								<textarea
									type="text"
									name="message"
									value={message}
									onChange={(e) => {
										setMessage(e.target.value);
									}}
									placeholder="Type Your Message Here"
								>
									{errors?.message}
								</textarea>
							</div>
							<div className="row2">
								<input type="submit" value="Send" />
							</div>
						</form>
					</section>

					<div className="copyright">
						<p>Copyright © 2021 PalmaView. All Rights Reserved.</p>
					</div>
				</div>
				{/* </div> */}
			</div>
		</>
	);
}

export default Portfolio;
