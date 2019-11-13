<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="submitRegister" autocomplete="off">
      <label>
        Email
      <input v-model="email">
      </label>
      <br>
      <label>
        Password
        <input v-model="pass" type="password">
      </label><br>
      <button type="submit">Register</button>
      <p v-if="error" class="error">Bad registration information or password.</p>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    data () {
      return {
        email: '',
        pass: '',
        error: false
      }
    },
    computed: {
      ...mapGetters([
        'loggedIn',
      ])
    },
    methods: {
      ...mapActions(['register']),
      async submitRegister () {
        this.error = false;
        if(!this.email || !this.pass){
          this.error = true;
          return;
        }
        try{
          await this.register({email: this.email, pass: this.pass})
          this.error = false;
          this.$router.replace(this.$route.query.redirect || '/dashboard')
        }catch(err){
          this.error = true;
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
