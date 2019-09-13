import authService from '~/services/Authentication.js'

export default async function ({ app, redirect, store }) {
    authService.setContext(app) 
    const provider = app.$auth.strategy.name
    if (app.$auth.loggedIn) {
        if (!Array.isArray(app.$auth.user.role)){
            app.$auth.user.role = [app.$auth.user.role];
        }
        if (provider != 'local') {            
            const user = await authService.setUserDataFromAuth(store, provider)

            if (localStorage.getItem('isRegister')) {
                try {
                    await authService.register(user).catch(e => {});
                } catch(e) {}
            }

            // Have another try/catch because we don't want to do 
            // anything if the user is already registered
            // we just will log him/his in
            try{
                await app.$auth.logout();
                await authService.loginWith( 'local', user )
            } catch(e){
                localStorage.setItem( "errorMessage", e )
                return;
            }
        } 
        return redirect('/')
    }

}