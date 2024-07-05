import React from 'react'
import { Form, message } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/rootSlice';

const AdminSocial = () => {

  const dispatch = useDispatch();
  const { portfolioData } = useSelector(state => state.root);
  const { user } = useSelector(state => state.auth);

  const onFinish = async (values) => {
    console.log(values);
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/updateSocial`, {
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

  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData?.social}>
        <Form.Item name='fbURL' label='FaceBook URL'>
          <input placeholder='Facebook URL' />
        </Form.Item>
        <Form.Item name='mailURL' label='Mail URL'>
          <input placeholder='Mail URL' />
        </Form.Item>
        <Form.Item name='instaURL' label='Instagram URL'>
          <input placeholder='Instagram URL' />
        </Form.Item>
        <Form.Item name='linkedInURL' label='LinkedIn URL'>
          <input placeholder='LinkedIn URL' />
        </Form.Item>
        <Form.Item name='githubURL' label='GitHub URL'>
          <input placeholder='GitHub URL' />
        </Form.Item>
        <div className='flex justify-end w-full'>
          <button className='px-10 py-2 rounded bg-primary text-white' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminSocial;