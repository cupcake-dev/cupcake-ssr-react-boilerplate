import { ISagaModule } from 'redux-dynamic-modules-saga';
import { AuthTokenAwareState } from './auth-token.contracts'
import { authTokenReducer } from './auth-token.reducer'

export function getAuthTokenModule(): ISagaModule<AuthTokenAwareState> {
    return {
        id: 'auth-token',
        reducerMap: {
            authToken: authTokenReducer,
        },
        // Actions to fire when this module is added/removed
    }
}