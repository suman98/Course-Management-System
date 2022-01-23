<template>
    <b-modal
        ref="my-modal"
        id="modal-create-lessons"
        ok-only
        @ok="handleOk"
        @hide="handleClose"
        @show="handleShow"
        :ok-title="title"
        centered
        size="lg"
        :title="title"
    >
        <validation-observer ref="simpleRules">
            <div class="row">
                <div class="col-md-12">
                    <b-form-group
                        label="Lessons Name"
                        label-for="lessonsName"
                        class="mb-0"
                    >
                        <div class="row" id="lessonsName">
                            <div class="col-sm-1">
                                <b-avatar
                                    variant="light-primary"
                                    square
                                    size="md"
                                />
                            </div>
                            <div class="col-sm-11 pl-0">
                                <b-form-file
                                    placeholder="Choose a file or drop it here..."
                                    drop-placeholder="Drop file here..."
                                    v-model="form.lession_file"
                                    accept="image/x-png,image/gif,image/jpeg"
                                />
                                <label>Allow JPEG,GIF or PNG</label>
                            </div>
                        </div>
                    </b-form-group>
                </div>
                <div class="col-md-12">
                    <b-form-group label="Lessons name">
                        <validation-provider
                            #default="{ errors }"
                            name="Lessons Name"
                            rules="required"
                        >
                            <b-input-group>
                                <b-form-input
                                    v-model="form.lession_name"
                                    :state="errors.length > 0 ? false : null"
                                    placeholder="Lessons Name"
                                />
                                <b-input-group-append is-text>
                                    <feather-icon
                                        icon="ArchiveIcon"
                                        class="cursor-pointer"
                                    />
                                </b-input-group-append>
                            </b-input-group>
                            <small class="text-danger">
                                {{ errors[0] }}
                            </small>
                        </validation-provider>
                    </b-form-group>
                </div>
                <div class="col-md-12">
                    <validation-provider
                        #default="{ errors }"
                        name="Lessons Type"
                        rules="required"
                    >
                        <b-form-group label="Lesson Type">
                            <b-form-select
                                :state="errors.length > 0 ? false : null"
                                v-model="form.lesson_type"
                                :options="lesson_type_array"
                                placeholder="Please select a lesson type"
                            />
                        </b-form-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                </div>
                <div class="col-md-12">
                    <validation-provider
                        #default="{ errors }"
                        name="Domains"
                        rules="required"
                    >
                        <b-form-group label="Domains" label-for="domains">
                            <b-form-select
                                :state="errors.length > 0 ? false : null"
                                id="domains"
                                v-model="form.domains"
                                :options="domains"
                            />
                        </b-form-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                </div>
                <div class="col-md-12">
                    <b-form-group label="Pass Percentage">
                        <validation-provider
                            #default="{ errors }"
                            name="Pass Percentage"
                            rules="required"
                        >
                            <b-input-group>
                                <b-form-input
                                    :state="errors.length > 0 ? false : null"
                                    v-model="form.pass_percent"
                                    placeholder="Pass Percentage"
                                />
                                <b-input-group-append is-text>
                                    <feather-icon
                                        icon="ArchiveIcon"
                                        class="cursor-pointer"
                                    />
                                </b-input-group-append>
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </div>
                <div class="col-md-12">
                    <b-form-group label="Access Type" label-for="accessType">
                        <validation-provider
                            #default="{ errors }"
                            name="Access Type"
                            rules="required"
                        >
                            <b-form-select
                                id="accessType"
                                :state="errors.length > 0 ? false : null"
                                v-model="form.access_type"
                                :options="['Trail', 'On duty']"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </div>
                <div class="col-md-12">
                    <b-form-group label="Live Link">
                        <validation-provider
                            #default="{ errors }"
                            name="Live Link"
                            rules="required"
                        >
                            <b-input-group>
                                <b-form-input
                                    :state="errors.length > 0 ? false : null"
                                    v-model="form.live_link"
                                    placeholder="Live Link"
                                />
                                <b-input-group-append is-text>
                                    <feather-icon
                                        icon="ArchiveIcon"
                                        class="cursor-pointer"
                                    />
                                </b-input-group-append>
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </div>
                <div class="col-md-12">
                    <b-form-group label="PDF" label-for="PDF" class="mb-0">
                        <div class="row" id="PDF">
                            <div class="col-sm-12">
                                <b-form-file
                                    v-model="form.pdf_file"
                                    accept="application/pdf"
                                    placeholder="Choose a file or drop it here..."
                                    drop-placeholder="Drop file here..."
                                />
                            </div>
                        </div>
                    </b-form-group>
                </div>
            </div>
        </validation-observer>
    </b-modal>
</template>
<script type="text/javascript">
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { required } from '@validations';
import {
    BFormInput,
    BFormGroup,
    BFormSelect,
    BFormFile,
    BInputGroupAppend,
    BModal,
    BAvatar,
    BInputGroup,

} from 'bootstrap-vue';
import { createLession, updateLession } from "../../../Models/Lession";
const initialState  = () =>  {
    return {
       domains: [],
        required,
        title: "Create Lession",
        form: {
            lession_file: null,
            lession_name: null,
            lesson_type: null,
            domains: null,
            pass_percent: null,
            access_type: null,
            live_link: null,
            pdf_file: null,
            id: null,
        }
    }
};
export default {
    components: {
        BModal,
        BFormInput,
        BFormGroup,
        BFormSelect,
        BFormFile,
        BAvatar,
        BInputGroup,
        BInputGroupAppend,
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            ...initialState(),
        }
    },
    mounted () {
    	this.$parent.$on("createLessons",()=>{
    		Object.assign(this.$data, initialState(this));
    		this.$nextTick(()=>{
               this.$refs['my-modal'] && this.$refs['my-modal'].toggle('#toggle-btn');
            });
    	});
 		this.$parent.$on("editLession",(value) => {
 			value['lession_file'] = null;
 			value['pdf_file'] = null;
 			this.form = {
 				...value,
 			}
 			this.$nextTick(()=>{
               this.$refs['my-modal'] && this.$refs['my-modal'].toggle('#toggle-btn');
            });
 		});
    },
    computed: {
    	lesson_type_array : function () {
    		let courses = JSON.parse(this.$store.state.app.all_courses).find((arr)=> arr.id === this.$store.state.app.selected_course );
    		courses =  courses ? courses.lessions_types : [];
    		return courses.map((arr)=> {
    			return {
    				value: arr.id,
    				text: arr.name,
    			}
    		})

    	}
    },
    methods: {
    	handleShow () {
    		this.domains = this.DB.domains;
    		if (this.form.id) this.title = "Update Lession";
    	},
    	handleClose () {
    		
       	},
    	async handleOk (bvModalEvt) {
    		bvModalEvt.preventDefault();
    		const toBase64 = file => new Promise((resolve, reject) => {
			    const reader = new FileReader();
			    reader.readAsDataURL(file);
			    reader.onload = () => resolve(reader.result);
			    reader.onerror = error => reject(error);
			});

    		this.$refs.simpleRules.validate().then(async success => {
    			if (success) {
    				let formData = this.form;

    				if (formData.lession_file !== null) {
    					formData['lession_name_file'] =  await toBase64(formData.lession_file);
    				}

    				if (formData.pdf_file !== null) {
    					formData['pdf'] =  await toBase64(formData.pdf_file);
    				}

    				formData['course'] =  this.$store.state.app.selected_course;

    				let updater  = this.form.id ? updateLession : createLession ;
    				  console.log(formData);
    				let newLession = updater({value: formData});

    				this.$store.commit("app/UPDATE_COURSES",newLession.new_db);
  
    				this.$nextTick(()=>{
                      
                       this.$store.commit("app/UPDATE_LESSION_LISTS", {
			                lessions: newLession.newLessons,
			                course: formData['course'] ,
			            });

                        this.$refs['my-modal'] && this.$refs['my-modal'].toggle('#toggle-btn');
                    });
    			}
    		});
    	},

    }
}
</script>