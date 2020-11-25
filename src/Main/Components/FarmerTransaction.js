import React, { Component } from 'react';
import './FarmerTransaction.css'
import Ticker from 'react-ticker'
import { Table, Input, Button, Space , Modal} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Joe Black',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Jim Green',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
    {
        key: '5',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '6',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '7',
        name: 'Jim Green',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '8',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
      },{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
      {
          key: '5',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '6',
          name: 'Joe Black',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '7',
          name: 'Jim Green',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
        {
          key: '8',
          name: 'Jim Red',
          age: 32,
          address: 'London No. 2 Lake Park',
        },
];

class FarmerTransaction extends Component{

    state = {
        modalVisible: false,
        searchText: '',
        searchedColumn: '',
    }
    
    
    getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
        <Input
            ref={node => {
            this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
            <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            >
            Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
            </Button>
        </Space>
        </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
        record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: visible => {
        if (visible) {
        setTimeout(() => this.searchInput.select());
        }
    },
    render: text =>
        this.state.searchedColumn === dataIndex ? (
        <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
        />
        ) : (
        text
        ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    showDialog = (e) => {
        this.setState({modalVisible:true})
    }
    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }
    render(){
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              width: '30%',
              ...this.getColumnSearchProps('name'),
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
              width: '20%',
              ...this.getColumnSearchProps('age'),
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
              ...this.getColumnSearchProps('address'),
            },
        ];
        return(
            <div id="main">
                <Ticker direction="toRight" height="30">
                    {({ index }) => (
                        <div style={{fontFamily:"'Times New Roman', Times, serif"}}>
                            <h2>This is the Headline of element #{index}!</h2>
                            <img src="www.my-image-source.com/" alt=""/>
                        </div>
                    )}
                </Ticker>
                <div id="transaction">
                    <div id="transactions">
                        <Table     pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20']}} columns={columns} dataSource={data} />
                    </div>
                </div>
                <div id="menu" style={{display:"inline-block",backgroundColor:"lightgreen",width:"8.75vw",height:"100vh"
                                        ,verticalAlign:"top"}}>
                            <Modal
                                title="Vertically centered modal dialog"
                                centered
                                visible={this.state.modalVisible}
                                onOk={() => this.setModalVisible(false)}
                                onCancel={() => this.setModalVisible(false)}
                                >
                                <p>some contents...</p>
                                <p>some contents...</p>
                                <p>some contents...</p>
                            </Modal>
                        <Button className="antButton" type="text"  style={{display:"block",margin:"auto",marginTop:"5vh",fontSize:"3vh",fontFamily:"'Courier New', Courier, monospace"}}
                                onClick={(e)=>{this.showDialog(e)}}>Aim</Button>
                        <Button className="antButton"type="text"  style={{display:"block",margin:"auto",marginTop:"5vh",fontSize:"3vh",fontFamily:"'Courier New', Courier, monospace"}}
                                onClick={(e)=>{this.showDialog(e)}}>How?</Button>
                        <Button className="antButton" type="text"  style={{display:"block",margin:"auto",marginTop:"5vh",fontSize:"3vh",fontFamily:"'Courier New', Courier, monospace",overflow:"hidden"}}
                                onClick={(e)=>{this.showDialog(e)}}>Schemes</Button>
                </div>
            </div>
        )
    }
}

export default FarmerTransaction;