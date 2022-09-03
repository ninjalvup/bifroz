<template>
  <div id="tree-affiliate">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title"><i class="fas fa-project-diagram"></i> แผนผังองค์กร</h4>
      </div>
      <div class="card" style="margin-bottom: 10px;">
        <div class="card-body">
          <form class="form-inline justify-content-center" v-on:submit.prevent="submitFormSearch">
            <div class="form-group"><label><span class="required-label">*</span>ชื่อผู้ใช้งาน : </label>
              <input type="text" required="required" class="form-control mr-2 ml-1" v-model="form.inputSearch">
              <button type="submit" class="btn btn-primary btn-sm ml-2" data-toggle="modal" data-target="#staticBackdrop">ค้นหา</button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-12">
        <div class="float-right">
          <ul class="nav nav-pills nav-info nav-sm mb-2  nav-pills-no-bd nav-pills-icons justify-content-center" id="pills-tab-with-icon" role="tablist">
            <li class="nav-item submenu">
              <button type="button" class="nav-link active show btn"
                id="pills-home-tab-icon" data-toggle="pill" href="#pills-home-icon"
                role="tab" aria-controls="pills-home-icon" aria-selected="false">แผนผังต้นไม้
              </button>
            </li>
            <li class="nav-item submenu">
              <a class="nav-link" id="pills-profile-tab-icon" data-toggle="pill"
                href="#pills-profile-icon" role="tab" aria-controls="pills-profile-icon"
                aria-selected="false">แผนผังตาราง
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="card col-md-12">
        <div class="card-body">
          <div class="tab-content mt-2 mb-3" id="pills-with-icon-tabContent">
            <div class="tab-pane fade active show" id="pills-home-icon" role="tabpanel" aria-labelledby="pills-home-tab-icon">
              <div class="body genealogy-body genealogy-scroll">
                <div class="genealogy-tree">
                  <ul v-if="main"><li><!-- main -->
                    <a href="#">
                      <div class="member-view-box">
                        <div class="member-image">
                          <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="Member">
                          <div class="member-details"><span>{{ main }}</span></div>
                        </div>
                      </div>
                    </a>

                    <ul id="model"></ul>

                  </li></ul>
                  <div style="color: red; display: none" id="model-null">ไม่พบ users ที่ค้นหา</div>
                </div>
              </div>
            </div>

            <!-- list talbe -->
            <div class="tab-pane fade" id="pills-profile-icon" role="tabpanel" aria-labelledby="pills-profile-tab-icon">
              <table class="display table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th colspan="5" class="text-left">
                      จำนวนรายการทั้งหมด (x) รายการ
                      <span style="float: right"><i class="fas fa-user-astronaut" style="color: blue"></i> {{ user_table }}</span>
                    </th>
                  </tr>
                  <tr class="text-center border">
                    <th>#</th>
                    <th>ยูสลูกค้า</th>
                    <th>จำนวนเงินในกระเป๋า</th>
                    <th>LV</th>
                    <th>วันที่สมัคร</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center" v-for="(data, index) in listTable" v-bind:key="data.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.sb_username }}</td>
                    <td>{{ data.income }}</td>
                    <td><span>{{ data.LV }}</span></td>
                    <td><span>{{ data.register_date }}</span></td>
                  </tr>
                </tbody>
                <tbody>
                  <tr v-if="listTable == 0">
                    <td colspan="7" class="text-center text-danger">
                      <i class="fas fa-times"></i> ไม่มีข้อมูล !
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body" style="text-align: center">
            <button id="dis-btn" class="btn btn-warning" type="button" disabled style="width: 100%">
              <span class="spinner-border spinner-border-sm" style="color: red" role="status" aria-hidden="true"> </span>
              <b style="color: red; font-size: 20px"> กรุณารอสักครู่ !!!</b>
            </button>

            <button id="show-btn" type="button" class="btn btn-success" style="width: 100%; font-size: 20px; display: none" data-dismiss="modal">
              กดปุ่มเพื่อแสดงข้อมูล <i class="fas fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import affiliateService from "@/services/affiliateService";

export default {
  data() {
    return {
      form: {
        inputSearch: ""
      },
      main: "",
      listLV1: "",
      user_table: "",
      listTable: 0
    }
  },
  methods: {
    async submitFormSearch() {
      const res_l1 = await affiliateService.getSearchUserTree(this.form);
      this.main = res_l1.data.sb_username
      this.listTreeTable(); // call fn

      // show btn
      document.getElementById("dis-btn").style.display = "block";
      document.getElementById("show-btn").style.display = "none";
      
      let textLv1 = "";
      if (res_l1.lv1.length > 0) {
        for (let i=0; i < res_l1.lv1.length; i++) { // LV1
          textLv1 += `<li>
            <a href="#/affiliatetree/">
              <div class="member-view-box">
                <div class="member-image">
                  <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="Member">
                  <div class="member-details"><span>${res_l1.lv1[i].sb_username}</span></div>
                </div>
              </div>
            </a>`

            textLv1 += `<ul>` // ul start LV2
            const res_l2 = await affiliateService.getSearchTreeLink(res_l1.lv1[i].uuid);
            for (let j=0; j < res_l2.data.length; j++) { // LV2
            textLv1 += `<li>
              <a href="#/affiliatetree/">
                <div class="member-view-box">
                  <div class="member-image">
                    <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="Member">
                    <div class="member-details"><span>${res_l2.data[j].sb_username}</span></div>
                  </div>
              </div></a>`

              textLv1 += `<ul>` // ul start LV3
              const res_l3 = await affiliateService.getSearchTreeLink(res_l2.data[j].uuid);
              for (let k=0; k < res_l3.data.length; k++) { // LV3
              textLv1 += `<li>
                <a href="#/affiliatetree/">
                  <div class="member-view-box">
                    <div class="member-image">
                    <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="Member">
                    <div class="member-details"><span>${res_l3.data[k].sb_username}</span></div>
                  </div>
                </div></a>`

                textLv1 += `<ul>` // ul start LV4
                const res_l4 = await affiliateService.getSearchTreeLink(res_l3.data[k].uuid);
                for (let l=0; l < res_l4.data.length; l++) { // LV4
                textLv1 += `<li>
                  <a href="#/affiliatetree/">
                    <div class="member-view-box">
                      <div class="member-image">
                      <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="Member">
                      <div class="member-details"><span>${res_l4.data[l].sb_username}</span></div>
                    </div>
                  </div></a>`

                  textLv1 += `<ul>` // ul start LV5
                  const res_l5 = await affiliateService.getSearchTreeLink(res_l4.data[l].uuid);
                  for (let m=0; m < res_l5.data.length; m++) { // LV5
                  textLv1 += `<li>
                    <a href="#/affiliatetree/">
                      <div class="member-view-box">
                        <div class="member-image">
                        <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="Member">
                        <div class="member-details"><span>${res_l5.data[m].sb_username}</span></div>
                      </div>
                    </div></a>`

                    textLv1 += `<ul>` // ul start LV6
                    const res_l6 = await affiliateService.getSearchTreeLink(res_l5.data[m].uuid);
                    for (let n=0; n < res_l6.data.length; n++) { // LV6
                    textLv1 += `<li>
                      <a href="#/affiliatetree/">
                        <div class="member-view-box">
                          <div class="member-image">
                          <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="Member">
                          <div class="member-details"><span>${res_l6.data[n].sb_username}</span></div>
                        </div>
                      </div></a>`

                      textLv1 += `<ul>` // ul start LV7
                      const res_l7 = await affiliateService.getSearchTreeLink(res_l6.data[n].uuid);
                      for (let o=0; o < res_l7.data.length; o++) { // LV7
                      textLv1 += `<li>
                        <a href="#/affiliatetree/">
                          <div class="member-view-box">
                            <div class="member-image">
                            <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="Member">
                            <div class="member-details"><span>${res_l7.data[o].sb_username}</span></div>
                          </div>
                        </div></a>`

                        textLv1 += `<ul>` // ul start LV8
                        const res_l8 = await affiliateService.getSearchTreeLink(res_l7.data[o].uuid);
                        for (let p=0; p < res_l8.data.length; p++) { // LV8
                        textLv1 += `<li>
                          <a href="#/affiliatetree/">
                            <div class="member-view-box">
                              <div class="member-image">
                              <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="Member">
                              <div class="member-details"><span>${res_l8.data[p].sb_username}</span></div>
                            </div>
                          </div></a>`

                          textLv1 += `<ul>` // ul start LV9
                          const res_l9 = await affiliateService.getSearchTreeLink(res_l8.data[p].uuid);
                          for (let q=0; q < res_l9.data.length; q++) { // LV9
                          textLv1 += `<li>
                            <a href="#/affiliatetree/">
                              <div class="member-view-box">
                                <div class="member-image">
                                <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="Member">
                                <div class="member-details"><span>${res_l9.data[q].sb_username}</span></div>
                              </div>
                            </div></a>`

                            textLv1 += `<ul>` // ul start LV10
                            const res_l10 = await affiliateService.getSearchTreeLink(res_l9.data[q].uuid);
                            for (let r=0; r < res_l10.data.length; r++) { // LV10
                            textLv1 += `<li>
                              <a href="#/affiliatetree/">
                                <div class="member-view-box">
                                  <div class="member-image">
                                  <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="Member">
                                  <div class="member-details"><span>${res_l10.data[r].sb_username}</span></div>
                                </div>
                              </div></a>`
                            textLv1 += `</li>` // li end LV10
                            } textLv1 += `</ul>` // ul end LV10

                          textLv1 += `</li>` // li end LV9
                          } textLv1 += `</ul>` // ul end LV9

                        textLv1 += `</li>` // li end LV8
                        } textLv1 += `</ul>` // ul end LV8

                      textLv1 += `</li>` // li end LV7
                      } textLv1 += `</ul>` // ul end LV7

                    textLv1 += `</li>` // li end LV6
                    } textLv1 += `</ul>` // ul end LV6

                  textLv1 += `</li>` // li end LV5
                  } textLv1 += `</ul>` // ul end LV5

                textLv1 += `</li>` // li end LV4
                } textLv1 += `</ul>` // ul end LV4

              textLv1 += `</li>` // li end LV3
              } textLv1 += `</ul>` // ul end LV3

            textLv1 += `</li>` // li end LV2
            } textLv1 += `</ul>` // ul end LV2

          textLv1 += "</li>" // ul end LV1
        }

        document.getElementById("model").innerHTML = textLv1
        document.getElementById("model-null").style.display = "none";

        // show btn
        setTimeout(function() { 
          document.getElementById("dis-btn").style.display = "none";
          document.getElementById("show-btn").style.display = "block";
        }, 2000)
      } else {
        // console.log(this.main+"QQWA564654564654564ES");
        if (this.main === undefined) {
          document.getElementById("model-null").style.display = "block";
           setTimeout(function() { 
          document.getElementById("dis-btn").style.display = "none";
          document.getElementById("show-btn").style.display = "block";
        }, 2000)
        } else {
          document.getElementById("model-null").style.display = "none";
          document.getElementById("model").innerHTML = textLv1;
        }
      } // end tree

    },
    async listTreeTable() { // tree table
      const res_table = await affiliateService.getSearchTreeTable(this.form);
      this.user_table = res_table.data;
      this.listTable = res_table.table;
    },
    getClipboardBank() {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      // this.$toast.info("คัดลอก เลขบัญชี สำเร็จแล้ว", {
      //   position: "top-right",
      //   timeout: 1500,
      // });
    },
  },
};
</script>

<style>
/*----------------genealogy-scroll----------*/

.genealogy-scroll::-webkit-scrollbar {
    width: 5px;
    height: 8px;
}
.genealogy-scroll::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #e4e4e4;
}
.genealogy-scroll::-webkit-scrollbar-thumb {
    background: #212121;
    border-radius: 10px;
    transition: 0.5s;
}
.genealogy-scroll::-webkit-scrollbar-thumb:hover {
    background: #d5b14c;
    transition: 0.5s;
}


/*----------------genealogy-tree----------*/
.genealogy-body{
    white-space: nowrap;
    overflow-y: hidden;
    /* padding: 50px; */
    /* min-height: 500px; */
    padding-top: 10px;
    text-align: center;
}
.genealogy-tree{
  display: inline-block;
}
.genealogy-tree ul {
    padding-top: 20px; 
    position: relative;
    padding-left: 0px;
    display: flex;
    justify-content: center;
}
.genealogy-tree li {
    float: left; text-align: center;
    list-style-type: none;
    position: relative;
    padding: 20px 5px 0 5px;
}
.genealogy-tree li::before, .genealogy-tree li::after{
    content: '';
    position: absolute; 
  top: 0; 
  right: 50%;
    border-top: 2px solid #ccc;
    width: 50%; 
  height: 18px;
}
.genealogy-tree li::after{
    right: auto; left: 50%;
    border-left: 2px solid #ccc;
}
.genealogy-tree li:only-child::after, .genealogy-tree li:only-child::before {
    display: none;
}
.genealogy-tree li:only-child{ 
    padding-top: 0;
}
.genealogy-tree li:first-child::before, .genealogy-tree li:last-child::after{
    border: 0 none;
}
.genealogy-tree li:last-child::before{
    border-right: 2px solid #ccc;
    border-radius: 0 5px 0 0;
    -webkit-border-radius: 0 5px 0 0;
    -moz-border-radius: 0 5px 0 0;
}
.genealogy-tree li:first-child::after{
    border-radius: 5px 0 0 0;
    -webkit-border-radius: 5px 0 0 0;
    -moz-border-radius: 5px 0 0 0;
}
.genealogy-tree ul ul::before{
    content: '';
    position: absolute; top: 0; left: 50%;
    border-left: 2px solid #ccc;
    width: 0; height: 20px;
}
.genealogy-tree li a{
    text-decoration: none;
    color: #666;
    font-family: arial, verdana, tahoma;
    font-size: 11px;
    display: inline-block;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
}

.genealogy-tree li a:hover+ul li::after, 
.genealogy-tree li a:hover+ul li::before, 
.genealogy-tree li a:hover+ul::before, 
.genealogy-tree li a:hover+ul ul::before{
    border-color:  #fbba00;
}

/*--------------memeber-card-design----------*/
.member-view-box{
    padding:0px 20px;
    text-align: center;
    border-radius: 4px;
    position: relative;
}
.member-image{
    width: 120px;
    position: relative;
}
.member-image img{
    width: 60px;
    height: 60px;
    border-radius: 6px;
  background-color :#000;
  z-index: 1;
}
</style>