import { Form, Modal, message } from 'antd';
import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { reloadData, setLoading, setPortfolioData } from '../../redux/rootSlice';

const AdminExperience = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector(state => state.root);
  const { user } = useSelector(state => state.auth);
  const { experiences = [] } = portfolioData || {};
  const [showModal, setShowModal] = useState(false);
  const initialState = {
    period: '',
    company: '',
    title: '',
    description: '',
  };
  const [selectedData, setSelectedData] = useState(initialState);
  const [type, setType] = useState('ADD');

  const handleSubmit = async () => {
    console.log(selectedData);
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/addUpdateExperience`, {
        ...selectedData,
        userId: user.userId,
      });
      dispatch(setLoading(false));
      console.log(response.data);
      message.success(response.data.data.message)
      setShowModal(false);
      setSelectedData(initialState);
      dispatch(setLoading(false));
      // dispatch(reloadData(true));
      const portfolioData = await axios.get(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/getAllPortfolio?username=${user.username}`);
      console.log(portfolioData.data.data)
      dispatch(setPortfolioData(portfolioData.data.data));
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
      message.error(err.message)
    }
  }

  const onDelete = async (item) => {
    console.log(item);
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/removeExperience`, {
        ...item,
        userId: user.userId,
      });
      dispatch(setLoading(false));
      console.log(response.data);
      message.success(response.data.data.message)
      setShowModal(false);
      setSelectedData(initialState);
      dispatch(setLoading(false));
      // dispatch(reloadData(true));
      const portfolioData = await axios.get(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/getAllPortfolio?username=${user.username}`);
      console.log(portfolioData?.data.data)
      dispatch(setPortfolioData(portfolioData?.data.data));
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
      message.error(err.message)
    }
  }
  console.log('User: ', user);
  return (
    <>
      <div className='flex justify-end'>
        <button className='bg-primary px-5 py-2 text-white rounded' onClick={() => {
          setSelectedData(initialState);
          setShowModal(true);
          setType('ADD');
        }}>Add Experience</button>
      </div>
      <div className='grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1'>
        {experiences.map(experience => (
          <div className='shadow border p-5 border-gray-400 flex flex-col'>
            <h1 className='text-secondary text-xl font-bold'>{experience.period}</h1>
            <hr />
            <h1 className='mt-5'>Company: {experience.company}</h1>
            <h1>Role: {experience.title}</h1>
            <h1 className='h-36 overflow-auto'>{experience.description}</h1>
            <div className='flex justify-end gap-5 mt-5 bottom-0 right-0'>
              <button className='bg-red-500 text-white px-5 py-2 rounded' onClick={() => {
                console.log(experience);
                onDelete(experience);
              }}>Delete</button>
              <button className='bg-primary text-white px-5 py-2 rounded' onClick={() => {
                console.log(experience);
                setSelectedData(() => experience);
                setShowModal(true);
                setType('EDIT');
              }}>Edit</button>
            </div>
          </div>
        ))}

      </div>
      {(type === 'ADD' || selectedData) && <Modal open={showModal} title={selectedData ? 'Edit Experience' : 'Add Experience'} footer={null} onCancel={() => {
        setShowModal(false);
        setSelectedData(initialState);
      }}>
        <Form layout='vertical' initialValues={selectedData || {}}>
          <Form.Item label='Period'>
            <input placeholder='Period' value={selectedData?.period || ''} onChange={(e) => setSelectedData({ ...selectedData, period: e.target.value })} />
          </Form.Item>
          <Form.Item label='Company'>
            <input placeholder='Company' value={selectedData?.company || ''} onChange={(e) => setSelectedData({ ...selectedData, company: e.target.value })} />
          </Form.Item>
          <Form.Item label='Title'>
            <input placeholder='Title' value={selectedData?.title || ''} onChange={(e) => setSelectedData({ ...selectedData, title: e.target.value })} />
          </Form.Item>
          <Form.Item label='Description'>
            <textarea placeholder='Description' value={selectedData?.description} onChange={(e) => setSelectedData({ ...selectedData, description: e.target.value })} />
            {/* <input placeholder='Description' value={selectedData?.description || ''} onChange={(e) => setSelectedData({ ...selectedData, description: e.target.value })} /> */}
          </Form.Item>
          <div className='flex justify-end'>
            <button className='border-primary text-primary px-5 py-2' onClick={() => {
              setShowModal(false);
              setSelectedData(initialState);
            }}>Cancel</button>
            <button className='bg-primary text-white px-5 py-2' onClick={handleSubmit}>{selectedData ? 'Update' : 'Add'}</button>
          </div>
        </Form>
      </Modal>}
    </>
  )
}

export default AdminExperience;