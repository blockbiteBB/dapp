"use client";

import React, { createContext, useContext, useReducer } from "react";
import { Action, reducer } from "./reducer";
import { initialState, State } from "./store";

const UserContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const UserContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const value = useReducer(reducer, initialState);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = (): [State, React.Dispatch<Action>] => useContext(UserContext);

export default UserContextProvider;
export { useUser };
