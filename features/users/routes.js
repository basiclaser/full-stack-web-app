import express from "express"
import { createUser, getAllUsers, getOneUser } from "./controllers"
import {body} from "express-validator"

const routes = express.Router()

routes
    .route('/')
    .get(getAllUsers)
    .post(
        body("firstname").not().isEmpty().trim().escape(),
        body("lastname").not().isEmpty().trim().escape(),
        createUser
    )

routes.route('/:id').get(getOneUser);

export default routes