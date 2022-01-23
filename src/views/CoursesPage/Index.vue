<template>
<div>
   <div class="row">
      <div class="col-md-4">
         <!-- side content -->
         <LeftContent/>
      </div>
      <div class="col-md-8">
         <!-- side content -->
         <RightContent/>
      </div>
   </div>
</div>
</template>
<script>

import Tools from './Tools';
import LeftContent  from "./LeftContent";
import RightContent  from "./RightContent";

export default {
 
 components: {
   Tools,
   LeftContent,
   RightContent,
  },

}
</script>