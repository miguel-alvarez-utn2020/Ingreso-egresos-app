import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { setUser, unSetUser } from './auth.action';

export interface State {
    user: User; 
}

export const initialState: State = {
   user: null,
}

const _authReducer = createReducer(initialState,

    on(setUser, (state, { user }) => ({ ...state, user: {...user} })),
    on(unSetUser, (state) => ({ ...state, user: null})),
   
);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}