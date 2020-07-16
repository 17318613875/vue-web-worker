<template>
  <div id="app">
    <VueWebWorkers @message="onMessage" :postMessage="postMessage">
      addEventListener('message', async (event) => {
      setTimeout(() => postMessage(Object.assign({}, event.data, {state: true})), 1000)
      })
    </VueWebWorkers>
    <button @click="sendByWorker">SendByWorker</button>
    <button @click="sendByPostMessage">SendByPostMessage</button>
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

  public sendByWorker() {
    this.worker && this.worker.postMessage({ action: "sendByWorker", data: null });
  }
  public sendByPostMessage() {
    this.postMessage = {
      action: "sendByPostMessage",
      data: null
    };
  }
}
</script>
