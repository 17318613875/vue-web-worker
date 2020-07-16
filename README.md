# vue-web-workers

A Vue component to use Web Workers in a simply way

## Install

```shell
yarn add vue-web-workers
npm install vue-web-workers
```

### Use

```tsx
...
import VueWebWorkers from "vue-web-workers";

@Component({
  components: { VueWebWorkers }
})
export default DEMO extends Vue {
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

  protected render() {
    return (
      <div >
        <VueWebWorkers v-model="worker" @message="onMessage" :postMessage="postMessage">
          addEventListener('message', async (event) => {
          setTimeout(() => postMessage(Object.assign({}, event.data, {state: true})), 1000)
          })
        </VueWebWorkers>
        <button @click="sendByWorker">SendByWorker</button>
        <button @click="sendByPostMessage">SendByPostMessage</button>
      </div>
    )
  }

}

```

### Customize configuration

See [GitHub](https://github.com/17318613875/vue-web-workers).
