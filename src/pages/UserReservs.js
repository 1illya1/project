import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllReservs } from "../redux/actions/reservAction";
import Spinner from '../components/Spinner';

import { Col, Row } from "antd";
import moment from "moment";

function UserReservs() {
    const dispatch = useDispatch();
    const { reservs } = useSelector((state) => state.reservsReducer);
    const {loading} = useSelector((state) => state.alertsReducer);
    const user = JSON.parse(localStorage.getItem("user"));
    
    useEffect(() => {
      dispatch(getAllReservs());
    }, []);

return (

<DefaultLayout>
        {loading && (<Spinner />)}
      <h3 className="text-center mt-2">My Bookings</h3>
    
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
         
            {reservs.filter(o=>o.user==user._id).map((reserv) => {
             return <Row gutter={16} className="bs1 mt-3 text-left">
                <Col lg={6} sm={24}>
                    <p><b>{reserv.car.name}</b></p>
                    <p>Total hours : <b>{reserv.totalHours}</b></p>
                    <p>Rent per hour : <b>{reserv.car.rentPerHour}</b></p>
                    <p>Total amount : <b>{reserv.totalAmount}</b></p>
                </Col>

                <Col lg={12} sm={24}>
                <p>From: <b>{reserv.bookedTimeSlots.from}</b></p>
                <p>To: <b>{reserv.bookedTimeSlots.to}</b></p>
                <p>Date of reserv: <b>{moment(reserv.createdAt).format('MMM DD yyyy')}</b></p>
                </Col>

                <Col lg={6} sm={24} className='text-right'>
                    <img style={{borderRadius:5}} src={reserv.car.img}  height="140" className="p-2"/>
                </Col>
              </Row>;
            })}
          
        </Col>
      </Row>

    </DefaultLayout>
)}


export default UserReservs;