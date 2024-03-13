const express  = require('express');
const { verifyUser } = require('../utils/verifyUser');
const { create } = require('../controllers/post.controller.js')

const router = express.Router();

router.post('/create',verifyUser,create)

module.exports = router