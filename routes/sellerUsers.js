const router = require("express").Router();
const { Seller, validate } = require("../models/seller");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await Seller.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new Seller({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		// const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		const url = ` http://localhost:3000/sellerUser/${user._id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id/verify/:token", async (req, res) => {
    try {
        const user = await Seller.findById(req.params.id );
        console.log(user);
        if (!user) return res.status(400).send({ message: "Invalid User" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
		console.log(token);
        if (!token) return res.status(400).send({ message: "Invalid link" });

        await Seller.updateOne({ _id: user._id }, { $set: { verified: true } });
       // await token.remove();

        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
        console.log(error);
    }
});


module.exports = router;
