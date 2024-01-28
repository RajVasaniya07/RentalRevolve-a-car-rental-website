import React, { useState } from 'react';
import { Col, Row, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { addCar } from '../redux/actions/carsActions';

function AddCar() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [objectUrl, setObjectUrl] = useState('');
  const [file, setFile] = useState(null); // Initialize with null

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFinish = async (values) => {
    if (!file) {
      alert('Please select an image file.');
      return;
    }

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

    try {
      const responseData = await response.json();
      console.log('Server Response:', responseData);

      const uploadResponse = await fetch(responseData.url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      console.log('Image uploaded successfully:', uploadResponse);

      // Update objectUrl after successful image upload
      setObjectUrl(responseData.objectUrl);

      // Assign the correct value to values.image
      values.image = responseData.objectUrl;

      dispatch(addCar(values));
      console.log(values);
    } catch (error) {
      console.error('Error parsing server response:', error);
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
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>Add New Car</h3>
            <hr />
            <Form.Item name="name" label="Car name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Click on below button for upload image from your device" rules={[{ required: true }]}>
              {/* Conditional rendering based on whether file is selected */}
              {file ? (
                <p>File selected: {file.name}</p>
              ) : (
                <>
                  <input type="file" onChange={handleFileChange} accept="image/*" />
                  {/* <button onClick={uploadImage}>Upload Image</button> */}
                </>
              )}
            </Form.Item>
            <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="fuelType" label="Fuel Type" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="year" label="year" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="mileage" label="mileage" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="carType" label="carType" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="rentPerHour" label="rentPerHour" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <div className="text-right">
              <button className="btn1">ADD CAR</button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddCar;
