exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login Page",
    isLoggedIn: false,
  });
};
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Login Page",
    isLoggedIn: false,
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
    } return true;
  }), 
  check("userType")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),
];

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  // res.cookie("isLoggedIn",true);
  req.session.isLoggedIn = true;
  // req.isLoggedIn=true;
  res.redirect("/");
};
exports.postLogout = (req, res, next) => {
  // console.log(req.body);
  // res.cookie("isLoggedIn",false);
  req.session.destroy(() => {
    res.redirect("/login");
  });
}