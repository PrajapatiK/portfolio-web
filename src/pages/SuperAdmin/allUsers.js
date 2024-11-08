import React, { useEffect, useState } from 'react';
import { Divider, Table } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/rootSlice';
import { Link, useParams } from 'react-router-dom';
import { apiGet, apiPost } from '../../services/api';
import moment from 'moment';
import { dateTimeFormat } from '../../lib/common/constants';
import { RiDeleteBin6Line } from '@remixicon/react';

const SuperAdmin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const params = useParams();

  const getAdminData = async () => {
    try {
      dispatch(setLoading(true));
      const users = await apiGet(`/getAllUsers`);
      setUsers(users.data.data);
      // dispatch(setUsersData(users.data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      setError(err?.data?.message);
    }
  }
  useEffect(() => {
    getAdminData();
  }, []);

  const handleRemoveUser = async (e, username) => {
    try {
      dispatch(setLoading(true));
      const users = await apiPost(`/removeUser/${username}`);
      // dispatch(setUsersData(users.data));
      getAdminData();
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      setError(err?.data?.message);
    }
  }

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      render: (username) => username && <Link to={`/userDetail/${username}`}>{username}</Link>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Create Date',
      dataIndex: 'createdAt',
      render: (date) => date && moment(date).format(dateTimeFormat),
    },

    {
      title: 'Update Date',
      dataIndex: 'updatedAt',
      render: (date) => date && moment(date).format(dateTimeFormat),
    },

    {
      title: 'Remove',
      dataIndex: 'username',
      render: (username) => <Link onClick={(e) => handleRemoveUser(e, username)}><RiDeleteBin6Line color='red' /></Link>,
    },
  ];

  return (
    <div className='m-10'>

      <Divider>All Users</Divider>
      <Table bordered columns={columns} dataSource={users} size="middle" pagination={false} />

    </div>
  )
}

export default SuperAdmin