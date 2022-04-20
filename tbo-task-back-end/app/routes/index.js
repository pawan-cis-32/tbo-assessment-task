import initCalculationFromFileRoutes from './calculationFileRoutes.js';


const initRoutes = (app) => {
  app.use(`/uploadFile`, initCalculationFromFileRoutes());
 };

export default initRoutes;
