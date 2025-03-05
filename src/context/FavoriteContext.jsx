import {createContext, useReducer, useContext, act } from "react";

const initialState = {
    favorites: [],
}

const favoriteReducer = (state, action) => {
    switch(action.type){
        case "ADD_FAVORITE":
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        case "REMOVE_FAVORITE":
            return {
                ...state,
                favorites: state.favorites.filter((movie) => movie.id !== action.payload)
            };
        default:
            return state;
    }
}

const FavoriteContext = createContext();

export const FavoriteProvider = ({children}) => {
    const [state, dispatch] = useReducer(favoriteReducer, initialState);

    return (
        <FavoriteContext.Provider value={{state, dispatch}}>
            {children}
        </FavoriteContext.Provider>
    );
}

export const useFavorite = () => {
    return useContext(FavoriteContext);
};