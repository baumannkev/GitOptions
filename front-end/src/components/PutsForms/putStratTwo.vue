<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="ui container col-md-7 py-5">
            <h3>{{ strategy }}</h3>
            <div class="ui info visible message">
              <p>
                NOTA: Entre más cerca estamos del PROMEDIO MOVIL DE 40 ESTA OPERACIÓN TIENE MAYOR RIESGO <br /><br />ESTA ESTRATEGIA TIENE MAYOR PROBABILIDAD DE ÉXITO CUANDO ESTAMOS MAS CERCA DEL TECHO DE LA LINEA DE TENDENCIA DEL CANAL. SE PRESENTA LA PRIMERA VELA VERDE (10 AM) Y LUEGO SE TRAZA LA
                LINEA DEL PISO DEL GAP Y SE DA ROMPIMIENTO CON VELA ROJA.<br /><br />LA LINEA DEL PISO DEL GAP O LINEA DE TENDENCIA DEL GAP SE TRAZAN CON LA COLA DE LA PRIMERA VELA VERDE LA VELA QUE ROMPE DEBE ROMPER CON SU CUERPO.
              </p>
            </div>
            <OptionsTrade @optionemit="getOptions"></OptionsTrade>
            <form @submit.prevent="submit">
              <!-- <div class="row">
                <div class="col-md-6">
                  <div class="ui label">Fecha de Compra</div>
                  <div class="ui calendar" id="type_calendar" data-type="date" data-date="2019-12-24">
                    <div class="ui input left icon">
                      <i class="calendar icon"></i>
                      <input type="date" required placeholder="2022-08-01" v-model="todayDate" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui labeled input">
                    <div class="ui label">Stock</div>
                    <input type="text" required placeholder="e.g. AAPL" v-model="stock" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui labeled input">
                    <div class="ui label">Precio de Hoy $</div>
                    <input type="number" step="any" required placeholder="00.00" v-model="todayPrice" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui label">Fecha de Strike Price</div>
                  <div class="ui calendar" id="type_calendar" data-type="date" data-date="2019-12-24">
                    <div class="ui input left icon">
                      <i class="calendar icon"></i>
                      <input type="date" required placeholder="2022-08-01" v-model="strikeDate" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui labeled input">
                    <div class="ui label">Strike Price $</div>
                    <input type="number" required placeholder="00.00" v-model="strikePrice" />
                  </div>
                </div>
              </div> -->
              <!-- Checkboxes -->
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Trazar a las 10 am el piso del GAP" id="put-strat-two-id-zero" type="checkbox" />
                    <label for="put-strat-two-id-zero">Trazar a las 10 am el piso del GAP</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Se da a partir de las 11, cuando una vela ROJA rompe el piso del GAP o línea horizontal de tendencia, en ese momento se compra el PUT" id="put-strat-two-id-one" type="checkbox" />
                    <label for="put-strat-two-id-one">Se da a partir de las 11, cuando una vela ROJA rompe el piso del GAP o línea horizontal de tendencia, <b>en ese momento se compra el PUT</b></label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="La vela de las 10 DEBE ser VERDE" id="put-strat-two-id-two" type="checkbox" />
                    <label for="put-strat-two-id-two">La vela de las 10 DEBE ser <b>VERDE</b> </label>
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
    data() {
      return {
        callOrPut: "Put",
        strategy: "ESTRATEGIA RUPTURA DEL PISO DEL GAP (HORA)",
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
            console.log("json ", json);
            self.successMessage = json.message;
            self.success = true;
          });
      },
    },
    components: { OptionsTrade },
  };
</script>
