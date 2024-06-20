import {Router} from "express";
import {createUsersBySemester} from "../controllers/user.controller.js";
import { fetchUserById, fetchUserBySemester } from "../controllers/user.controller.js";
import {updateUserById} from "../controllers/user.controller.js";
import {deleteUserBySemester, deleteUserById} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { csvParser } from "../middlewares/csvParser.middleware.js";

const router = Router()


//--------------------CREATE APIs-------------------------//
router.route("/users/create/:sem").post(
    upload.single('file'), 
    csvParser,
    createUsersBySemester
)

//--------------------FETCH APIs-------------------------//
router.route("/users/fetch/:id").post(
    fetchUserById
)
router.route("/users/fetch/:sem").post(
    fetchUserBySemester
)

//--------------------UPDATE APIs-------------------------//
router.route('/users/:id').put(
    updateUserById
)

//--------------------DELETE APIs--------------------------//
router.route('/users/:id').delete(
    deleteUserById
)
router.route('/users/:sem').delete(
    deleteUserBySemester
)




export default router