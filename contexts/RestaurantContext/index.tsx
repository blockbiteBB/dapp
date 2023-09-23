"use client";

import React, { createContext, useContext, useReducer } from "react";
import { Action, reducer } from "./reducer";
import { initialState, State } from "./store";

const RestaurantContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const RestaurantContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const value = useReducer(reducer, initialState);

    return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
};

const useResaurant = (): [State, React.Dispatch<Action>] => useContext(RestaurantContext);

export default RestaurantContextProvider;
export { useResaurant };
