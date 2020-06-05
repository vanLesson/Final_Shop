import { GQL } from "../../GQL/gql"
import { store } from "../../Store/store"

export const actionFetch = (key, promise) => {
  const actionPending = () => {
    return { status: "PENDING", payload: null, error: null, type: "PROMISE", key }
  }
  const actionResolved = (payload) => {
    return { status: "RESOLVED", payload, error: null, type: "PROMISE", key }
  }
  const actionRejected = (error) => {
    return { status: "REJECTED", payload: null, error: error, type: "PROMISE", key }
  }
  return async dispatch => { //возвращаем функцию. 
    dispatch(actionPending())
    try {
      let resolved = await promise
      dispatch(actionResolved(resolved))
      return resolved
    }
    catch (error) {
      dispatch(actionRejected(error))
    }
  }
}
export function actionCategories() {
  return (async dispatch => {
    await dispatch(actionFetch("categories", GQL(`query cats{
        CategoryFind(query: "[{}]"){
          _id name parent{
            name
          }
          subCategories {
            name
          }
          goods {
            name
            images {
              _id, url
            }
          }
            }
      }`)))
  })
}
export function actionCategory(_id) {
  const query = [{ _id }]
  return actionFetch("category", GQL(
    `query gf($query: String){
                 CategoryFindOne(query: $query){
                  _id
                  name
                  goods {
                    _id
                    name
                    description
                    price
                    images{
                      url
                    }
                  }    
                }
              }`,
    { query: JSON.stringify(query) }
  ))
}
store.dispatch(actionCategories())
store.dispatch(actionGood())
store.subscribe(() => console.log(store.getState()))
export function actionGood(_id) {
  const goodId = [{ _id }]
  return (actionFetch(
    "good", GQL(`query good($goodId:String){
        GoodFindOne(query:$goodId){
          _id
          name
          description
          price
          images{
            url
          }
        }
      }`, { goodId: JSON.stringify(goodId) }
    )
  )
  )
}
