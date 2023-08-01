import { Router } from "express";
import customerModel from "./../models/customer.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const router = Router();

//middleware for authenticating session
const isAuth = (req, res, next) => {
  if ((req.session.isAuth)) {
    next();
  } else {
    res.redirect("/signIn");
  }
};

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signUp", (req, res) => {
  res.render("signUp");
});

router.get("/signIn", (req, res) => {
  res.render("signIn");
});
router.get("/tvshows",isAuth, (req, res) => {
  res.render("tvshows");
});
router.get("/home", isAuth, async (req, res) => {
  res.render("home");
});
//post form-data
router.post("/signUp", async (req, res) => {
  const customerInfo = req.body;

  try {
    await customerModel.create(customerInfo);

    //remove any previous identification
    res.clearCookie("userId");
    res.clearCookie("super");

    //input the  form data into the cookie
    res.cookie("userId", req.body.email);

    res.redirect("home");
  } catch (error) {
    res.render("signUp", { error: error.message });
  }
});

// screening for login
router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    // remove any previous identification
    res.clearCookie("userId");
    res.clearCookie("super");

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      res.cookie("userId", email);
      res.cookie("super", "1");

      res.redirect("/home");
      return;
    }

    const user = await customerModel.findOne({ email: email });

    if (user === null) {
      res.render("/signIn", { error: "Invalid credentials" });
      return;
    }

    if (bcrypt.compareSync(password, user.password) === false) {
      res.render("/signIn", { error: "Invalid credentials" });
      return;
    }

    // res.cookie("userId", email);

    //set authentication to true
    req.session.isAuth = true;
    res.redirect("/home");
  } catch (error) {
    res.render("signIn", { error: error.message });
  }
});

//set router to get home and add security
// router.get("/home", isAuth, async (req, res) => {
//   const cookie = req.cookies;

//   // check if cookie is set
//   if (cookie.userId == undefined) {
//     res.redirect("/");
//     return;
//   }

//   // check db
//   if (typeof cookie.super === "undefined") {
//     const userEmail = cookie.userId;

//     const users = await customerModel.find({ email: userEmail });

//     if (users.length === 0) {
//       res.redirect("/signIn");
//       return;
//     }
//   }
//   res.render("home");
// });
//fetch data for details using their id
router.get("/details",isAuth, (req, res) => {
  const detailid = req.query.id;

  fetch("https://www.episodate.com/api/show-details?q=" + detailid)
    .then((data) => {
      return data.json();
    })
    .then((post) => {
      res.render("details", { post });
    });
});

// export router instance
export default router;
