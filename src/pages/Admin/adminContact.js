import React from 'react'
import { Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/rootSlice';
import { apiPost } from '../../services/api';
import Button from '../../components/forms/button';
import { userStatus } from '../../lib/common/constants';

const AdminContact = () => {

  const dispatch = useDispatch();
  const { portfolioData } = useSelector(state => state.root);
  const { user } = useSelector(state => state.auth);

  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await apiPost(`/updateContact`, {
        ...values,
        userId: user.userId,
      });
      dispatch(setLoading(false));
      message.success(response.data.message)
    } catch (err) {
      dispatch(setLoading(false));
      message.error(err?.data.message)
    }
  }

  const { status } = user;

  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData?.contact}>
        <Form.Item name='name' label='Name'>
          <input placeholder='Name' />
        </Form.Item>
        <Form.Item name='age' label='Age'>
          <input placeholder='Age' />
        </Form.Item>
        <Form.Item name='gender' label='Gender'>
          <input placeholder='Gender' />
        </Form.Item>
        <Form.Item name='email' label='Email'>
          <input placeholder='Email' />
        </Form.Item>
        <Form.Item name='mobile' label='Mobile'>
          <input placeholder='Mobile' />
        </Form.Item>
        <Form.Item name='address' label='Address'>
          <input placeholder='Address' />
        </Form.Item>
        <div className='flex justify-end w-full'>
          <Button btnClass='px-10 py-2 rounded bg-primary text-white' text='SAVE' disabled={status === userStatus.INACTIVE} />
          {/* <button className='px-10 py-2 rounded bg-primary text-white' type='submit'>SAVE</button> */}
        </div>
      </Form>
    </div>
  )
}

export default AdminContact;