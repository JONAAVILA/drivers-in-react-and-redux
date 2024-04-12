const { Router } = require("express");
const getAllDrivers = require('./../controllers/get/getAllDrivers');
const getDriverById = require('./../controllers/get/getDriverById');
const getDriverByName = require('./../controllers/get/getDriverByName');
const postDriver = require('./../controllers/post/postDriver');
const getAllTeams = require('./../controllers/get/getAllTeams');

const router = Router();

router.get('/drivers/name', getDriverByName)
router.get('/drivers/:idDriver', getDriverById)
router.get('/drivers', getAllDrivers)
router.get('/teams', getAllTeams)

router.post('/drivers/create', postDriver)

module.exports = router;
