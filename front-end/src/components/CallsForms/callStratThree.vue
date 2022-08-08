<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="ui container col-md-7 py-5">
            <h3>{{ strategy }}</h3>
            <div class="ui info visible message">
              <p>ANALIZAR LA TENDENCIA DE LARGO PLAZO, EN ESTA TENDENCIA HABRAN CANALES BAJISTAS, ES AQUÍ DONDE SE APLICA ESTA ESTRATEGIA.</p>
            </div>
            <OptionsTrade @optionemit="getOptions"></OptionsTrade>
            <form @submit.prevent="submit">
              <!-- Checkboxes -->
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="No comprar dentro de canal bajista. Los canales bajistas duran de 3 a 4 semanas" id="call-strat-three-id-zero" type="checkbox" />
                    <label for="call-strat-three-id-zero">No comprar dentro de canal bajista. Los canales bajistas duran de 3 a 4 semanas.</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Promedios móviles cruzados, es decir, 40/20" id="call-strat-three-id-one" type="checkbox" />
                    <label for="call-strat-three-id-one">Promedios móviles cruzados, es decir, 40/20</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Los precios suben y caen, suben y caen, suben y caen" id="call-strat-three-id-two" type="checkbox" />
                    <label for="call-strat-three-id-two">Los precios suben y caen, suben y caen, suben y caen.</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Trazar línea de tendencia sobre los picos de precios, es decir, cuando los precios son altos" id="call-strat-three-id-three" type="checkbox" />
                    <label for="call-strat-three-id-three">Trazar línea de tendencia sobre los picos de precios, es decir, cuando los precios son altos.</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="A esa línea de tendencia la llamaremos TECHO" id="call-strat-three-id-four" type="checkbox" />
                    <label for="call-strat-three-id-four">A esa línea de tendencia la llamaremos TECHO</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Cuando Vela VERDE de las 11 a.m. o después de las 11 am rompe ese techo se hace el CALL, el tiempo para el rompimiento debe ser HORA" id="call-strat-three-id-five" type="checkbox" />
                    <label for="call-strat-three-id-five">Cuando Vela VERDE de las 11 a.m. o después de las 11 am rompe ese techo se hace el CALL, el tiempo para el rompimiento debe ser HORA.</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Cuando existe el rompimiento de ese TECHO de la línea de tendencia, la tendencia se vuelve alcista, 20/40" id="call-strat-three-id-six" type="checkbox" />
                    <label for="call-strat-three-id-six">Cuando existe el rompimiento de ese TECHO de la línea de tendencia, la tendencia se vuelve alcista, 20/40</label>
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
    name: "callStratThree",
    data() {
      return {
        callOrPut: "Call",
        strategy: "ESTRATEGIA RUPTURA DE CANAL BAJISTA (HORA)",
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
