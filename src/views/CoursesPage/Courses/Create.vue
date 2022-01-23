<template>
    <b-modal
        ref="my-modal"
        id="modal-create-course"
        @ok="handleOk"
        :ok-title="title"
        centered
        size="lg"
        :title="title"
    >
        <validation-observer ref="simpleRules">
            <div class="row">
                <div class="col-md-12">
                    <b-form-group label="Course Name" label-for="basicInput">
                        <validation-provider
                            #default="{ errors }"
                            name="Name"
                            rules="required"
                        >
                            <b-form-input
                                id="courseName"
                                v-model="forms.name"
                                placeholder="Course Name"
                                :state="errors.length > 0 ? false : null"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </div>
                <div class="col-md-12">
                    <b-form-group label="Grade" label-for="grade">
                        <validation-provider
                            #default="{ errors }"
                            name="Grade"
                            rules="required"
                        >
                            <b-form-select
                                id="grade"
                                v-model="forms.grade"
                                :options="grades"
                                :state="errors.length > 0 ? false : null"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </div>
                <div class="col-md-12">
                    <b-form-group label="Subjet" label-for="subject">
                        <validation-provider
                            #default="{ errors }"
                            name="Subject"
                            rules="required"
                        >
                            <b-form-select
                                id="subject"
                                :disabled="!forms.grade"
                                v-model="forms.subject"
                                :options="subjects"
                            />
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
import { createCourse , updateCourse} from "../../../Models/Course";

const initialState  = (ev) =>  {
    return {
        grades: ev.DB.grades,
        required,
        title: "Create Course",
        forms: {
            grade: null,
            subject: null,
            name: null,
            id: null,
        },
    }
};

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
          ...initialState(this),
        }
    },
    mounted () {
        this.$parent.$on("editCourse",(value)=>{
            this.forms = {
                id: value.id,
                name: value.name,
                subject: value.subject,
                grade: value.grade,
            };
            this.title = "Edit Course"; 
        
            this.$nextTick(()=>{
               this.$refs['my-modal'] && this.$refs['my-modal'].toggle('#toggle-btn');
           });
         
        });

        this.$parent.$on("createCourse",()=>{
            Object.assign(this.$data, initialState(this));
             this.$nextTick(()=>{
               this.$refs['my-modal'] && this.$refs['my-modal'].toggle('#toggle-btn');
           });
        });


    },
    methods: {
        handleOk (bvModalEvt) {
            bvModalEvt.preventDefault();
             this.$refs.simpleRules.validate().then(success => {
                if (success) {
                    let updater = this.forms.id ? updateCourse :  createCourse ;
                    this.$store.commit("app/UPDATE_COURSES",updater({value: this.forms}));
                    this.$nextTick(() => {
                        this.$refs['my-modal'].toggle('#toggle-btn');
                        Object.assign(this.$data, initialState(this));
                    });
                }
              });
        }
    },
    computed: {
        subjects: function() {
            let items = this.grades.find((arr) => arr.value === this.forms.grade) || [];
            this.$nextTick(() => {
                this.forms.subject = this.forms.subject || items.subjects[0].value;
            });
            return items ? items.subjects : [];
        },
    },
}
</script>