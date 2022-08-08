<template>
  <div>
    <div class="container">
      <div class="ui inverted green segment">
        <div class="ui header">Estrategias Calls</div>
        <li class="nav-item dropdown">
          <a class="nav-link ui button inverted green basic dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Estrategias </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li>
              <a class="dropdown-item" @click="putsFormType = 1">PROMEDIO MOVIL DE 40 (HORA)</a>
            </li>
            <li>
              <a class="dropdown-item" @click="putsFormType = 2">CAIDA NORMAL Y CAIDA FUERTE (HORA)</a>
            </li>
            <li>
              <a class="dropdown-item" @click="putsFormType = 3">RUPTURA DE CANAL BAJISTA (HORA)</a>
            </li>
            <li>
              <a class="dropdown-item" @click="putsFormType = 4">GAP NORMAL AL ALZA (HORA)</a>
            </li>
            <li>
              <a class="dropdown-item" @click="putsFormType = 5">PISO FUERTE (DIARIO Y HORA)</a>
            </li>
            <li>
              <a class="dropdown-item" @click="putsFormType = 6">PRIMER GAP AL ALZA (DIA Y HORA)</a>
            </li>
          </ul>
        </li>
      </div>
      <div v-if="putsFormType === 1"><CallStratOne></CallStratOne></div>
      <div v-if="putsFormType === 2"><CallStratTwo></CallStratTwo></div>
      <div v-if="putsFormType === 3"><CallStratThree></CallStratThree></div>
      <div v-if="putsFormType === 4"><CallStratFour></CallStratFour></div>
      <div v-if="putsFormType === 5"><CallStratFive></CallStratFive></div>
      <div v-if="putsFormType === 6"><CallStratSix></CallStratSix></div>
    </div>
  </div>
</template>

<script>
  import CallStratOne from "./CallsForms/callStratOne.vue";
  import CallStratTwo from "./CallsForms/callStratTwo.vue";
  import CallStratThree from "./CallsForms/callStratThree.vue";
  import CallStratFour from "./CallsForms/callStratFour.vue";
  import CallStratFive from "./CallsForms/callStratFive.vue";
  import CallStratSix from "./CallsForms/callStratSix.vue";

  export default {
    name: "CallsForm",
    data() {
      return { putsFormType: 1 };
    },
    components: {
      CallStratOne,
      CallStratTwo,
      CallStratThree,
      CallStratFour,
      CallStratFive,
      CallStratSix,
    },
  };
</script>
