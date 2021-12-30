import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { responseMessage } from "../../helpers/response";
import User from "../../models/user";

// user sign up
const signUp = async (req, res) => {
  const { email, password } = req.body;

  await User.findOne({ email })
    .then(async (user) => {
      if (user) {
        const error = `user already exist!`
        res.status(400).json(responseMessage({}, error, false));
        return;
      }

      // hash password

      const salt = await bcrypt.genSaltSync(10);
      let hashedPassword = await bcrypt.hashSync(password, salt);

      // create new user
      const newUser = new User({
        email: email,
        password: hashedPassword,
      });
      newUser.save().then((user) => {
        if (user) {
          jwt.sign(
            { id: user.id, email: user.email },
            config.jwtSecret,
            { expiresIn: "30days" },
            (err, token) => {
             let data = {
               token,
               email: user.email,
             }
              res.status(201).json(responseMessage(data, "success", true));
            }
          );
        }
      });
    })
    .catch((err) => {
      const error = `Registration was not successfull`
      res
        .status(400)
        .json(responseMessage({}, error, false));
      return;
    });
};

// User sign in
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    User.findOne({ email }).then((user) => {
      if (!user) {
        const error = "Invalid credentials"
        res.status(400).json(responseMessage({}, error, false));
        return;
      }
      //console.log(user)
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          const error = `Invalid credentials`
          res.status(400).json(responseMessage({}, error, false));
          return;
        }
        if (user) {
          const { id, email } = user;
          jwt.sign(
            { id: id, email },
            config.jwtSecret,
            { expiresIn: "30days" },
            (err, token) => {
              let data = {
                token,
                email,
              }
              res.status(200).json(responseMessage(data, "success", true));
            }
          );
        }
      });
    });
  } catch (err) {
    const error = `Unable to login`
    res.status(400).json(responseMessage({}, error, false));
    return;
  }
};

// exports.signOut = (req, res) => {
//   res.clearCookie("token");
//   res.status(200).json({ message: "Sign Out Successfully" });
// };

export { signUp, signIn };
