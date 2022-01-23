<template>
    <b-modal  ok-variant="danger" modal-class="modal-danger" ref= "my-modal" @ok="handleOk" ok-title="Confirm" centered 
    :title="`Delete ${deleteParams.title}`">
        <b-card-text>Are you sure you want to delete {{ deleteParams.title }}</b-card-text>
    </b-modal>
</template>
<script>
import { BButton, BModal, BCard, BCardText } from 'bootstrap-vue';
import { destroyCourse  } from "../../Models/Course";
import { destroyLessonGroup  } from "../../Models/LessonGroup";
import { destroyLession  } from "../../Models/Lession";
export default {
	props: ['deleteObject'],
    components: {
        BButton,
        BModal,
        BCard,
        BCardText
    },
    data(){
    	return {
    		deleteParams: {},
    	}
    	
    },
    mounted () {
    
    	this.$parent.$on("fireDelete",(value)=>{
    		this.$nextTick(()=>{
    		   this.deleteParams = value;
               this.$refs['my-modal'] && this.$refs['my-modal'].toggle('#toggle-btn');
           	});
    	});

    },
    methods: {
        handleOk (bvModalEvt) {
            
            bvModalEvt.preventDefault();
            
            if(this.deleteParams.type === 'course') {
            	this.$store.commit("app/UPDATE_COURSES",destroyCourse({value: this.deleteParams}));
            	this.$nextTick(() => {
                    this.$refs['my-modal'].toggle('#toggle-btn');
                });
            }

            if(this.deleteParams.type === 'lession_type') {
              
                this.$store.commit("app/UPDATE_COURSES",destroyLessonGroup({value: this.deleteParams}));
                this.$nextTick(() => {
                    this.$refs['my-modal'].toggle('#toggle-btn');
                });
            }


            if(this.deleteParams.type === 'lession') {
                let newLession= destroyLession({value: this.deleteParams});
                this.$store.commit("app/UPDATE_COURSES",newLession.new_db);
                this.$nextTick(() => {
                    this.$refs['my-modal'].toggle('#toggle-btn');
                    this.$store.commit("app/UPDATE_LESSION_LISTS", {
                        lessions: newLession.newLessons,
                        course: this.deleteParams.course ,
                    });
                });
            }
        }
    },
}
</script>