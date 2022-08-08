<template>
  <div>
    <div class="container">
      <div class="ui inverted red segment">
        <div class="ui header">Estrategias Puts</div>
        <li class="nav-item dropdown">
          <a class="nav-link ui button inverted red basic dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Estrategias </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li>
              <a class="dropdown-item" @click="putsFormType = 1">PRIMERA VELA ROJA (HORA)</a>
            </li>
            <li>
              <a class="dropdown-item" @click="putsFormType = 2">RUPTURA DEL PISO DEL GAP (HORA)</a>
            </li>
            <li>
              <a class="dropdown-item" @click="putsFormType = 3">MODELO DE LOS 4 PASOS (HORA)</a>
            </li>
            <li>
              <a class="dropdown-item" @click="putsFormType = 4">HANGER EN DIARIO (DIARIO)</a>
            </li>
          </ul>
        </li>
      </div>
      <!-- </nav> -->

      <div v-if="putsFormType === 1"><PutStratOne></PutStratOne></div>
      <div v-if="putsFormType === 2"><PutStratTwo></PutStratTwo></div>
      <div v-if="putsFormType === 3"><PutStratThree></PutStratThree></div>
      <div v-if="putsFormType === 4"><PutStratFour></PutStratFour></div>
    </div>
  </div>
</template>

<script>
  import PutStratOne from "./PutsForms/putStratOne.vue";
  import PutStratTwo from "./PutsForms/putStratTwo.vue";
  import PutStratThree from "./PutsForms/putStratThree.vue";
  import PutStratFour from "./PutsForms/putStratFour.vue";
  export default {
    name: "PutsForm",
    data() {
      return {
        putsFormType: 1,
      };
    },
    components: { PutStratOne, PutStratTwo, PutStratThree, PutStratFour },
  };
</script>
