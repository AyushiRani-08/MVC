const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const user = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login Page",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user:{},
  });
};
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Login Page",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      userType: "guest",
    },
    user:{},  
  });
};
exports.postSignup = [
  check("firstName")
    .not()
    .isEmpty()
    .withMessage("First Name is required")
    .matches(/^[A-Za-z]+$/)
    .isLength({ min: 2 })
    .withMessage("First Name should be at least 2 characters long")
    .trim(),
  check("lastName")
    .optional()
    .matches(/^[A-Za-z]*$/)
    .isLength({ min: 2 }),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  check("userType").isIn(["guest", "host"]).withMessage("Invalid user type"),
  check("terms")
    .equals("on")
    .withMessage("You must accept the terms and conditions"),
  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup Page",
        isLoggedIn: false,
        errors: errors.array(),
        oldInput: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          userType: req.body.userType,
        },
        user:{},
      });
    }
    const user = new User({ firstName, lastName, email, password, userType });
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        user.password = hashedPassword;
        user
          .save()
          .then(() => {
            console.log("user created");
            res.redirect("/login");
          })
          .catch((err) => {
            console.log(" Error saving user:", err);
          });
      })
      .catch((err) => {
        return res.status(422).render("auth/signup", {
          pageTitle: "Signup Page",
          isLoggedIn: false,
          errors: errors.array().map((err) => err.msg),
          oldInput: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userType: req.body.userType,
          },
          user:{},
        });
      });
  },
];

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
      return res.status(422).render("auth/login", {
        pageTitle: "Login Page",
        isLoggedIn: false,
        errors: ["Invalid email or password" ],
        oldInput: { email },
        user:{},
      });
  }
  const doMatch = await bcrypt.compare(password, user.password);
  if (!doMatch) {
      return res.status(422).render("auth/login", { 
        pageTitle: "Login Page",
        isLoggedIn: false,
        errors: ["Invalid email or password"],
        oldInput: { email },
        user:{},
      });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;  
  return req.session.save((err) => {
    console.log(err);
    res.redirect("/");
  });
};
exports.postLogout = (req, res, next) => {
  // console.log(req.body);
  // res.cookie("isLoggedIn",false);
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
