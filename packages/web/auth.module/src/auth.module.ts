import { IAuthState } from './auth.contracts';
import { signInReducer } from './signin/signin.reducer';
import { signUpReducer } from './signup/signup.reducer';
import { ISagaModule } from 'redux-dynamic-modules-saga';


export function getAuthModule(): ISagaModule<IAuthState> {
    return {
        id: 'auth',
        reducerMap: {
            signIn: signInReducer,
            signUp: signUpReducer
        },
        // Actions to fire when this module is added/removed
        
    }
}