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
      <p v-if="error" class="error">{{ error }}</p>
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
        error: '',
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
        this.error = '';
        if(!this.email || !this.pass){
          this.error = 'Bad registration information or password.';
          return;
        }
        const err = await this.register({email: this.email, pass: this.pass})
        if (err) {
          this.error = result.message;
          return;
        }
        this.$router.replace(this.$route.query.redirect || '/dashboard')
      }
    }
  }
</script>
