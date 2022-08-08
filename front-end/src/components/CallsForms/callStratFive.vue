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
              <h4>Diario</h4>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Promedio Móvil 100 sobre 200 (Diario)" id="call-strat-five-id-zero" type="checkbox" />
                    <label for="call-strat-five-id-zero">Promedio Móvil 100 sobre 200 (Diario)</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Se da una caída y la caída toca el Promedio Móvil de 100 o el de 200 y se ve en diario una VELA VERDE a partir de las 11 (Diario)" id="call-strat-five-id-one" type="checkbox" />
                    <label for="call-strat-five-id-one">Se da una caída y la caída toca el Promedio Móvil de 100 o el de 200 y se ve en diario una VELA VERDE a partir de las 11 (Diario)</label>
                  </div>
                </div>
              </div>
              <h4>Tiempo Hora</h4>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Trazar línea de tendencia de caída hacer, CALL cuando VELA VERDE EN HORA rompa el techo del canal trazado, este rompimiento puede pasar entre las 11 am y las 4 pm." id="call-strat-five-id-two" type="checkbox" />
                    <label for="call-strat-five-id-two">Trazar línea de tendencia de caída hacer, CALL cuando VELA VERDE EN HORA rompa el techo del canal trazado, este rompimiento puede pasar entre las 11 am y las 4 pm.</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="PUEDE SUCEDER QUE AL PASARME A HORA SE DE UN GAP BAJISTA POR LO TANDO SE ACONSEJA COMPRAR EL CALL EN ESE MOMENTO" id="call-strat-five-id-three" type="checkbox" />
                    <label for="call-strat-five-id-three">PUEDE SUCEDER QUE AL PASARME A HORA SE DE UN GAP BAJISTA POR LO TANDO SE ACONSEJA COMPRAR EL CALL EN ESE MOMENTO</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Puede ocurrir que los precios sigan subiendo por 3 o 4 días, las aperturas de los siguientes días abren con VELA VERDE (vela de las 10)" id="call-strat-five-id-four" type="checkbox" />
                    <label for="call-strat-five-id-four">Puede ocurrir que los precios sigan subiendo por 3 o 4 días, las aperturas de los siguientes días abren con VELA VERDE (vela de las 10)</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Trazar línea de piso" id="call-strat-five-id-five" type="checkbox" />
                    <label for="call-strat-five-id-five">Trazar línea de piso</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Los precios se deben mantener sobre la línea de piso, si sale una VELA ROJA, VENDER CALL." id="call-strat-five-id-six" type="checkbox" />
                    <label for="call-strat-five-id-six">Los precios se deben mantener sobre la línea de piso, si sale una VELA ROJA, VENDER CALL.</label>
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
    name: "callStratFive",
    data() {
      return {
        callOrPut: "Call",
        strategy: "ESTRATEGIA DE PISO FUERTE (DIARIO Y HORA) tiene 2 partes.",
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
