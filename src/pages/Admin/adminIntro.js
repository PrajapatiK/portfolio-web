import React from 'react'
import { Form, message } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/rootSlice';

const AdminIntro = () => {

  const dispatch = useDispatch();
  const { portfolioData } = useSelector(state => state.root);
  const { user } = useSelector(state => state.auth);


  const onFinish = async (values) => {
    console.log(values);
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/updateIntro`, {
        ...values,
        userId: user.userId,
      });
      dispatch(setLoading(false));
      console.log(response.data);
      message.success(response.data.data.message)
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
      message.error(err.message)
    }
  }
  console.log('Intro User: ', user);
  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData?.intro}>
        <Form.Item name='welcomeText' label='Welcome Text'>
          <input placeholder='Welcome text' />
        </Form.Item>
        <Form.Item name='firstName' label='First Name'>
          <input placeholder='First name' />
        </Form.Item>
        <Form.Item name='lastName' label='Last Name'>
          <input placeholder='Last name' />
        </Form.Item>
        <Form.Item name='caption' label='Caption'>
          <input placeholder='Caption' />
        </Form.Item>
        <Form.Item name='description' label='Description'>
          <textarea placeholder='Description' />
        </Form.Item>
        <div className='flex justify-end w-full'>
          <button className='px-10 py-2 rounded bg-primary text-white' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminIntro;