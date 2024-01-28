import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { getAllCars, editCar } from '../redux/actions/carsActions';
import { Col, Row, Form, Input } from 'antd';

function EditCar() {
  const { carid } = useParams();
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [objectUrl, setObjectUrl] = useState('');
  const [file, setFile] = useState(null);
  const [car, setCar] = useState();
  const [totalCars, setTotalCars] = useState([]);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setTotalCars(cars);
      setCar(cars.find((o) => o._id === carid));
    }
  }, [cars, carid]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const onFinish = async (values) => {
    // Ensure car is defined before attempting to access properties
    if (!car) {
      console.error('Car not found');
      return;
    }

    values._id = car._id;

    dispatch(editCar(values));

    if (!file) {
      alert('Please select an image file.');
      return;
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      const responseData = await response.json();

      const uploadResponse = await fetch(responseData.url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      setObjectUrl(responseData.objectUrl);

      values.image = responseData.objectUrl;

      dispatch(editCar(values));
    } catch (error) {
      console.error('Error uploading image or editing car:', error);
    }
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <br />
      <br />
      <br />
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          {totalCars.length > 0 && (
            <Form initialValues={car} className="bs1 p-2" layout="vertical" onFinish={onFinish}>
              <h3>Edit Car</h3>
              {car && <p>{car.name}</p>}
              <hr />
              {/* Form fields... */}
              <Form.Item name="name" label="Car name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              {/* Other form fields... */}
              <Form.Item name="rentPerHour" label="Rent Per Hour" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <div className="text-right">
                <button type="submit" className="btn1">
                  EDIT CAR
                </button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditCar;
