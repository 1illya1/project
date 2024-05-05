import axios from "axios";
import { message } from "antd";
export const reservCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
     await axios.post("/api/reservs/reservcar" , reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Your car reserv successfully");
    setTimeout(() => {
      window.location.href='/userreservs'
    }, 500);

    
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong , please try later");
  }
};

export const getAllReservs=()=>async dispatch=>{

  dispatch({type: 'LOADING' , payload:true})

  try {
      const response = await axios.get('/api/reservs/getallreservs')
      dispatch({type: 'GET_ALL_RESERVS', payload:response.data})
      dispatch({type: 'LOADING' , payload:false})
  } catch (error) {
      console.log(error)
      dispatch({type: 'LOADING' , payload:false})
  }

}