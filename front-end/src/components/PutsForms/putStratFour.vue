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
                    <input v-model="inputs" value="Estar en tendencia alcista" id="put-strat-four-id-zero" type="checkbox" />
                    <label for="put-strat-four-id-zero">Estar en tendencia alcista</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Dentro de la tendencia alcista en canal bajista" id="put-strat-four-id-one" type="checkbox" />
                    <label for="put-strat-four-id-one">Dentro de la tendencia alcista en canal bajista</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Estar en zona cara lejos de los promedios móviles de 100 y 200" id="put-strat-four-id-two" type="checkbox" />
                    <label for="put-strat-four-id-two">Estar en zona cara lejos de los promedios móviles de 100 y 200</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="En zona cara aparece un HANGER, ver gráfico en día a las 3:58, 3:59, si aparece un HANGER EN ESE MOMENTO EL PRECIO DE LA ACCION CAERA LOS SIGUIENTES DIAS." id="put-strat-four-id-three" type="checkbox" />
                    <label for="put-strat-four-id-three"><b>En zona cara aparece un HANGER, ver gráfico en día a las 3:58, 3:59, si aparece un HANGER EN ESE MOMENTO EL PRECIO DE LA ACCION CAERA LOS SIGUIENTES DIAS.</b></label>
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
    name: "putStratTwo",
    components: { OptionsTrade },
    data() {
      return {
        callOrPut: "Put",
        strategy: "ESTRATEGIA HANGER EN DIARIO (DIARIO)",
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
  };
</script>
