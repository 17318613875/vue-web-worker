import VueWebWorkers from "./VueWebWorkers.vue";

VueWebWorkers.install = function(Vue) {
  Vue.component(VueWebWorkers.name, VueWebWorkers);
};

export default VueWebWorkers;
