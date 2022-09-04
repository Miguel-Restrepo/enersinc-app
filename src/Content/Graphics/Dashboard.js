import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';


function Dashboard() {
    
    const data = [
        {
          type: 'juan',
          value: 27,
        },
        {
          type: 'camilo',
          value: 25,
        },
        {
          type: 'daniel',
          value: 18,
        },
        {
          type: 'pedro',
          value: 15,
        },
        {
          type: 'camila',
          value: 10,
        },
        {
          type: 'jhon',
          value: 5,
        },
      ];
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

        return (
            <Pie {...config} />
        );
    
}


export default Dashboard;