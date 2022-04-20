import express from 'express';
import UserController from '../controllers/userController';

//Routes for all user 
const initUserRoutes = () => {
  const userRoutes = express.Router();
 

  return userRoutes;
};

export default initUserRoutes;
