<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="ui container col-md-7 py-5">
            <h3>{{ strategy }}</h3>
            <p class="mb-4"></p>
            <OptionsTrade @optionemit="getOptions"></OptionsTrade>
            <form @submit.prevent="submit">
              <!-- Checkboxes -->
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Promedio móvil 20/40" id="call-strat-one-id-zero" type="checkbox" />
                    <label for="call-strat-one-id-zero">Promedio móvil 20/40</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="El precio tiene que venir en caída" id="call-strat-one-id-one" type="checkbox" />
                    <label for="call-strat-one-id-one">El precio tiene que venir en caída</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Velas ROJAS se tienen que acercar o tocar el promedio móvil de 40 " id="call-strat-one-id-two" type="checkbox" />
                    <label for="call-strat-one-id-two">Velas ROJAS se tienen que acercar o tocar el promedio móvil de 40</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Trazar línea de tendencia la cual tiene que ser bajista, la línea se traza tocando la punta de las velas (pueden ser los bordes o colas), esta línea cumple la función de TECHO" id="call-strat-one-id-three" type="checkbox" />
                    <label for="call-strat-one-id-three">Trazar línea de tendencia la cual tiene que ser bajista, la línea se traza tocando la punta de las velas (pueden ser los bordes o colas), esta línea cumple la función de TECHO</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="VELA VERDE O CUERPO DE MARTILLO “ROMPE” el techo, ese rompimiento debe pasar después de las 11 de la mañana" id="call-strat-one-id-four" type="checkbox" />
                    <label for="call-strat-one-id-four">VELA VERDE O CUERPO DE MARTILLO “ROMPE” el techo, ese rompimiento debe pasar después de las 11 de la mañana</label>
                  </div>
                </div>
              </div>
              <input type="submit" value="Confirmar" class="ui primary button" />
            </form>
            <div v-if="success" class="ui success message">{{ successMessage }}</div>
            <div v-if="error" class="ui error message">{{ errorMessage }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import OptionsTrade from "../OptionsTrade.vue";
  export default {
    name: "callStratOne",
    data() {
      return {
        callOrPut: "Call",
        strategy: "ESTRATEGIA PROMEDIO MOVIL DE 40 (HORA)",
        optionTrade: [],
        inputs: [],
        id: "",
        successMessage: "",
        success: false,
        errorMessage: "",
        error: false,
      };
    },
    methods: {
      getOptions(options) {
        this.optionTrade = [];
        this.optionTrade.unshift(options);
        console.log("options: ", options);
      },
      submit() {
        this.emitNewOption();
      },
      emitNewOption() {
        let self = this;
        self.id = localStorage.getItem("id");
        // POST request using fetch()
        if (self.optionTrade.length > 0) {
          fetch("http://localhost:3002/api/newOption/", {
            // Adding method type
            method: "POST",
            // Adding body or contents to send
            body: JSON.stringify({
              userId: self.id,
              callOrPut: self.callOrPut,
              strategy: self.strategy,
              optionItems: self.optionTrade,
              inputs: self.inputs,
            }),
            // Adding headers to the request
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            // Converting to JSON
            .then((response) => response.json())
            // Displaying results to console
            .then((json) => {
              if (json.status === "ok") {
                console.log("json ", json);
                self.successMessage = json.message;
                self.error = false;
                self.success = true;
              } else {
                console.log("json ", json);
                self.errorMessage = json.error;
                self.success = false;
                self.error = true;
              }
            });
        } else {
          self.success = false;
          self.errorMessage = "Forgot Stocks";
          self.error = true;
        }
      },
    },
    components: { OptionsTrade },
  };
</script>
