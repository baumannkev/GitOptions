<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="ui container col-md-7 py-5">
            <h3>{{ strategy }}</h3>
            <p class="mb-4"></p>
            <form @submit.prevent="submit">
              <OptionsTrade @optionemit="getOptions"></OptionsTrade>

              <!-- Checkboxes -->
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Debe ocurrir en tendencia alcista." id="call-strat-four-id-zero" type="checkbox" />
                    <label for="call-strat-four-id-zero">Debe ocurrir en tendencia alcista.</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Se da de un día para el otro." id="call-strat-four-id-one" type="checkbox" />
                    <label for="call-strat-four-id-one">Se da de un día para el otro.</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="El precio del premarket es mayor al precio del cierre del día anterior." id="call-strat-four-id-two" type="checkbox" />
                    <label for="call-strat-four-id-two">El precio del premarket es mayor al precio del cierre del día anterior.</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Se confirma con dos velas verdes la de las 10 y la de las 11 (no admite hanger a las 11) y el precio de la acción debe subir durante el día." id="call-strat-four-id-three" type="checkbox" />
                    <label for="call-strat-four-id-three">Se confirma con dos velas verdes la de las 10 y la de las 11 (no admite hanger a las 11) y el precio de la acción debe subir durante el día.</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Revisar el precio de la acción a las 3:58, 3:59 para hacer EL CALL" id="call-strat-four-id-four" type="checkbox" />
                    <label for="call-strat-four-id-four">Revisar el precio de la acción a las 3:58, 3:59 para hacer EL CALL</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Si compro lunes o martes, dejar vencimiento para esa misma semana (no pasa nada si el precio de la acción baja de un día para el otro)" id="call-strat-four-id-five" type="checkbox" />
                    <label for="call-strat-four-id-five">Si compro lunes o martes, dejar vencimiento para esa misma semana (no pasa nada si el precio de la acción baja de un día para el otro).</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Si compro jueves o viernes dejar vencimiento para viernes de la siguiente semana." id="call-strat-four-id-six" type="checkbox" />
                    <label for="call-strat-four-id-six">Si compro jueves o viernes dejar vencimiento para viernes de la siguiente semana.</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Se podrán presentar varias subidas, por lo tanto, se recomienda invertir menos en cada subida." id="call-strat-four-id-seven" type="checkbox" />
                    <label for="call-strat-four-id-seven">Se podrán presentar varias subidas, por lo tanto, se recomienda invertir menos en cada subida.</label>
                  </div>
                </div>
                <div class="ui info visible message"><p>SI ESTAMOS EN TENDENCIA AL ALZA DENTRO DE CANAL BAJISTA</p></div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Trazar la línea de tendencia del canal" id="call-strat-four-id-eight" type="checkbox" />
                    <label for="call-strat-four-id-eight">Trazar la línea de tendencia del canal.</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Esperar velas VERDE + VERDE (10 y 11)" id="call-strat-four-id-nine" type="checkbox" />
                    <label for="call-strat-four-id-nine">Esperar velas VERDE + VERDE (10 y 11)</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Esperar que rompa el techo del canal para hacer EL CALL" id="call-strat-four-id-ten" type="checkbox" />
                    <label for="call-strat-four-id-ten">Esperar que rompa el techo del canal para hacer EL CALL</label>
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
    name: "callStratFour",
    data() {
      return {
        callOrPut: "Call",
        strategy: "ESTRATEGIA GAP NORMAL AL ALZA (HORA)",
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
