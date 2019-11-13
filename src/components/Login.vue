<template>
  <div>
    <h2>Login</h2>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <form @submit.prevent="submitLogin" autocomplete="off">
      <label>
        Email
        <input v-model="email" >
      </label>
      <br>
      <label>
        Password
        <input v-model="pass"  type="password">
      </label>
      <br>
      <button type="submit">login</button>
      <p v-if="error" class="error">Bad login information</p>
    </form>
    <button @click="resetPw">Forgot Password</button>
    <p>{{message}}</p>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    data () {
      return {
        email: '',
        pass: '',
        error: false,
        message: ""
      }
    },
    computed: {
      ...mapGetters([
        'loggedIn',
      ])
    },
    methods: {
      ...mapActions(['login','requestReset']),
      async submitLogin () {
        try{
          await this.login({email: this.email, pass: this.pass})
          this.error = false;
          this.$router.replace(this.$route.query.redirect || '/dashboard')
        }catch(err){
          this.error = true;
        }
      },
      async resetPw(){
        this.message = "";
        try{
          await this.requestReset({email:this.email});
          this.message = "Please check your email";
        }catch(err){
          
        }
      }
    }
  }
</script>

<style>
  .error {
    color: red;
  }
</style>
