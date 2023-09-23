export interface State {
    membershipId: string | null;
    isWhitelisted: boolean | null;
    didApply: boolean | null;
    nfts: any;
}

export const initialState: State = {
    membershipId: null,
    isWhitelisted: null,
    didApply: null,
    nfts: null,
};
