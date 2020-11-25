import React,{useState, useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios';

// Generate Sales Data
function createData(date, amount) {
  return { date, amount };
}

export default function Chart() {

  const [values, setValues] = useState({  
    loading: true
  });
  const [rows, setRows] = useState([]);
  const {loading} = values;
  useEffect(() => {
    axios.get("http://localhost:5000/api/blocks").then(res => {
    console.log(res.data.length)
    var size = res.data.length;
    for(var i=1;i<size;i++){
          console.log(res.data[i].data)
          setRows(rows => [...rows,{date:res.data[i].data.date,amount:res.data[i].data.orderAmount}])
        if(i===(size-1))
          setRows(rows => [...rows,{date:res.data[i].data.date,amount:undefined}])
      }
      setValues({ ...values,loading:false });
    })
  },[]);

  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        {loading?<LineChart></LineChart>:
            <LineChart
              data={rows}
              margin={{
                top: 16,
                right: 16,
                bottom: 16,
                left: 24,
              }}
            >
              <XAxis dataKey="date" stroke={theme.palette.text.secondary}>
                <Label
                    position="bottom"
                    style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                  >
                  Date
                </Label>
              </XAxis>
              <YAxis stroke={theme.palette.text.secondary}>
                <Label
                  angle={270}
                  position="left"
                  style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                >
                  Sales (₹)
                </Label>
              </YAxis>
              <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
            </LineChart>
          }
      </ResponsiveContainer>
    </React.Fragment>
  );
}