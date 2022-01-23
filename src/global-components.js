import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import ConfirmDelete from "./views/Modals/ConfirmDelete";
Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component('confirm-delete',ConfirmDelete);
