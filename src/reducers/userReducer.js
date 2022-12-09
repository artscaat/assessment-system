import storage from "redux-persist/lib/storage";

export function userReducer(state = null, action) {
    switch (action.type) {
        case 'LOGGED_IN_USER':
            return action.payload ;
        case 'LOGOUT':
            localStorage.clear('authtoken');
            localStorage.clear('AccessRightsType');
            storage.removeItem('persist:class');
            return state;
        case 'UPDATE_USER':
            return action.payload ;
        default:
            return state;
    }
}