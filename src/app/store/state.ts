export interface AppState {
    app: {
        result: Array<any>;
        currPage: number;
        searchInProgress: boolean;
    }
}

export const initialState = {
    app: {
        result: [],
        currPage: 0,
        searchInProgress: false
    }
}