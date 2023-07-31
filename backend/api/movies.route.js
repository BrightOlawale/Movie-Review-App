import express from 'express';

// Get access to express router
const router = express.Router();

//
router.route("/").get((req, res) => {
    res.send("Welcome to home")
})

export default router;