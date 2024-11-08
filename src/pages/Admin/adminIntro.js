import React from 'react'
import { Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/rootSlice';
import { apiPost } from '../../services/api';
import Button from '../../components/forms/button';
import { userStatus } from '../../lib/common/constants';

const AdminIntro = () => {

  const dispatch = useDispatch();
  const { portfolioData } = useSelector(state => state.root);
  const { user } = useSelector(state => state.auth);


  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await apiPost(`/updateIntro`, {
        ...values,
        userId: user.userId,
      });
      dispatch(setLoading(false));
      message.success(response.data.message)
    } catch (err) {
      dispatch(setLoading(false));
      message.error(err.data.message)
    }
  }
  const { status } = user;
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
          <Button btnClass='px-10 py-2 rounded bg-primary text-white' text='SAVE' disabled={status === userStatus.INACTIVE} />
          {/* <button className='px-10 py-2 rounded bg-primary text-white' type='submit'>SAVE</button> */}
        </div>
      </Form>
    </div>
  )
}

export default AdminIntro;