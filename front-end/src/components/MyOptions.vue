<template>
  <div>
    <div class="ui header">Welcome to your options history, {{ user }}</div>
    <div class="ui buttons">
      <button class="ui negative button">Puts</button>
      <div class="or"></div>
      <button class="ui positive button active">Calls</button>
      <div class="or"></div>
      <button class="ui neutral button active">All</button>
    </div>
    <div class="ui one unstackable cards">
      <div class="horizontal card" v-for="option in optionList" :key="option.id">
        <div class="content">
          <div class="header">Compra de {{ option.callOrPut }}</div>
          <div class="meta">{{ option.strategy }}</div>
          <div class="description">
            <table class="ui unstackable celled table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Price Per Contract</th>
                  <th>Number of Contracts</th>
                  <th>Strike Price</th>
                  <th>Fecha de Compra</th>
                  <th>Fecha de Expiracion</th>
                  <th>Current Stock Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Stock">{{ option.optionItems[0].stock }}</td>
                  <td data-label="Price Per Contract">{{ option.optionItems[0].pricePerContract }}</td>
                  <td data-label="Number of Contracts">{{ option.optionItems[0].numOfContracts }}</td>
                  <td data-label="Strike Price">{{ option.optionItems[0].strikePrice }}</td>
                  <td data-label="Fecha de Compra">{{ option.optionItems[0].todayDate }}</td>
                  <td data-label="Fecha de Expiracion">{{ option.optionItems[0].expireDate }}</td>
                  <td data-label="Current Stock Price">{{ option.optionItems[0].todayPrice }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="extra content">
          <div class="ui middle aligned divided list">
            <div class="item" v-for="optioninput in option.inputs" :key="optioninput">
              <em data-emoji="heavy_check_mark" class="disabled"></em>
              {{ optioninput }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyOptions",
    data() {
      return {
        id: "",
        user: "",
        optionList: [],
      };
    },
    components: {},
    methods: {
      handleNewOption(newOption) {
        this.optionList.unshift(newOption);
      },
    },
    created() {
      let self = this;
      self.user = localStorage.getItem("name");
      self.id = localStorage.getItem("id");

      const endPointRoot = "http://localhost:3002/api/getOptions/" + self.id;

      fetch(endPointRoot)
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          console.log("data ", data);
          data.data.forEach(myFunction);

          function myFunction(item, index) {
            console.log(item);
            self.handleNewOption(item);
          }
        });
    },
  };
</script>

<style scoped>
  .buttons {
    margin-bottom: 10px;
  }
</style>
