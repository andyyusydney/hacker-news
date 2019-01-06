export interface AppState {
    app: {
        term: String;
        result: Array<any>;
        currPage: number;
        searchInProgress: boolean;
    }
}

export const initialState: AppState = {
    app: {
        term: '',
        result: [],
        currPage: 0,
        searchInProgress: false
    }
}