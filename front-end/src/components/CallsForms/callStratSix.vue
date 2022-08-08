<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="ui container col-md-7 py-5">
            <h3>{{ strategy }}</h3>
            <div class="ui info visible message">
              <p>
                NOTA: Esta estrategia se puede dar después de la “Estrategia de Piso Fuerte”, muchas veces es un complemento a esa estrategia que toco el promedio móvil de 100 o de 200. ROMPE y ahí compro por piso fuerte y luego se da el primer GAP al ALZA si el día siguiente abre arriba el mercado.
              </p>
            </div>
            <OptionsTrade @optionemit="getOptions"></OptionsTrade>
            <form @submit.prevent="submit">
              <!-- Checkboxes -->
              <h4>Dia</h4>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Debo venir en caída (DIA)" id="call-strat-six-id-zero" type="checkbox" />
                    <label for="call-strat-six-id-zero">Debo venir en caída (DIA)</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input
                      v-model="inputs"
                      value="Estar en Zona de Piso fuerte, Promedio Movil de 100/200 (DIA), algunas veces se forman pisos por debajo de esos promedios móviles (Tendencia DLP), esta tendencia es también un piso fuerte, las acciones suben de precio cuando tocan ese nivel."
                      id="call-strat-six-id-one"
                      type="checkbox"
                    />
                    <label for="call-strat-six-id-one"
                      >Estar en Zona de Piso fuerte, Promedio Movil de 100/200 (DIA), <b>algunas veces se forman pisos por debajo de esos promedios móviles (Tendencia DLP)</b>, esta tendencia es también un piso fuerte, las acciones suben de precio cuando tocan ese nivel.</label
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="No importa que este en un canal bajista. (DIA)" id="call-strat-six-id-two" type="checkbox" />
                    <label for="call-strat-six-id-two">No importa que este en un canal bajista. (DIA)</label>
                  </div>
                </div>
              </div>
              <h4>Hora</h4>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Primera VELA VERDE y debe abrir arriba en precio" id="call-strat-six-id-three" type="checkbox" />
                    <label for="call-strat-six-id-three"><b>Primera VELA VERDE y debe abrir arriba en precio</b></label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="NO PUEDE SER ROJA" id="call-strat-six-id-four" type="checkbox" />
                    <label for="call-strat-six-id-four">NO PUEDE SER ROJA.</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Trazar el piso del GAP y RESPETARLO, NO debe ROMPERLO NINGUNA VELA" id="call-strat-six-id-five" type="checkbox" />
                    <label for="call-strat-six-id-five"><b>Trazar el piso del GAP y RESPETARLO, NO debe ROMPERLO NINGUNA VELA</b></label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="La vela tiene volumen" id="call-strat-six-id-six" type="checkbox" />
                    <label for="call-strat-six-id-six">La vela tiene volumen, <b>SI NO HAY VELA CON VOLUMEN NO SE CUMPLE LA ESTRATEGIA</b></label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="La Vela que tiene el Volumen debe ser VERDE SOLIDA" id="call-strat-six-id-seven" type="checkbox" />
                    <label for="call-strat-six-id-seven">La Vela que tiene el Volumen debe ser VERDE SOLIDA, <b>no puede ser Hanger verde, tampoco vela ROJA, se aceptan martillos VERDES.</b></label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input
                      v-model="inputs"
                      value="Se compra cerca de las 3:58, 3:59, en caso de SPY puede comprarse hasta las 4:12, 4:13, no importa que la última vela sea ROJA, siempre que no rompa la línea de tendencia horizontal que es lo mismo que el piso del GAP"
                      id="call-strat-six-id-eight"
                      type="checkbox"
                    />
                    <label for="call-strat-six-id-eight">Se compra cerca de las 3:58, 3:59, en caso de SPY puede comprarse hasta las 4:12, 4:13, <b>no importa que la última vela sea ROJA, siempre que no rompa la línea de tendencia horizontal que es lo mismo que el piso del GAP</b></label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input
                      v-model="inputs"
                      value="En resumen, si hay una VELA ROJA en las diferentes horas se puede hacer el CALL siempre que: VELA VERDE (puede ser la de las 10 pero debe tener VOLUMEN), RESPETAR PISO DE GAP, UNA VELA VERDE TIENE EL VOLUMEN"
                      id="call-strat-six-id-nine"
                      type="checkbox"
                    />
                    <label for="call-strat-six-id-nine">En resumen, si hay una VELA ROJA en las diferentes horas se puede hacer el CALL siempre que: VELA VERDE (puede ser la de las 10 pero debe tener VOLUMEN), RESPETAR PISO DE GAP, UNA VELA VERDE TIENE EL VOLUMEN.</label>
                  </div>
                  <div class="ui info visible message">
                    <p>Algunas veces se dan las dos estrategias el mismo día, Estrategia de Piso Fuerte a las 11 am y al final de la tarde se da el primer GAP al ALZA.</p>
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
    name: "callStratSix",
    data() {
      return {
        callOrPut: "Call",
        strategy: "ESTRATEGIA DE PRIMER GAP AL ALZA (DIA Y HORA)",
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

<style scoped></style>
