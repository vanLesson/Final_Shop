import React, { useMemo } from "react"
import { connect } from "react-redux"
import {actionGood} from "../Reducers/Actions/actionGoods"
import {actionPlus,actionMinus,actionCartChange,actionDelete, actionADD} from "../Reducers/Actions/basketActions"
import {Pending} from "../Pending/pending"
import {store} from "../Store/store"
import{GQL} from "../GQL/gql"
import {actionFetch} from "../Reducers/Actions/actionGoods"

const BasketInfo = ({ good}) => {
    
    return (good && good.images != null ?
        <>
            <div>
                <div className="GoodOne">
                    <p>{good.name}</p>
                    <img src={`http://shop-roles.asmer.fs.a-level.com.ua/${good.images[0].url}`} alt="phot" ></img>
                    <p> {good.description}</p>
                    {/* <p> {good.price} грн</p>
                    <button onClick={() => onDelete(good._id, good.description, good.price)} disabled={!cart[good._id]} >Удалить</button>
                    <button onClick={(count) => onPlus(good._id, count)}>Добавить</button>
                    <button onClick={(count) => onMinu(good._id, count)}>Убрать</button>
                    <input type="number" onChange={(event) => onChange(good._id, event.target.value)} /> */}
                </div>
            </div>
        </>
        : <Pending />)
}
export const CBasketOne = connect((state) => ({ cart: state.bascket, good: state.promise.good
     && state.promise.good.payload
      && state.promise.good.payload.data.GoodFindOne }), {onDelete: actionDelete, onChange: actionCartChange, onPlus: actionPlus, onMinu: actionMinus })(BasketInfo)

const Cart = ({ cart,getData,setOrder }) => {

delete cart.undefined

Object.entries(cart).map((pos)=>setOrder(pos[0]))

  return (
    <div>
      {Object.entries(cart).map((pos) => (
        <div pos={pos} style={{display:"none"}}>
          {pos[0]} : {pos[1]}
        </div>
      ))}
    </div>
  )
 
}

const CCart = connect((state) => ({
  cart: state.bascket,
}),{getData:actionGood,setOrder:actionNewOrder})(Cart)

const CartPage = ({
  match: {
    params: { _id },
  },
  getData,
}) => {
    
  useMemo(() => getData(_id) && false, [_id])
  return <CCart />
}

const ConnectedCart = connect(null, { getData: actionADD })(CartPage)

function actionNewOrder(_id) {
  let order = [{ good: { _id }, count: 1 }]
  return async (dispatch) => {
      
    let position = await dispatch(
      actionFetch(
        "position",
        GQL(
          `mutation ord2($orderGoods: [OrderGoodInput]) {
            OrderUpsert(order: {
             orderGoods: $orderGoods
            }) {
              _id
              createdAt
              total
              orderGoods {
                price
                total
                good {
                  name
                }

              }
            }
          }`,
          { orderGoods: order }
        )
      )
    )
  }
}
store.dispatch(actionNewOrder())
const OrderReady=({order})=>{ 
 return(order? <>
 <div className="OrderInfo">
 <h5>Вы купили</h5>
 <div>{order.good.name}</div>
 <h5>Стоимостью</h5>
 <div>{order.total} грн</div>
 </div>
</>:<Pending/>)}

export const COrderReady=connect((state)=>({order:state.promise && state.promise.position.payload &&state.promise.position.payload.data.OrderUpsert&&state.promise.position.payload.data.OrderUpsert.orderGoods[0]}))(OrderReady)
export { CCart, ConnectedCart }

export const CBasketPage = connect((state) => ({ _id: state.bascket }), { getData: actionGood, })(CBasketOne)

