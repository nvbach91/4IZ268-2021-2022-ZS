<template>
  <v-row class="mt-16">
    <v-col offset="1" offset-md="3" offset-lg="4" md="6" lg="4" cols="10">
      <v-card flat outlined>
        <v-card-title>Account</v-card-title>
        <v-card-subtitle>Pick yourself a cool username</v-card-subtitle>
        <v-card-text>
          <v-text-field v-model="username" :error="!valid" outlined hint="Must be between 3 and 16 characters"
                        class="text-center" label="Username"
          ></v-text-field>
          <v-btn block :disabled="!valid" color="primary" large @click="createAccount()">Join the party</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    username: ""
  }),
  methods: {
    async createAccount() {
      if (this.valid) {
        await this.$store.dispatch("createAccount", this.username);
        await this.$router.replace("/lobbies");
      }
    }
  },
  computed: {
    valid: function () {
      const username = this.username.trim();
      return username.length >= 3 && username.length <= 16;
    }
  }
}
</script>

<style scoped>

</style>