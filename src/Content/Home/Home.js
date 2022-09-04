import React from 'react';
import { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import axios from "axios";


const Home = () => {
  const urlAPI = "https://gorest.co.in/public/v2/users";
  const [dataTable, setDataTable] = useState([]);
  const [dataTable2, setDataTable2] = useState([]);
  const config = {
    headers: { Authorization: `bearer ${process.env.TOKEN}` }
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">

          <a>Search {record.name}</a>
          <a>Update </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const [form, setForm] = useState({
    email: '',
    gender: '',
    name: '',
    status: ''
  });

  const clearform = () => setForm({
    email: '',
    gender: '',
    name: '',
    status: ''
  })

  const Get = async (page) => {

    await axios.get(`${urlAPI}?page=${page}`, config)
      .then(response => {
        //setTablas(response.data);
        setDataTable(response.data);
        return response.data;
      })
      .catch(error => {

        return error;
      })

  }
  const Edit = () => {
    axios.put(`${urlAPI}/*id}`, form)
      .then(response => {
        setDataTable([])
        Get(1);
        //setLine('')
        return response.data;
      })
      .catch(error => {

        return error.response.data;
      })
  }
  const Elimina = () => {
    axios.delete(`${urlAPI}/*id`)
      .then(response => {
        setDataTable([])
        Get(1);
        //setLine('')
        return response.data;
      })
      .catch(error => {
        return error;
      });
    //handleClose();
  }
  useEffect(() => {
    setDataTable([])
    //setDataTable2([])
    Get(1);
    //Get(2);
  }, []);
  /*useEffect(() => {
   
    dataTable2.forEach(element => {
    
      setDataTable([
        ...dataTable,
        element,
      ]);
    });
    console.log(dataTable);
  }, [dataTable2]);*/

  return (
    <div>
      <Table columns={columns} dataSource={dataTable} />

    </div>
  );

}


export default Home;