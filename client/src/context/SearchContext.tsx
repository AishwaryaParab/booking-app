import { ReactNode, createContext, useReducer } from "react";

// interface SearchState {
//     city?: string;
//     dates: Date[];
//     options: {
//         adults?: number,
//         children?: number,
//         rooms?: number
//     }
// }

// type SearchAction = {type: "NEW_SEARCH", payload: SearchState} | {type: "RESET_SEARCH"};

// interface SearchContextProviderProps {
//     children: ReactNode;
// }

const INITIAL_STATE = {
    city: "",
    dates: [{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }],
    options: {
        adults: 1,
        children: 0,
        rooms: 1 
    }
}

const SearchReducer = (state, action) => {
    switch(action.type) {
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state
    }
}

export const SearchContext = createContext(INITIAL_STATE);

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return (
        <SearchContext.Provider value={{state, dispatch}}>
            {children}
        </SearchContext.Provider>
    )
}