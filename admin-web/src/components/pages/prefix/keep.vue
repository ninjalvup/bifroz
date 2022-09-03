<template>
  <div id="keepprefix">
      <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h4>
                  ปิดเว็บไซต์
                  <label class="switch">
                    <input
                      type="checkbox"
                      v-model="web_on_off"
                      value="1"
                      checked
                    />
                    <span
                      class="slider round"
                      @click.prevent="offwebUpdate"
                    ></span>
                  </label>
                </h4>
                <div class="form-group">
                  <textarea
                    v-model="message_on_of_web"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div class="card-body">
                <h4>ข้อความสมัครสมาชิก</h4>
                <div class="form-group">
                  <textarea
                    v-model="message_member"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div class="card-body">
                <h4>อนุญาติให้ถอนกรณีมีการเเทงคงค้าง</h4>
                <label class="switch">
                  <input
                    type="checkbox"
                    v-model="status_outstanding"
                    value="1"
                    checked
                  />
                  <span
                    class="slider round"
                    @click.prevent="outStanding"
                  ></span>
                </label>
              </div>
              <div class="card-body">
                <h4>จำนวนเครดิตขั้นต่ำที่สามารถถอนได้</h4>
                <input
                  v-model="credit_min"
                  type="text"
                  class="form-control"
                  aria-describedby="helpId"
                />
              </div>
              <div class="card-body">
                <h4>จำนวนเงินมากที่สุดที่จะไม่ทำการอณุมัติออโต้</h4>
                <input
                  v-model="credit_max"
                  type="text"
                  class="form-control"
                  aria-describedby="helpId"
                />
              </div>
              <div class="card-body">
                <h4>อนุมัติรายการถอนเเบบออโต้</h4>
                <label class="switch">
                  <input type="checkbox" v-model="status_auto" checked />
                  <span class="slider round" @click.prevent="statusAuto"></span>
                </label>
              </div>
              <div class="card-body">
                <h4>จำกัดจำนวนครั้งต่อวัน</h4>
                <label class="switch">
                  <input type="checkbox" v-model="status_amount" checked />
                  <span
                    class="slider round"
                    @click.prevent="statusAmount"
                  ></span>
                </label>
              </div>
              <div class="card-body">
                <h4>ถอนได้กี่ครั้งต่อวัน</h4>
                <input
                  v-model="amount"
                  type="text"
                  class="form-control"
                  aria-describedby="helpId"
                />
              </div>
            </div>
          </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>