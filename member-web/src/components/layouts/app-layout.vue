<template>
  <div id="app-layout">
     <div class="container p-0">
      <router-view/>
     </div>
    <!-- <Footer/> -->
  </div>
</template>


// <script>
// import axios from "axios";
// import { baseURL } from '../../services/api';
// export default {
//   name: "app-layout",
//   components: {
//     // Footer,
//   },
//   data() {
//     return {
//       bg:''
//     };
//   },
//   mounted() {
//     axios({
//       method: "get",
//       url: baseURL+"/photo/prefix",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + sessionStorage.getItem("access_token"),
//       },
//     })
//       .then((response) => {
//          this.bg = response.data.data.prefix[0].bg;
//           console.log(this.bg);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   },
// };
// </script>