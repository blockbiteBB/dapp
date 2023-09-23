export interface State {
    mobileModalOpen?: boolean;
    content?: React.ReactNode;
}

export const initialState: State = {
    mobileModalOpen: false,
    content: null,
};
