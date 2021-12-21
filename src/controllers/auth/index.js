import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import User from "../../models/user";

// user sign up
const signUp = async (req, res) => {
  const { email, password } = req.body;

  await User.findOne({ email })
    .then(async (user) => {
      if (user) {
        res.status(400).json({ error: `user already exist!` });
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
              console.log(token);
              res.status(201).json({
                token,
                email: user.email,
              });
            }
          );
        }
      });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: `Registration was not successfull ${err}` });
      return;
    });
};

// User sign in
const signIn = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const { email, password } = req.body;

  try {
    User.findOne({ email }).then((user) => {
      if (!user) {
        res.status(401).json({ error: "user does not exits!" });
        return;
      }
      //console.log(user)
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          res.status(400).json({ error: `Invalid password` });
          return;
        }
        if (user) {
          const { id, email } = user;
          jwt.sign(
            { id: id, email },
            config.jwtSecret,
            { expiresIn: "30days" },
            (err, token) => {
              res.status(201).json({
                token,
                email,
              });
            }
          );
        }
      });
    });
  } catch (err) {
    res.status(400).send(JSON.stringify(`Unable to login ${err}`));
    return;
  }
};

// exports.signOut = (req, res) => {
//   res.clearCookie("token");
//   res.status(200).json({ message: "Sign Out Successfully" });
// };

export { signUp, signIn };
