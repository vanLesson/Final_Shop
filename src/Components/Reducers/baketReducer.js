export function bascketReduser(state, { type, _id, count }) {
    if (!state) {
      return {}
    } if (type === "CART_ADD") {
      return { ...state, [_id]: state[_id] ? state[_id] + 1 : 1, }
    } if (type === "CART_CHANGE") {
      return { ...state, [_id]: +count }
    } if (type === "CART_DELETE") {
      let a = { ...state }
      delete a[_id]
      return a
    } if (type === "CART_MINUS") {
      
      return { ...state, [_id]: state[_id]>0? - 1:0 }
    } if (type === "CART_PLUS") {
       
      return { ...state, [_id]: state[_id] ? state[_id] + 1 : 1, }
    }
    return state
  }