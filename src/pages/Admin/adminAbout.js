import React from 'react';
import { Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/rootSlice';
import { apiPost } from '../../services/api';
import Button from '../../components/forms/button';
import { userStatus } from '../../lib/common/constants';

const AdminAbout = () => {

  const dispatch = useDispatch();
  const { portfolioData } = useSelector(state => state.root);
  const { user } = useSelector(state => state.auth);

  const onFinish = async (values) => {
    try {
      const skills = values?.skills?.split(', ');
      values.skills = skills;
      dispatch(setLoading(true));
      const response = await apiPost(`/updateAbout`, {
        ...values,
        userId: user.userId,
      });
      dispatch(setLoading(false));
      message.success(response.data.message)
    } catch (err) {
      dispatch(setLoading(false));
      message.error(err?.data.message);
    }
  }

  const { status } = user;

  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={{ ...portfolioData?.about, skills: portfolioData?.about?.skills.join(', ') }}>
        <Form.Item name='imageURL' label='Image URL'>
          <input placeholder='Image URL' />
        </Form.Item>
        <Form.Item name='description1' label='Description'>
          <textarea placeholder='Description' />
        </Form.Item>
        <Form.Item name='description2' label='Another Description'>
          <textarea placeholder='Another Description' />
        </Form.Item>
        <Form.Item name='skills' label='Skills'>
          <textarea placeholder='Skills' />
        </Form.Item>
        <div className='flex justify-end w-full'>
          <Button btnClass='px-10 py-2 rounded bg-primary text-white' text='SAVE' disabled={status === userStatus.INACTIVE} />
          {/* <button className='px-10 py-2 rounded bg-primary text-white' type='submit'>SAVE</button> */}
        </div>
      </Form>
    </div>
  )
}

export default AdminAbout;