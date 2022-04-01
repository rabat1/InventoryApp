export default function userReducer(state = { order: [] }, action) {

  switch (action.type) {
    case 'UPDATE_ORDER_LIST': {
      if (!state.order) {
        return { ...state, order: [action.data] }
      }
      else if(!action.data){
        return {state:{}}
      }
      else {
        return {
          ...state,
          order: state.order.concat(action.data)
        }
        //  return { ...state,order:[...state.order,action.data] }
      }
    }
    default: {
      return state
    }
  }
}

