import { React, useState, useEffect } from 'react';
import axios from 'axios';

const CalculationToDo = () => {

  const [calculation, setCalculation] = useState({});

  useEffect(() => {

  }, [calculation])

  const saveFile = (e) => {

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("fileName", e.target.files[0].name);
    axios.post('http://localhost:3002/uploadFile/uploadCsvFileForCalculation', formData)
      .then(fileResponse => {
        setCalculation(fileResponse.data)
      });

  };


  return (
    <div className="container">
      <div className="upload-csv-box">
        <div className="screen__content">
          <h4>Upload csv file</h4>
          <div className="input-csv-box">
            <input type="file" name="csv-fille" className="input_style" onChange={saveFile} />
          </div>
        </div>
        <div className='calculated-list'>
          <div className='row'>
            <div className='col-md-4'>
              <h5>Sum</h5>
              <h6> {calculation.sum}</h6>
            </div>
            <div className='col-md-4'>
              <h5>Average</h5>
              <h6> {calculation.avg}</h6>
            </div>
            <div className='col-md-4'>
              <h5>Standard deviation</h5>
              <h6> {calculation.stdev}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default CalculationToDo;