<template>
  <div>
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-md-6">
          <div class="ui labeled input">
            <div class="ui label">Stock Symbol</div>
            <input type="text" required placeholder="e.g. AAPL" v-model="stock" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="ui labeled input">
            <div class="ui label">Option Price Paid per Contract $</div>
            <input type="number" step="any" required placeholder="00.00" v-model="pricePerContract" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="ui labeled input">
            <div class="ui label"># of Contracts</div>
            <input type="number" required placeholder="10" v-model="numOfContracts" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="ui labeled input">
            <div class="ui label">Strike Price/Exercise Price</div>
            <input type="number" step="any" required placeholder="00.00" v-model="strikePrice" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="ui label">Fecha de Compra</div>
          <div class="ui calendar" id="type_calendar" data-type="date" data-date="2019-12-24">
            <div class="ui input left icon">
              <i class="calendar icon"></i>
              <input type="date" required placeholder="2022-08-01" v-model="todayDate" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="ui label">Fecha de Expiracion</div>
          <div class="ui calendar" id="type_calendar" data-type="date" data-date="2019-12-24">
            <div class="ui input left icon">
              <i class="calendar icon"></i>
              <input type="date" required placeholder="2022-08-01" v-model="expireDate" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="ui labeled input">
            <div class="ui label">Current Stock Price $</div>
            <input type="number" step="any" required placeholder="00.00" v-model="todayPrice" />
          </div>
        </div>
      </div>
      <button class="ui button" @click="submitOption">Confirm Stocks</button>
      <!-- <div class="row">
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
    </form>
    <div v-if="success" class="ui success message">{{ successMessage }}</div>
    <div v-if="error" class="ui error message">{{ errorMessage }}</div>
    <table v-if="success" class="ui unstackable celled table">
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
          <td data-label="Stock">{{ stock }}</td>
          <td data-label="Price Per Contract">{{ pricePerContract }}</td>
          <td data-label="Number of Contracts">{{ numOfContracts }}</td>
          <td data-label="Strike Price">{{ strikePrice }}</td>
          <td data-label="Fecha de Compra">{{ todayDate }}</td>
          <td data-label="Fecha de Expiracion">{{ expireDate }}</td>
          <td data-label="Current Stock Price">{{ todayPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "OptionsTrade",
    data() {
      return {
        stock: "",
        pricePerContract: null,
        numOfContracts: null,
        strikePrice: null,
        todayPrice: null,
        todayDate: "",
        expireDate: "",
        successMessage: "Success!",
        success: false,
        errorMessage: "Error",
        error: false,
      };
    },
    components: {},
    methods: {
      submitOption() {
        let self = this;
        if (self.stock !== "" && self.pricePerContract !== null && self.numOfContracts !== null && self.strikePrice !== null && self.todayPrice !== null && self.todayDate !== "" && self.expireDate !== "") {
          self.$emit("optionemit", { stock: self.stock, pricePerContract: self.pricePerContract, numOfContracts: self.numOfContracts, strikePrice: self.strikePrice, todayPrice: self.todayPrice, todayDate: self.todayDate, expireDate: self.expireDate });
          console.log("price ", self.todayPrice);
          self.success = true;
          self.error = false;
        } else {
          self.error = true;
          self.success = false;
        }
      },
    },
  };
</script>

<style scoped></style>
