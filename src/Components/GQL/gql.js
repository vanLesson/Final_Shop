const getGQL = (url, headers = {}) => (query = "", variables = {}) =>
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json())
  const originalFetch = fetch;
  fetch = (url, params={headers:{}}) => { 
      params.headers.Authorization = "Bearer " + localStorage.authToken
      return originalFetch(url, params)
  }
export let GQL = getGQL("http://shop-roles.asmer.fs.a-level.com.ua/graphql")