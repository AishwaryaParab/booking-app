import { useReducer, useEffect, createContext } from "react"

const userFromLocalStorage = localStorage.getItem("user");
let parsedUser = null;

try {
  if(userFromLocalStorage !== undefined && userFromLocalStorage !== null) {
    parsedUser = JSON.parse(userFromLocalStorage);
  }
} catch(err) {
    console.error("Error parsing user from localStorage:", err);
}

const INITIAL_STATE = {
    user: parsedUser,
    loading: false,
    error: null
}

const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: false
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state?.user));
    }, [state?.user]);

    return <AuthContext.Provider value={{user: state.user, loading: state.loading, error: state.error, dispatch}}>
        {children}
    </AuthContext.Provider>
}

