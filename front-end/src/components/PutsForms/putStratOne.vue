<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="ui container col-md-7 py-5">
            <h3>{{ strategy }}</h3>
            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p> -->
            <OptionsTrade @optionemit="getOptions"></OptionsTrade>
            <form @submit.prevent="submit">
              <!-- Checkboxes -->
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Estoy en Canal Bajista" id="put-strat-one-id-zero" type="checkbox" />
                    <label for="put-strat-one-id-zero">Estoy en Canal Bajista</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Trazar línea de tendencia del canal piso y techo" id="put-strat-one-id-one" type="checkbox" />
                    <label for="put-strat-one-id-one">Trazar línea de tendencia del canal piso y techo</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Velas no han roto el techo de la línea de tendencia" id="put-strat-one-id-two" type="checkbox" />
                    <label for="put-strat-one-id-two">Velas no han roto el techo de la línea de tendencia</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="La puedo comprar con la primera VELA ROJA la de las 10 a.m." id="put-strat-one-id-three" type="checkbox" />
                    <label for="put-strat-one-id-three">La puedo comprar con la primera VELA ROJA la de las 10 a.m.</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="PRIMERA VELA ROJA es una señal bien bajista." id="put-strat-one-id-four" type="checkbox" />
                    <label for="put-strat-one-id-four">PRIMERA VELA ROJA es una señal bien bajista.</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Esta estrategia funciona 2 o 3 días después puede venir un rebote alcista." id="put-strat-one-id-five" type="checkbox" />
                    <label for="put-strat-one-id-five">Esta estrategia funciona 2 o 3 días después puede venir un rebote alcista.</label>
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
    name: "putStratOne",
    components: { OptionsTrade },
    data() {
      return {
        callOrPut: "Put",
        strategy: "ESTRATEGIA PRIMERA VELA ROJA (HORA)",
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
