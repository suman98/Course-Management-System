<template>
    <b-modal ok-only ref="my-modal" id="modal-create-course" @ok="handleOk" :ok-title="title" centered size="lg" :title="title">
        <validation-observer ref="simpleRules">
            <div class="row">
                <div class="col-md-12">
                    <b-form-group label="Lesson Group Name" label-for="basicInput">
                        <validation-provider #default="{ errors }" name="Name" rules="required">
                            <b-form-input id="courseName" v-model="forms.name" placeholder="Lesson Group Name" :state="errors.length > 0 ? false : null" />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </div>
            </div>
        </validation-observer>
    </b-modal>
</template>
<script type="text/javascript">
import { BModal } from 'bootstrap-vue';
import {
    BFormInput,
    BFormGroup,
    BFormSelect
} from 'bootstrap-vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { required } from '@validations';
import { createLessonGroup,updateLessonGroup } from "../../../Models/LessonGroup";


export default {
    components: {
        ValidationProvider,
        ValidationObserver,
        BModal,
        BFormInput,
        BFormGroup,
        BFormSelect,
    },
    data() {

        return {
            required,
            title: "Create Lesson Group",
            forms: {
                id: null,
                name: null,
                course_id: null,
            },
        }
        
    },
    mounted() {
        
        this.$parent.$on("createLessonGroup", (value) => {
            this.forms.name = null;
            this.forms.course_id = value.course_id;
            this.$nextTick(()=>{
               this.$refs['my-modal'] && this.$refs['my-modal'].toggle('#toggle-btn');
           });
        });

        this.$parent.$on("updateLessonGroup", (value) => {
            this.forms.name = value.lession_type.name;
            this.forms.id = value.lession_type.id;
            this.forms.course_id = value.course_id;
            this.$nextTick(()=>{
               this.$refs['my-modal'] && this.$refs['my-modal'].toggle('#toggle-btn');
            });
        });

    },
    methods: {
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.$refs.simpleRules.validate().then(success => {
               if (success) {
                   let updater = this.forms.id ? updateLessonGroup :  createLessonGroup ;
                   this.$store.commit("app/UPDATE_COURSES",updater({value: this.forms}));
                   this.$nextTick(()=>{
                       this.$refs['my-modal'] && this.$refs['my-modal'].toggle('#toggle-btn');
                   });
               }
             });
        }
    },

}
</script>