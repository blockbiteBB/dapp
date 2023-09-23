"use client";

import React, { createContext, useContext, useReducer } from "react";
import { Action, reducer } from "./reducer";
import { initialState, State } from "./store";

const ContractContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const ContractContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const value = useReducer(reducer, initialState);

    return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
};

const useContractContext = (): [State, React.Dispatch<Action>] => useContext(ContractContext);

export default ContractContextProvider;
export { useContractContext };
