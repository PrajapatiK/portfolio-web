import React from 'react'
import { Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/rootSlice';
import { apiPost } from '../../services/api';
import Button from '../../components/forms/button';
import { userStatus } from '../../lib/common/constants';

const AdminSocial = () => {

  const dispatch = useDispatch();
  const { portfolioData } = useSelector(state => state.root);
  const { user } = useSelector(state => state.auth);

  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await apiPost(`/updateSocial`, {
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
        <Button btnClass='px-10 py-2 rounded bg-primary text-white' text='SAVE' disabled={status === userStatus.INACTIVE} />
          {/* <button className='px-10 py-2 rounded bg-primary text-white' type='submit'>SAVE</button> */}
        </div>
      </Form>
    </div>
  )
}

export default AdminSocial;