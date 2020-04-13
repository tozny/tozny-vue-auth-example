<template>
  <div>
    <h2>Reset Password</h2>
    <form @submit.prevent="submitReset" autocomplete="off" v-if="!error">
      <label>
        New Password
        <input v-model="pass"  type="password">
      </label>
      <br>
      <button type="submit">Reset Password</button>
    </form>
    <p v-if="error" class="error">{{error}}</p>

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
        email_otp: '',
        note_id: ''
      }
    },
    computed: {

    },
    mounted(){
        this.error = '';
        if(this.$route.query.email_otp && this.$route.query.note_id){
            this.email_otp = this.$route.query.email_otp;
            this.note_id = this.$route.query.note_id;
        }else{
            this.error = 'Unable to verify the reset link.';
        }
    },
    methods: {
      ...mapActions(['completeRecovery']),
      async submitReset () {
        this.error = ''
        const err = await this.completeRecovery({otp: this.email_otp, noteId: this.note_id, pass: this.pass})
        if (err) {
          this.err = err.message
          return
        }
        this.$router.replace('/login')
      }
    }
  }
</script>
