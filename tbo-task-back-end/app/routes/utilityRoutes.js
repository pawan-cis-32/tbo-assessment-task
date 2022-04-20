import express from 'express';
import UtilityController from '../controllers/utilityController';



//Routes for all upload file api 
const initUtilityRoutes = () => {
  const utilityRoutes = express.Router();
  utilityRoutes.post('/uploadCsvFile', UtilityController.uploadCsvFileForCalculation);
  

  return utilityRoutes;
};

export default initUtilityRoutes;
