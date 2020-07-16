import Vue from "vue";

declare class VueWebWorkers extends Vue {
  install(vue: typeof Vue): void;
}

export default VueWebWorkers;
