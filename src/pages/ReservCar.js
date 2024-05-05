import React,{ useEffect,useState }   from 'react'
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import DefaultLayout from '../components/DefaultLayout'
import {useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { getAllCars } from "../redux/actions/carsAction";
import { reservCar } from '../redux/actions/reservAction';

import StripeCheckout from 'react-stripe-checkout';
import Spinner from "../components/Spinner";
import moment from "moment";


function ReservCar(){
    const params = useParams();

    const { RangePicker } = DatePicker;

    const { cars } = useSelector((state) => state.carsReducer);
    const { loading } = useSelector((state) => state.alertsReducer);
    const [car, setcar] = useState({});
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [totalHours, setTotalHours] = useState(0);
    const [driver, setdriver] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (cars.length === 0) {
          dispatch(getAllCars());
        } else {
          setcar(cars.find((o) => o._id === params.carid));
        }
      }, [cars]);

      useEffect(() => {
        setTotalAmount(totalHours * car.rentPerHour);
        if (driver) {
          setTotalAmount(totalAmount + 30 * totalHours);
        }
      }, [driver, totalHours]);

      function selectTimeSlots(values) {
     

        setFrom(moment(values[0].$d).format("MMM DD yyyy HH:mm"));
        setTo(moment(values[1].$d).format("MMM DD yyyy HH:mm"));

        setTotalHours(values[1].diff(values[0], "hours"));
    
      }

      function onToken(token){
        const reqObj = {
            token,
            user: JSON.parse(localStorage.getItem("user"))._id,
            car: car._id,
            totalHours,
            totalAmount,
            driverRequired: driver,
            bookedTimeSlots: {
              from,
              to,
            },
          };
      
          dispatch(reservCar(reqObj));
      }

    return (
        <DefaultLayout>
            {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img src={car.img} alt='car' className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500'/>
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>

              <h3>Total Amount : {totalAmount}</h3>

              <StripeCheckout
                    shippingAddress
                    token={onToken}
                    currency='eur'
                    amount={totalAmount * 100}
                    stripeKey="pk_test_51OrgaHLC2ODdkCFkkUKNcopQkzZubBcuAvAVgI5QCwkM0xjz5fz0R0lBKPBTCquuGGBpsEnwHONxtkFX396MEVBn00kKclwtag"
                  >
                <button className="btn1">
                    Book Now
                </button>
              </StripeCheckout>


              
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      
        </Row>
        </DefaultLayout>
    )
}

export default ReservCar