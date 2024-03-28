import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import login from "../../images/login.jpg";
import loginback from "../../images/loginback.jpg"
import Footer from "../../components/Footer";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/sellerAuth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("email", data.email);
			localStorage.setItem("seller", res.data.seller);
			window.location = "/Main";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	const handleLogout = () => {
		window.location ="/BookingCar";
		};
		
		const onclick = () => {
		window.location ="/";
		};

		const onclick1=()=>
{
window.location="/afterHome"
};

	return (
		<div>

<header className="header" data-header>
            <div className="container">
              <div className="overlay" data-overlay />
              <h1 className="h2" style={{fontSize:"35px",marginTop:"10px",color:"#1A9DF4",fontWeight:"bold"}}>RentalRevolve</h1>

              {/* <h1>RentalRevolve</h1> */}

              <a href="#" className="logo">
              </a>
              <nav className="navbar" data-navbar>
                <ul className="navbar-list">
                </ul>
              </nav>
              <div className="header-actions">
                
              <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick}>
                  <span id="aria-label-txt">Home</span>
                </button>

				<button className="btn" aria-labelledby="aria-label-txt" onClick={onclick1}>
                  <span id="aria-label-txt">Login</span>
                </button>

                <button className="btn" aria-labelledby="aria-label-txt" href="/BookingCar" onClick={handleLogout}>
                  <span id="aria-label-txt">Explore cars</span>
                </button>
                <button className="btn user-btn" aria-label="Profile">
                <ion-icon name="person-outline" />
                </button>

                <button className="nav-toggle-btn" data-nav-toggle-btn aria-label="Toggle Menu">
                  <span className="one" />
                  <span className="two" />
                  <span className="three" />
                </button>
              </div>
            </div>
          </header>

          <br></br>
		<div className={styles.login_container} style={{backgroundImage: `url(${loginback})`}}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1 style={{color:"#1A9DF4"}}>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						
						
						<Link to="/forgot-password-seller" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px",color:"#1A9DF4" }}>Forgot Password ?</p>
						</Link>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn} style={{background:"#1A9DF4"}}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right} style={{background:"#1A9DF4"}}>
					<h1>New Here ?</h1>
					<Link to="/SellerSingup">
						<button type="button" className={styles.white_btn}style={{background:"white",color:"#1A9DF4"}}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
<Footer/>

		</div>
	);
};

export default Login;