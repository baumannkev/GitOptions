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
              <h4>CAIDA NORMAL</h4>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="20/40, la caída no llega al piso de los 40, tampoco es necesario que toque la línea del promedio móvil de 20" id="call-strat-two-id-zero" type="checkbox" />
                    <label for="call-strat-two-id-zero">20/40, la caída no llega al piso de los 40, tampoco es necesario que toque la línea del promedio móvil de 20.</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Debo estar en tendencia alcista" id="call-strat-two-id-one" type="checkbox" />
                    <label for="call-strat-two-id-one">Debo estar en tendencia alcista</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Caída normal es una caída pequeña, en el caso del SPY es una caída de entre $3 y $5 o menor a 1.5%" id="call-strat-two-id-two" type="checkbox" />
                    <label for="call-strat-two-id-two">Caída normal es una caída pequeña, en el caso del SPY es una caída de entre $3 y $5 o menor a 1.5%</label>
                  </div>
                </div>
              </div>
              <h4>CAIDA FUERTE</h4>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Se une con caída normal" id="call-strat-two-id-three" type="checkbox" />
                    <label for="call-strat-two-id-three">Se une con caída normal.</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="La caída se acerca al piso de 40 o cae por debajo del piso de 40, en el caso del SPY una caída fuerte es de $6 en adelante" id="call-strat-two-id-four" type="checkbox" />
                    <label for="call-strat-two-id-four">La caída se acerca al piso de 40 o cae por debajo del piso de 40, en el caso del SPY una caída fuerte es de $6 en adelante.</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Vela verde debe romper la línea de tendencia bajista, tanto en SPY como en el resto de las acciones" id="call-strat-two-id-five" type="checkbox" />
                    <label for="call-strat-two-id-five">Vela verde debe romper la línea de tendencia bajista, tanto en SPY como en el resto de las acciones.</label>
                  </div>
                  <div class="ui info visible message">
                    <p>NOTA: aun cuando la línea del promedio móvil de 40 este sobre la de 20, cuando las caídas son normales o fuertes, se pueden hacer CALLS.</p>
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
    name: "callStratTwo",
    data() {
      return {
        callOrPut: "Call",
        strategy: "ESTRATEGIA CAIDA NORMAL Y CAIDA FUERTE (HORA)",
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
