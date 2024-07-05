import { Form, Modal, message } from 'antd';
import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setPortfolioData } from '../../redux/rootSlice';

const AdminProject = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector(state => state.root);
  const { user } = useSelector(state => state.auth);
  const { projects = [] } = portfolioData || {};
  const [showModal, setShowModal] = useState(false);
  const initialState = {
    title: '',
    image: '',
    description: '',
    link: '',
    technologies: '',
  };
  const [selectedData, setSelectedData] = useState(initialState);
  const [type, setType] = useState('ADD');
  // const [form] = Form.useForm();

  const handleSubmit = async () => {
    // console.log(values);
    console.log(selectedData);

    try {
      dispatch(setLoading(true));

      let technologies = [];
      if (!Array.isArray(selectedData?.technologies) && selectedData?.technologies?.trim() !== '') technologies = selectedData?.technologies?.split(', ');
      console.log(technologies);
      const selectedDataCopy = { ...selectedData, technologies };
      // setSelectedData(selectedDataCopy);
      const response = await axios.post(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/addUpdateProject`, {
        ...selectedDataCopy,
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
      // form.resetFields();
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
      const response = await axios.post(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/removeProject`, {
        ...item,
        userId: user.userId,
      });
      dispatch(setLoading(false));
      console.log(response.data);
      message.success(response.data.data.message)
      setShowModal(false);
      setSelectedData(initialState);
      dispatch(setLoading(false));
      const portfolioData = await axios.get(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/getAllPortfolio?username=${user.username}`);
      console.log(portfolioData.data.data)
      dispatch(setPortfolioData(portfolioData.data.data));
      // dispatch(reloadData(true));
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
          console.log('Add project called');
          setSelectedData(initialState);
          setShowModal(true);
          setType('ADD');
        }}>Add Project</button>
      </div>
      <div className='grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1'>
        {projects.map(project => (
          <div className='shadow border p-5 border-gray-400 flex flex-col gap-5'>
            <h1 className='text-secondary text-xl font-bold'>{project.title}</h1>
            <hr />
            <img className='h-[28rem] overflow-auto' src={project.image} alt='ProjectImage' />
            {/* <h1 className='mt-5'>Company: {project.company}</h1> */}
            <h1>Title: {project.title}</h1>
            <h1 className='h-36 overflow-auto'>{project.description}</h1>
            <div className='flex justify-end gap-5 mt-5 bottom-0 right-0'>
              <button className='bg-red-500 text-white px-5 py-2 rounded' onClick={() => {
                console.log(project);
                onDelete(project);
              }}>Delete</button>
              <button className='bg-primary text-white px-5 py-2 rounded' onClick={() => {
                console.log(project);
                setSelectedData(project);
                setShowModal(true);
                setType('EDIT');
              }}>Edit</button>
            </div>
          </div>
        ))}

      </div>
      {/* (type === 'ADD' || selectedData) &&  */<Modal open={showModal} title={type === 'EDIT' ? 'Edit Project' : 'Add Project'} footer={null} onCancel={() => {
        setShowModal(false);
        setSelectedData(initialState);
      }}>
        <Form /* form={form}  */ layout='vertical'>
          <Form.Item label='Title'>
            <input placeholder='Title' value={selectedData?.title || ''} onChange={(e) => setSelectedData({ ...selectedData, title: e.target.value })} />
          </Form.Item>
          <Form.Item label='Image URL'>
            <input placeholder='Image URL' value={selectedData?.image} onChange={(e) => setSelectedData({ ...selectedData, image: e.target.value })} />
          </Form.Item>
          <Form.Item label='Description'>
            <textarea placeholder='Description' value={selectedData?.description} onChange={(e) => setSelectedData({ ...selectedData, description: e.target.value })} />
          </Form.Item>
          <Form.Item label='Link'>
            <input placeholder='Link' value={selectedData?.link} onChange={(e) => setSelectedData({ ...selectedData, link: e.target.value })} />
          </Form.Item>
          <Form.Item label='Technologies'>
            <input placeholder='Technologies' value={selectedData?.technologies} onChange={(e) => setSelectedData({ ...selectedData, technologies: e.target.value })} />
          </Form.Item>
          <div className='flex justify-end'>
            <button className='border-primary text-primary px-5 py-2' onClick={() => {
              setShowModal(false);
              setSelectedData(initialState);
            }}>Cancel</button>
            <button className='bg-primary text-white px-5 py-2' onClick={handleSubmit}>{type === 'EDIT' ? 'Update' : 'Add'}</button>
          </div>
        </Form>
      </Modal>}
    </>
  )
}

export default AdminProject;