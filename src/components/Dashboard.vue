<template>
  <div>
    <h2>Dashboard</h2>
    <p>You're logged in {{name}}!</p>

    <h3 v-if="notes.length > 0">Your Notes</h3>
    <ul>
    <li v-for="item in notes" :key="item.meta.recordId">
      {{item.data.note}}
    </li>
    </ul>
    <h3>Write New Secret Note</h3>
    <div class="note-area">
      <textarea v-model="note" />
      <button @click="writeNote">Write Note</button>
    </div>
    <div>
      <button @click="showToken">Show JWT</button>
      <div>{{token}}</div>
    </div>
  </div>
</template>
<script>
  import auth from '../auth'
  import { mapState } from "vuex";
  export default {
    data () {
      return {
        notes: [],
        loading: false,
        token: "",
        note: ""
      }
    },
    computed: {
        ...mapState(["toznyClient", "name"])
    },
    mounted(){

      this.getNotes();

    },
    methods: {
      async getNotes(){
         let records = await this.toznyClient.storage.query(true, null, null, 'note').next();
         this.notes = records;
      },
      async writeNote(){
        await this.toznyClient.storage.writeRecord('note', {'note': this.note});
        this.getNotes();
      },
      async showToken(){
        const token = await auth.getToken();
        this.token = token;
      }
    }
  }
</script>
<style scoped>
  .note-area{
    width: 400px;
    display: flex;
    flex-direction: column;
  }

</style>
