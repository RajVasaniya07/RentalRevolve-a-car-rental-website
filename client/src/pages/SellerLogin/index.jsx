import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

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

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
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
							<p style={{ padding: "0 15px" }}>Forgot Password ?</p>
						</Link>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn} style={{background:"#092635"}}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/SellerSingup">
						<button type="button" className={styles.white_btn}style={{background:"white",color:"#092635"}}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;