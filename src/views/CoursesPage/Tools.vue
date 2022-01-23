<template>
    <div class="row">
     <!--    <div class="col-md-3">
            <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-create-course variant="outline-primary btn-block">
                Create Courses
            </b-button>
        </div> -->
        <div class="col-md-3">
            <b-form-group>
                <b-form-input placeholder="Type to search" />
            </b-form-group>
        </div>
        <div class="col-md-3">
            <b-form-group>
                <b-form-select />
            </b-form-group>
        </div>
        <div class="col-md-3">
            <b-form-group>
                <b-form-select />
            </b-form-group>
        </div>
    </div>
</template>
<script>
import { BButton } from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';

import { BFormInput,BFormGroup,BFormSelect } from 'bootstrap-vue';

export default {
 components: {
    BButton,
    BFormInput,
    BFormGroup,
    BFormSelect
  },
  directives: {
    Ripple,
  },
}
</script>