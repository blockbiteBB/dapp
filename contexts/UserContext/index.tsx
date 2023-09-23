"use client";

import React, { createContext, useContext, useReducer } from "react";
import { UserAction, reducer } from "./reducer";
import { State, initialState } from "./store";

const UserContext = createContext<[State, React.Dispatch<UserAction>]>([initialState, () => null]);

const UserContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const value = useReducer(reducer, initialState);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = (): [State, React.Dispatch<UserAction>] => useContext(UserContext);

export default UserContextProvider;
export { useUserContext };
