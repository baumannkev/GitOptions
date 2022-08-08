<template>
  <div>
    <div class="ui header">Welcome to your profile, {{ user }}</div>
    <h2 class="ui teal image header">
      <div class="content">Change your password</div>
    </h2>
    <form id="reg-form" @submit.prevent="submit" class="ui form">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" id="change-password" required name="password" placeholder="Password" autocomplete="off" />
          </div>
        </div>
        <div class="ui fluid medium teal submit button" @click="changePassword">Change Password</div>
      </div>
      <div class="ui error message"></div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    data() {
      return {
        id: "",
        user: "",
      };
    },
    components: {},

    created() {
      this.user = localStorage.getItem("name");
    },
  };
</script>
