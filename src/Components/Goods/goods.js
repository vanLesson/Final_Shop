import React, { useMemo } from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'

import {actionGood,actionCategory,actionFetch} from "../Reducers/Actions/actionGoods"
import {actionDelete,actionADD,actionCartChange,actionPlus,actionMinus} from "../Reducers/Actions/basketActions"

export const mapStateToProps = (state) => ({
    login: state.auth.data && state.auth.data.sub.login,
})
export const Pending = () => <img src="https://flevix.com/wp-content/uploads/2019/07/Spin-Preloader.gif" alt="phot"></img>

const Good = ({ good }) => {
    return (<div>
        <Link to={`/good/${good._id}`}>
            <div>
                <p>{good.name}</p>
                <img src={`http://shop-roles.asmer.fs.a-level.com.ua/${good.images[0].url}`}alt="phot"></img>
                <p> {good.description}</p>
                <p> {good.price} грн</p>
            </div>
        </Link>
    </div>)
}

const GoodsList = ({ goods }) => goods ? (
    <>
        {goods.map(good => <Good good={good} />)}

    </>
) : <Pending />

const GoodInfo = ({ good, onAdd, onDelete, onChange, onPlus, onMinu, cart }) => {
  
    return (good && good.images!==null?
    <>
        <div>
            <div className="GoodOne"> 
                <p>{good.name}</p>
                <img src={`http://shop-roles.asmer.fs.a-level.com.ua/${good.images[0].url}`} alt="phot" ></img>
                <p> {good.description}</p>
                <p> {good.price} грн</p>
                <button onClick={() => onAdd(good._id, good.description, good.price)}><Link to="/Cart"> Купить </Link> </button>
                {/* <input  type="number" onChange={(event) => onChange(good._id, event.target.value)} /> */}
            </div>
        </div>
    </>
    : <Pending />)}

const CGoodOne = connect((state) => ({ cart: state.bascket, good: state.promise.good && state.promise.good.payload && state.promise.good.payload.data.GoodFindOne }), { onAdd: actionADD, onDelete: actionDelete, onChange: actionCartChange, onPlus: actionPlus, onMinu: actionMinus })(GoodInfo)

const GoodPage = ({
    match: {
        params: { _id },
    },
    getData,
}) => { 
    useMemo(() => getData(_id) && false, [_id])
    return <CGoodOne />
}
export const CGoodPage = connect( null,{ getData: actionGood })(GoodPage)

const CGoodsList = connect((state) => ({
    goods: state.promise.category &&
        state.promise.category.payload &&
        state.promise.category.payload.data.CategoryFindOne.goods
}))(GoodsList)

const CategoryItem = ({ category }) => <div>
    <Link to={`/category/${category._id}`}>
        {category.name}
    </Link>
</div>

const CategoriesList = ({ categories }) => categories ? (
    <>
        {categories.map(category => <CategoryItem category={category} />)}

    </>
) : <Pending />

export const CCategoriesList = connect((state) => ({
    categories: state.promise.categories &&
        state.promise.categories.payload &&
        state.promise.categories.payload.data.CategoryFind
}))(CategoriesList)

const CategoryPage = ({ match: { params: { _id } }, getData }) => {
    useMemo(() => getData(_id) && false, [_id])
    return (<>
        <CGoodsList />
    </>)
}

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

export const CPromiseStatus = connect(
    (state) => ({ children: state.promise.status }),
    {
        onClick: () => actionFetch(delay(2000)),
    }
)("div")
export const CCategoryPage = connect(null, { getData: actionCategory })(CategoryPage)
