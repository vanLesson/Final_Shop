export const actionADD = (_id) => ({ type: "CART_ADD", _id })
export const actionDelete = (_id) => ({ type: "CART_DELETE", _id })
export const actionCartChange = (_id, count) => ({ type: "CART_CHANGE", _id, count })
export const actionMinus = (_id, count) => ({ type: "CART_MINUS", _id, count })
export const actionPlus = (_id, count) => ({ type: "CART_PLUS", _id, count })
export const actionAddList=(_id)=>({type:"CART_ADD_LIST",_id})