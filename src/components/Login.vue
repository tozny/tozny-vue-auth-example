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
    </form>
    <button @click="resetPw">Forgot Password</button>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="message" class="success">{{ message }}</p>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    data () {
      return {
        email: '',
        pass: '',
        error: '',
        message: ''
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
        this.error = ''
        this.message = ''
        const err = await this.login({email: this.email, pass: this.pass})
        if (err) {
          this.error = err.message;
          return;
        }
        this.$router.replace(this.$route.query.redirect || '/dashboard')
      },
      async resetPw(){
        this.error = '';
        this.message = '';
        const err = await this.requestReset({email:this.email});
        if (err) {
          this.error = err.message
          return
        }
        this.message = "Please check your email";
      }
    }
  }
</script>
