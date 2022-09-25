<template>
  <div class="row my-2 justify-content-center"
  style="margin-top: 50px !important; margin-bottom: 150px;"
  >
    <div class="col-11 col-md-9">
      <div
        class="row rounded h-border"
        style="
          background-image: url(assets/images/custom/bgsl1.png);
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          background-position: center;
        "
      >
      <div class="col-3 text-center pt-4">
          <router-link to="/sharedLink">
          <i class="fa-sharp fa-solid fa-list fa-xl"></i>
          <p>
            ภาพรวม
          </p>
        </router-link>
        </div>
        <div class="col-3 text-center pt-4">
          <router-link to="/sharedincome">
            <i class="fa-sharp fa-solid fa-coins fa-xl"></i>
            <p>
              รายได้
            </p>
          </router-link>
        </div>
        <div class="col-3 text-center pt-4">
          <router-link to="/usertree">
            <i class="fa-sharp fa-solid fa-user-group fa-xl"></i>
            <p>
              สมาชิก
            </p>
          </router-link>
        </div>
        <div class="col-3 text-center pt-4">
          <router-link to="/withdrawIncome">
            <i class="fa-solid fa-money-bill fa-xl" ></i>
            <p>
              ถอนรายได้
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
</script>
  
  <style scoped>

p {
  font-size: 0.8em !important;
}
a{
  color: black;
}

.rounded {
    border-radius: 1.25rem !important;
}

.h-border{

  border: 2.5px solid wheat !important;
}

* {
  color: wheat !important;
 
}



</style>
  