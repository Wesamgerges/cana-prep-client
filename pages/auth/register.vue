<template>
   <div class="vertical-center" >
        <div class="container">
        <div class="card">                
            <div class="card-header">Login / Register</div>
            <div class="card-body">
                <form >                                              
                    <div class="form-group row justify-content-md-center">                      
                        <div class="col-sm-6">
                        <input type="text" class="form-control" name="email" id="email" placeholder="Enter Email">
                        </div>
                    </div>
                    <div class="form-group row justify-content-md-center">
                        
                        <div class="col-sm-6">
                        <input type="password" class="form-control" name="password" id="password" placeholder="Password">
                        </div>
                    </div>
                    <div class="form-group row justify-content-md-center">
                        <div class="col col-md-6">
                            <button type="submit" class="btn btn-primary btn-lg col-md-12" @click.prevent="register">Login / Register</button>
                        </div>
                    </div>
                </form>
                <hr class="hr-text" data-content="OR">

                <div class="row justify-content-md-center">
                    <div class="col col-md-6">
                        <a href="/auth/google"  @click.prevent="AuthProvider('google')"
                            class="btn btn-block btn-google btn-social btn-lg">
                            <i class="fa fa-google-plus"></i>Login with Google  
                        </a>                            
                        <a href="/auth/facebook" @click.prevent="AuthProvider('facebook')"
                            class="btn btn-block btn-facebook btn-social btn-lg">
                            <i class="fa fa-facebook"></i>Login with Facebook
                        </a>
                    </div>
                </div>
            </div>
        </div>     
        <div class="row justify-content-md-end">        
        </div>                     
    </div>
</div>
</template>

<script>
export default {
    auth: false,
     data(){
        return {
            user: {
                first_name: 'test',
                last_name: 'testing',
                email: 'test@test.com',
                password: '123',
            }
        }
    },  
    methods: {
        async register() {
            try {
                await this.$axios.post('register', this.user)
                await this.$auth.loginWith('local', { data: this.user })

                this.$router.push('/')
            } catch (e) {
                this.error = e.response.data.message
            }
        }
    }
}
</script>

