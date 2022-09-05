import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';
import axios from "axios";
function Dashboard() {
  const urlAPI = "https://gorest.co.in/public/v2/users";
  const configT =
    { headers: { "Authorization": `Bearer 92f23b36cb50476b0ff193f61dfb5c08064c0aa0921efe3119995425ab11636d` } };
  const [dataTable, setDataTable] = useState([]);
  const [datos, setData1] = useState([]);
  const [data, setData] = useState([]);
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  const Get = async (page) => {

    await axios.get(`${urlAPI}?page=${page}`, configT)
      .then(response => {
        setDataTable(response.data);
        return response.data;
      })
      .catch(error => {
        return error;
      })
  }
  useEffect(() => {
    Get(1);
    Get(2);
    Get(3);
    Get(4);
    Get(5);
    Get(6);
    Get(7);
    Get(8);
    Get(9);
    Get(10);
  }, []);
  useEffect(() => {

    dataTable.forEach(element => {
      element.name.split(' ').forEach(name => {
        let nuevo = true;
        datos.forEach(elementD => {
          if (elementD.name === name) {
            elementD.value = elementD.value + 1;
            nuevo = false;
          }
        });
        if (nuevo) {
          setData1([
            ...datos,
            {
              name: name,
              value: 1
            },
          ]);
        }
      })

    });
    if (datos.length > 10) {
      datos.sort(function (a, b) { return b.value - a.value });

      for (let i = 0; i < 10; i++) {
        data[i] = {
          type: datos[i].name,
          value: datos[i].value
        }
      }

    }
  }, [dataTable]);

  return (
    <Pie {...config} />
  );
}
export default Dashboard;