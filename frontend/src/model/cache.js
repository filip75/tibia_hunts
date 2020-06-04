export const createCacheActionCreator = (type) => {
    return (key, data) => {
        return {
            type: type,
            key,
            data
        };
    };
};

export const createCacheReducer = (actionName) => {
    return (initialState = {}, action) => {
        if (action.type === actionName) {
            return {
                ...initialState,
                ...{
                    [action.key]: {
                        data: action.data,
                        timestamp: Date.now()
                    }
                }
            };
        }
        return initialState;
    };
};

export const shouldFetch = (data, key, lifeTime = 60 * 1000) => {
    if (!data.hasOwnProperty(key))
        return true;
    return Date.now() - data[key].timestamp > lifeTime;
};

// export const createFetchAction = (actionName, fetch, key, lifeTime) => {
//     return (dispatch, getState) => {
//         if (shouldFetch()) {
//             fetch(
//                 dispatch,
//                 getState,
//                 (data) => dispatch({
//                     type: actionName,
//                     key: key,
//                     data: data
//                 })
//             );
//         }
//     };
// };