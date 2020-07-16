<template>
  <div id="app">
    <VueWebWorkers  @message="onMessage" :postMessage="postMessage">
      addEventListener('message', async (event) => {
      setTimeout(() => postMessage(Object.assign({}, event.data, {state: true})), 1000)
      })
    </VueWebWorkers>
    <button @click="sendMsg">123</button>
    <button @click="sendMsg1">123</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueWebWorkers from "./components/VueWebWorkers.vue";

@Component({
  components: {
    VueWebWorkers
  }
})
export default class App extends Vue {
  private worker: Worker | null = null;
  private postMessage = { action: "", data: null };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onMessage(args: any) {
    console.log(args);
  }

  public sendMsg() {
    this.worker && this.worker.postMessage({ action: "sendMsg", data: null });
  }
  public sendMsg1() {
    this.postMessage = {
      action: "sendMsg1",
      data: null
    };
  }
}
</script>
