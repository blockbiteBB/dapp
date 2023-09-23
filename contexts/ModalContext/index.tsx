"use client";

import React, { createContext, useContext, useReducer } from "react";
import { Action, reducer } from "./reducer";
import { initialState, State } from "./store";

const ModalContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const ModalContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const value = useReducer(reducer, initialState);

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

const useModal = (): [State, React.Dispatch<Action>] => useContext(ModalContext);

export default ModalContextProvider;
export { useModal };
