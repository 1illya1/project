const initialData = {
    reservs : [],

};

export const reservsReducer = (state=initialData , action)=>{

     switch(action.type)
     {
         case 'GET_ALL_RESERVS' : {
             return{
                 ...state,
                 reservs : action.payload
             }
         }
         
         default:return state
     }

}