<template>
  <div>
    <div v-if="formsType">
      <PutsForm></PutsForm>
    </div>
    <div v-else>
      <CallsForm></CallsForm>
    </div>
  </div>
</template>

<script>
  import PutsForm from "./PutsForm.vue";
  import CallsForm from "./CallsForm.vue";

  export default {
    name: "Form",
    props: ["formsType"],
    data() {
      return {};
    },
    components: { PutsForm, CallsForm },
    methods: {},
  };
</script>

<style>
  .col-md-6 {
    padding-top: 1em;
    padding-bottom: 1em;
  }
</style>
