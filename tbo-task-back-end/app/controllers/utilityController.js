import Responder from '../../lib/expressResponder';
import MulterService from '../service/multerService';
import fs from 'fs';
import csv from 'csvtojson'

export default class UtilityController {


    //Calculate sum, average and standard deviation from csv file
    static uploadCsvFileForCalculation(req, res) {
        
        var calculatedData = {
            sum: 0,
            avg: 0,
            stdev: 0
        };
        var ordersList = [];
        MulterService.uploadImage(req, res).then((file) => {

            csv()
                .fromFile(file.path)
                .then((jsonObj) => {
                   
                    if (jsonObj) {
                        jsonObj.forEach((item) => {
                            calculatedData.sum = calculatedData.sum + parseInt(item.Orders);
                            ordersList.push(parseInt(item.Orders));
                        });
                        calculatedData.avg = calculatedData.sum / jsonObj.length;
                        let mean = ordersList.reduce((acc, curr) => {
                            return acc + curr
                        }, 0) / ordersList.length;
                        // Assigning (value - mean) ^ 2 to every array item
                        ordersList = ordersList.map((k) => {
                            return (k - mean) ** 2
                        })
                        // Calculating the sum of updated array
                        let sum = ordersList.reduce((acc, curr) => acc + curr, 0);
                        // Returning the Standered deviation
                        calculatedData.stdev = Math.sqrt(sum / ordersList.length);
                       
                    }


                    fs.unlink(file.path, (err) => {
                        if (err) throw err;
                        
                        Responder.success(res, calculatedData)

                    });


                })


        }).catch(error => Responder.operationFailed(res, error));
    }




}















