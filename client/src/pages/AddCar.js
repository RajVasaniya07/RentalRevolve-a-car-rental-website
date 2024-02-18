import React, { useState,useEffect } from 'react';
import { Col, Row, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { addCar } from '../redux/actions/carsActions';

function AddCar() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [objectUrl, setObjectUrl] = useState('');
  const [singleObjectUrl, setSingleObjectUrl] = useState('');
  const [multipleObjectUrls, setMultipleObjectUrls] = useState([]);
  const [file, setFile] = useState(null); // Initialize with null
  const [files, setFiles] = useState([]); // Initialize with empty array

  useEffect(() => {
    console.log(files);
  }, [files]);

  const handleSingleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  
  const handleMultipleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const onFinish = async (values) => {
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
  
    console.log("Before dispatching addCar:", values);
  if(files.length<4){
    alert('you selected less images then 4 image file,please select exact 4 images');
      return;
  }

  if(files.length>4){
    alert('you selected more than 4 image file,please select exact 4 images and first 4 will be consider.');
      return;
  }

      if (files.length > 0) {
        console.log("Files are present. Uploading multiple images...");
  
        // Multiple image upload
        const filesArray = files.map(file => ({
          filename: file.name,
          contentType: file.type
        }));
        console.log(filesArray);
  
        const responseMultiple = await fetch('/api/uploadMultiple', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ files: filesArray }),
        });
  
        const responseDataMultiple = await responseMultiple.json();
        console.log('Server Response for multiple images:', responseDataMultiple);

        const urls = responseDataMultiple.urls;
// Assuming responseDataMultiple.urls and files have the same length
for (let i = 0; i < urls.length; i++) {
    const { url } = urls[i];
    const file = files[i];

    // Perform a PUT request for each URL and file
    const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
        },
    });
    // Handle response as needed
}

          //console.log("444444444",file,files);
  
        // Update objectUrls after successful image uploads
        setMultipleObjectUrls(responseDataMultiple.urls.map(url => url.objectUrl));
  
        // Assign the correct value to values.images
        values.images = responseDataMultiple.urls.map(url => url.objectUrl);
      }
      console.log("444444444",file,files);

      // Dispatch addCar action once after uploading images
      dispatch(addCar(values));
      console.log("After dispatching addCar:", values);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  

  return (
    <>
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
            <Form.Item label="Upload single image" rules={[{ required: true }]}>
              <input type="file" onChange={handleSingleFileChange} accept="image/*" />
              {singleObjectUrl && <p>Uploaded: {singleObjectUrl}</p>}
            </Form.Item>
            <Form.Item label="Upload four images" rules={[{ required: true }]}>
              <input type="file" onChange={handleMultipleFileChange} accept="image/*" multiple />
              {multipleObjectUrls.length > 0 && (
                <ul>
                  {multipleObjectUrls.map((url, index) => (
                    <li key={index}>Uploaded: {url}</li>
                  ))}
                </ul>
              )}
            </Form.Item>
            <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="fuelType" label="Fuel Type" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="year" label="Year" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="mileage" label="Mileage" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="carType" label="Car Type" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="rentPerHour" label="Rent Per Hour" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <div className="text-right">
              <center>
              <button className="btn1" type="submit">ADD CAR</button>
              </center>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default AddCar;
