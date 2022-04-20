import express from 'express';
import CalculationFileDataController from '../controllers/calculationFileDataController';


//Routes for calculation api 
const initCalculationFromFileRoutes = () => {
  const calculationFromFileRoutes = express.Router();
  calculationFromFileRoutes.post('/uploadCsvFileForCalculation', CalculationFileDataController.uploadCsvFileForCalculation);
  
  return calculationFromFileRoutes;
};

export default initCalculationFromFileRoutes;
