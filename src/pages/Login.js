import React  from 'react'
import {Row , Col , Form , Input} from 'antd'
import Spinner from '../components/Spinner';
import {useDispatch , useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogin } from '../redux/actions/userAction'

function Login(){

    const {loading} = useSelector(state=>state.alertsReducer)
    const dispatch = useDispatch()
    function onFinish(values) {
        dispatch(userLogin(values))
        console.log(values)

 }
    return (
        <div className='login'>
            {loading && (<Spinner />)}
            <Row gutter={16} className='d-flex align-items-center' >

                
            <Col lg={16} style={{position: 'relative'}}>
                    <img 
                    className='w-100'
                    data-aos='slide-right'
                    data-aos-duration='1500'
                    src="https://i.pinimg.com/564x/06/c6/43/06c643aee18a67ea1272dafc37d493e9.jpg"/>
                     <h1 className='login-logo'>CARS</h1>
                </Col>

                <Col lg={8} className='text-left p-5'>
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                         <h1>Login</h1>
                         <hr />
                         <Form.Item name='username' label='Username' rules={[{required: true}]}>
                             <Input/>
                         </Form.Item>
                         <Form.Item name='password' label='Password' rules={[{required: true}]}>
                             <Input type='password'/>
                         </Form.Item>

                         <button className='btn1 mt-2'>Login</button>

                         <hr />

                         <Link to='/register'>Click Here to Register</Link>
                       

                    </Form>
                </Col>

            </Row>

        </div>
    )
}

export default Login