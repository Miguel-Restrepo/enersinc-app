import React from 'react';
import { Button, Modal, Space, Table, Tag, Tooltip, Form, Input, Select, Typography, Layout, notification } from 'antd';
import { useState, useEffect } from 'react';
import axios from "axios";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
const { Option } = Select;
const { Content } = Layout;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const openNotificationWithIcon = (type, title, description) => {
  notification[type]({
    message: title,
    description: description,
  });
};
const Home = () => {
  const urlAPI = "https://gorest.co.in/public/v2/users";
  const [dataTable, setDataTable] = useState([]);
  const [row, setRow] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const config =// {${process.env.SECRET}
    { headers: { "Authorization": `Bearer 92f23b36cb50476b0ff193f61dfb5c08064c0aa0921efe3119995425ab11636d` } };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal2, setModal2] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',

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
      render: (_, { status }) => (
        <>
          {
            status === 'inactive' ? <Tag color="volcano" key={status}>
              {status.toUpperCase()}
            </Tag> : <Tag color="green" key={status}>
              {status.toUpperCase()}
            </Tag>
          }
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Search">
            <Button type="primary" shape="circle" onClick={() => {
              setRow(record);
              setView(true);
              setModal2(true);
            }} icon={<SearchOutlined />} />
          </Tooltip>

          <Tooltip title="Edit">
            <Button shape="circle" onClick={() => {
              setEdit(true);
              form.setFieldsValue({
                id: record.id,
                name: record.name,
                email: record.email,
                gender: record.gender,
                status: record.status
              });
              showModal();
            }} icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button danger shape="circle" onClick={() => {
              setRow(record);
              setView(false);
              setModal2(true);
            }} icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];


  const Get = async (page) => {

    await axios.get(`${urlAPI}?page=${page}`, config)
      .then(response => {
        setDataTable(response.data);
        return response.data;
      })
      .catch(error => {
        return error;
      })
  }
  const Edit = (id, name, gender, email, status) => {
    axios.put(`${urlAPI}/${id}`, {
      name: name,
      gender: gender,
      email: email,
      status: status
    }, config)
      .then(response => {
        Get(1);
        setIsModalOpen(false);
        openNotificationWithIcon('success', 'Succes', 'Record update successfully');
        return response.data;
      })
      .catch(error => {
        openNotificationWithIcon('error', 'Error', 'something went wrong, please try again');
        return error.response.data;
      })
  }
  const New = (name, gender, email, status) => {
    axios.post(`${urlAPI}`, {
      name: name,
      gender: gender,
      email: email,
      status: status
    }, config)
      .then(response => {
        Get(1);
        openNotificationWithIcon('success', 'Succes', 'New record created successfully');
        setIsModalOpen(false);
        return response.data;
      })
      .catch(error => {
        openNotificationWithIcon('error', 'Error', 'Existing email error');
        return error.response.data;
      })
  }
  const Delete = (id) => {
    axios.delete(`${urlAPI}/${id}`, config)
      .then(response => {
        Get(1);
        openNotificationWithIcon('success', 'Succes', 'Record deleted Successfully');
        return response.data;
      })
      .catch(error => {
        openNotificationWithIcon('error', 'Error', 'something went wrong, please try again');
        return error;
      });
  }
  useEffect(() => {
    Get(1);
  }, []);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <>
      <Modal title={edit ? 'Edit' : 'New'}
        visible={isModalOpen}
        onOk={() => {
          console.log(form);
          if (edit) {
            Edit(form.getFieldValue('id'), form.getFieldValue('name'), form.getFieldValue('gender'), form.getFieldValue('email'), form.getFieldValue('status'))
          } else {
            New(form.getFieldValue('name'), form.getFieldValue('gender'), form.getFieldValue('email'), form.getFieldValue('status'));
          }
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}>


        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>


          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="active">ACTIVE</Option>
              <Option value="inactive">INACTIVE</Option>
            </Select>
          </Form.Item>

        </Form>

      </Modal>
      <Modal title={view ? 'View' : 'Delete'}
        visible={modal2}
        onOk={() => {
          if (!view) {
            Delete(row.id);
          }
          setModal2(false);
        }}
        onCancel={() => {
          setModal2(false);
        }}>
        {view ?
          <>
            <Typography>
              <pre>Name: {row != null ? row.name : ''}</pre>
            </Typography>
            <Typography>
              <pre>Gender: {row != null ? row.gender : ''}</pre>
            </Typography>
            <Typography>
              <pre>Email: {row != null ? row.email : ''}</pre>
            </Typography>
            <Typography>
              <pre>Status: {row != null ? row.status : ''}</pre>
            </Typography>
          </> :
          <h2>Are you sure you weat to delete {row != null ? row.name + "'s" : ''} record? </h2>
        }
      </Modal>
      <div>
        <br></br>
        <Layout>

          <Layout>

            <Button onClick={() => {
              setEdit(false);
              onReset();
              showModal();
            }} icon={<PlusOutlined />}>New</Button>
            <Content><Table columns={columns} dataSource={dataTable} /></Content>
          </Layout>
        </Layout>
      </div>
    </>
  );
}
export default Home;