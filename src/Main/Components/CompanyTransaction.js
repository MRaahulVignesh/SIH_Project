import React, { Component } from 'react';
import './CompanyTransaction.css'
import Ticker from 'react-ticker'
import { Table, Input, Button, Space , Modal} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

class CompanyTransaction extends Component{
    componentDidMount(){
        axios.get("http://localhost:5000/api/blocks").then(res => {
            console.log(res.data.length)
            var size = res.data.length;
            var data = [];
            for(var i=1;i<size;i++){
                console.log(res.data[i].index)
                data.push(
                {key:res.data[i].index,date:res.data[i].data.date,seller:res.data[i].data.seller,crop:res.data[i].data.cropName,loc:res.data[i].data.location,buyer:res.data[i].data.buyer,quantity:res.data[i].data.quantity,paym:res.data[i].data.paymentMethod,amt:res.data[i].data.orderAmount}
                )
                this.setState({
                items:this.state.items.concat({key:res.data[i].index,date:res.data[i].data.date,seller:res.data[i].data.seller,crop:res.data[i].data.cropName,loc:res.data[i].data.location,quantity:res.data[i].data.quantity,paym:res.data[i].data.paymentMethod,amt:res.data[i].data.orderAmount})
                })
            }
        })
        this.setState({loading:false})
    }

    state = {
        modalVisible: false,
        searchText: '',
        searchedColumn: '',
        loading: true,
        items: []
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
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
              width: '30%',
              ...this.getColumnSearchProps('date'),
            },
            {
              title: 'Seller',
              dataIndex: 'seller',
              key: 'seller',
              width: '20%',
              ...this.getColumnSearchProps('seller'),
            },
            {
              title: 'Crop',
              dataIndex: 'crop',
              key: 'crop',
              width: '20%',
              ...this.getColumnSearchProps('crop'),
            },
            {
              title: 'Location',
              dataIndex: 'loc',
              key: 'loc',
              width: '20%',
              ...this.getColumnSearchProps('loc'),
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
              key: 'quantity',
              width: '20%',
              ...this.getColumnSearchProps('quantity'),
            },
            {
              title: 'Payment Method',
              dataIndex: 'paym',
              key: 'paym',
              width: '40%',
              ...this.getColumnSearchProps('paym'),
            },
            {
              title: 'Amount',
              dataIndex: 'amt',
              key: 'amt',
              width: '20%',
              ...this.getColumnSearchProps('amt'),
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
                        {this.state.loading?<div></div>:<Table pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20']}} columns={columns} dataSource={this.state.items} />}                    </div>
                </div>
            </div>
        )
    }
}

export default CompanyTransaction;