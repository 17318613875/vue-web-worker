<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from "vue-property-decorator";

interface PostMessage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

@Component({})
export default class VueWebWorkers extends Vue {
  @Model("change")
  worker!: Worker;

  private workerSync!: Worker;

  @Prop({ default: () => `Worker_${new Date().getTime()}`, type: String })
  name!: string;
  @Prop() TextContent!: string;
  @Prop() postMessage!: PostMessage;

  @Watch("postMessage")
  onChangePostMessage(val: PostMessage) {
    (this.worker || this.workerSync).postMessage(val);
  }

  public init() {
    const { name, TextContent, $slots } = this;
    const WorkersTextContent =
      TextContent ||
      ($slots && $slots.default && $slots.default[0] && $slots.default[0].text);
    const blob = new Blob([`${WorkersTextContent}`]);
    const url = window.URL.createObjectURL(blob);
    this.workerSync = new Worker(url, { name });
    this.workerSync.addEventListener("message", ({ data }) => {
      this.$emit("message", data);
    });
    this.$emit("change", this.workerSync);
  }

  created() {
    this.init();
  }

  destroyed() {
    (this.worker || this.workerSync).terminate();
  }

  protected render() {
    return;
  }
}
</script>