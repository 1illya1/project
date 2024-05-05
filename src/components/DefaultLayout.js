import React from 'react';
import { Button, Dropdown, Space, Row , Col } from 'antd';
import {Link} from 'react-router-dom'

const user = JSON.parse(localStorage.getItem('user'))

const items = [
  {
    key: '1',
    label: (
        <a
         
        href="/"
      >
        Home
      </a>
    ),
  },
  {
    key: '2',
    label: (
        <a
          
        href="/userreservs"
      >
        Bookings
      </a>
    ),
  },
  {
    key: '3',
    label: (
        <a
         
        href="/admin"
      >
        Admin
      </a>
    ),
  },
  {
    key: '4',
    label: (
        <a
         
        href="/login" onClick={()=>{
            localStorage.removeItem('user');
            window.location.href='/login'
        }}
      >
        Logout
      </a>
    ),
  }
];
const DefaultLayout = (props) => (
    <div>

        <div className="header bs1">
            <Row gutter={16} justify='center'>
              <Col lg={20} sm={24} xs={24}>
              <div className="d-flex justify-content-between">
             <h1 ><b><Link to='/' style={{color:'orangered'}}>SheyCars</Link></b></h1>
             <Space direction="vertical">
                <Space wrap>
                    <Dropdown
                        menu={{
                        items,
                        }}
                        placement="bottom"
      >
                        <Button>{user.username}</Button>
                     </Dropdown>
            </Space>
                </Space>
             </div>
             </Col>
          </Row>
        </div>
        <div className="content">{props.children}</div>

      <div className="footer text-center"></div>
    </div>
);
export default DefaultLayout;