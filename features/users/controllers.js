import pool from "../../client"
import {body, validationResult} from "express-validator"


const getAllUsers = async(request, response) => {
    try {
        const results = await pool.query('SELECT * FROM users')
        return response.json(results.rows)
    } catch(error) {
        return response.status(500).json({error:error.message})
    }
}

const getOneUser = async(request, response) => {
    try {
        const id = request.params.id
        const oneUser = await pool.query('SELECT * FROM users WHERE id=$1',[id])

        if(oneUser.rows.length==0) return response.status(404).json({success:false, message:"sorry we couldn't find that user"})
        response.json({success:true, data: oneUser.rows[0]})
        
    } catch(error) {
        switch(error.name) {
            case "permission denied":
                response.status(403).json({success:false, message: error.message})
                break;
            default:
                response.status(500).json({success:false, message: error.message})
        }
    }
}

const createUser = async (request, response) => {
    const errors = validationResult(request)
    if(!errors.isEmpty()) return response.status(400).json({success:false, message:"check errors array", errors: errors.array()})
    try {
        const {firstname, lastname} = request.body
        await pool.query("INSERT INTO users(firstname,lastname) values($1,$2)",[firstname, lastname])
        response.sendStatus(201)
    } catch(e) {
        console.log(e)
    }
}

export {getAllUsers, getOneUser, createUser}