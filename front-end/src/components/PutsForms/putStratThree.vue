<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="ui container col-md-7 py-5">
            <h3>{{ strategy }}</h3>
            <p class="mb-4">
              <!-- Lorem ipsum dolor sit amet elit. Sapiente sit aut eos -->
              <!-- consectetur adipisicing. -->
            </p>
            <OptionsTrade @optionemit="getOptions"></OptionsTrade>
            <form @submit.prevent="submit">
              <!-- Checkboxes -->
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Estar dentro de canal bajista (trata de subir, cae, trata de subir, cae)" id="put-strat-three-id-zero" type="checkbox" />
                    <label for="put-strat-three-id-zero">Estar dentro de canal bajista (trata de subir, cae, trata de subir, cae)</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Trazar las líneas de tendencia del canal bajista (piso y techo)" id="put-strat-three-id-one" type="checkbox" />
                    <label for="put-strat-three-id-one">Trazar las líneas de tendencia del canal bajista (piso y techo)</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Estar en zona de techo" id="put-strat-three-id-two" type="checkbox" />
                    <label for="put-strat-three-id-two">Estar en zona de techo</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="En zona de techo el intento de subida VELA VERDE es borrado por una VELA ROJA al lado de la verde." id="put-strat-three-id-three" type="checkbox" />
                    <label for="put-strat-three-id-three">En zona de techo el intento de subida VELA VERDE es borrado por una VELA ROJA al lado de la verde.</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Trazar línea de tendencia respetando los pisos de las subidas" id="put-strat-three-id-four" type="checkbox" />
                    <label for="put-strat-three-id-four">Trazar línea de tendencia respetando los pisos de las subidas</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Cuando Vela ROJA rompa el piso de la línea de tendencia COMPRO EL PUT (RECORDAR VERDE Y LUEGO ROJO)" id="put-strat-three-id-five" type="checkbox" />
                    <label for="put-strat-three-id-five">Cuando Vela ROJA rompa el piso de la línea de tendencia COMPRO EL PUT (RECORDAR VERDE Y LUEGO ROJO)</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Se compra a partir de las 11" id="put-strat-three-id-six" type="checkbox" />
                    <label for="put-strat-three-id-six">Se compra a partir de las 11</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Puede ser que en las dos últimas horas del día anterior se de VELA VERDE y VELA ROJA" id="put-strat-three-id-seven" type="checkbox" />
                    <label for="put-strat-three-id-seven">Puede ser que en las dos últimas horas del día anterior se de VELA VERDE y VELA ROJA</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="ui checkbox">
                    <input v-model="inputs" value="Vela de las 10 Roja, Vela de las 11 Roja del día siguiente, es confirmación, por lo tanto, se compra el PUT" id="put-strat-three-id-eight" type="checkbox" />
                    <label for="put-strat-three-id-eight">Vela de las 10 Roja, Vela de las 11 Roja del día siguiente, es confirmación, por lo tanto, se compra el PUT.</label>
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
    name: "putStratThree",
    components: { OptionsTrade },
    data() {
      return {
        callOrPut: "Put",
        strategy: "ESTRATEGIA MODELO DE LOS 4 PASOS (HORA)",
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
