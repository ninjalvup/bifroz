<template>
<div id="app">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title"><i class="fas fa-user-plus"></i> เพิ่มลูกค้า</h4>
            <ul class="breadcrumbs"></ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">เพิ่มข้อมูลลูกค้า</h4>
                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent="submitForm">
                            <div class="form-group row">
                                <label for="bank_name" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                    เลือกธนาคาร:
                                    <span class="required-label">*</span>
                                </label>
                                <select class="form-control col-lg-4 col-md-9 col-sm-8" name="bank_name" id="bank_name" v-model="form.bank_name">
                                    <option selected disabled value>เลือก ธนาคาร</option>
                                    <option value="kbnk">ธนาคารกสิกรไทย</option>
                                    <option value="ktba">ธนาคารกรุงไทย</option>
                                    <option value="scb">ธนาคารไทยพาณิชย์</option>
                                    <option value="bay">ธนาคารกรุงศรีอยุธยา</option>
                                    <option value="bbla">ธนาคารกรุงเทพ</option>
                                    <option value="gsb">ธนาคารออมสิน</option>
                                    <option value="ttb">ธนาคารทหารไทยธนชาต (TTB)</option>
                                    <option value="BAAC">ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร</option>
                                    <option value="ICBC">ธนาคารไอซีบีซี (ไทย)</option>
                                    <option value="TCD">ธนาคารไทยเครดิตเพื่อรายย่อย</option>
                                    <option value="CITI">ธนาคารซิตี้แบงก์</option>
                                    <option value="SCBT">ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย)</option>
                                    <option value="CIMB">ธนาคารซีไอเอ็มบีไทย</option>
                                    <option value="UOB">ธนาคารยูโอบี</option>
                                    <option value="HSBC">ธนาคารเอชเอสบีซี ประเทศไทย</option>
                                    <option value="MIZUHO">ธนาคารมิซูโฮ คอร์ปอเรต</option>
                                    <option value="GHB">ธนาคารอาคารสงเคราะห์</option>
                                    <option value="LHBANK">ธนาคารแลนด์ แอนด์ เฮ้าส์</option>
                                    <option value="TISCO">ธนาคารทิสโก้</option>
                                    <option value="kkba">ธนาคารเกียรตินาคิน</option>
                                    <option value="IBANK">ธนาคารอิสลามแห่งประเทศไทย</option>
                                </select>
                            </div>

                            <div class="form-group row">
                                <label for="bank_number" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                    เลขที่บัญชี :
                                    <span class="required-label">*</span>
                                </label>
                                <input class="form-control col-lg-4 col-md-9 col-sm-8" type="text" name="bank_number" id="bank_number" aria-describedby="helpId" placeholder="กรุณากรอกหมายเลขบัญชี" v-model="form.bank_number" required />

                                <!-- <div class="input-group mb-3 col-lg-4 col-md-9 col-sm-8">
                                    <input v-model="form.bank_number" required type="number" name="bank_name" id="bank_number" class="form-control" placeholder="กรุณากรอกหมายเลขบัญชี" aria-label="bank_number" aria-describedby="bank_number">
                                    <button class="btn btn-info text-white btn-outline-secondary" type="button" id="button-addon2" @click="searchBank">ตรวจสอบ</button>
                                </div> -->
                            </div>
                            <div class="form-group row">
                                <label for="first_name" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                    ชื่อ:
                                    <span class="required-label">*</span>
                                </label>

                                <input class="form-control col-lg-4 col-md-9 col-sm-8" type="text" name="first_name" id="first_name" aria-describedby="helpId" placeholder="กรุณากรอกชื่อ" v-model="form.first_name" required />
                            </div>

                            <div class="form-group row">
                                <label for="last_name" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                    นามสกุล:
                                    <span class="required-label">*</span>
                                </label>

                                <input class="form-control col-lg-4 col-md-9 col-sm-8" type="text" name="last_name" id="last_name" aria-describedby="helpId" placeholder="กรุณากรอกนามสกุล" v-model="form.last_name" required />
                            </div>

                            <div class="form-group row">
                                <label for="tel" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                    โทรศัพท์:
                                    <span class="required-label">*</span>
                                </label>

                                <input v-model="form.tel" type="tel" class="form-control col-lg-4 col-md-9 col-sm-8" placeholder="กรุณากรอกเบอร์มือถือ" minlength="9" maxlength="10" oninvalid="this.setCustomValidity('กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก')" @keyup="onNumber" />
                            </div>

                            <div class="form-group row">
                                <label for="info_name" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                    Password:
                                    <span class="required-label">*</span>
                                </label>
                                <input type="password" class="form-control col-lg-4 col-md-9 col-sm-8" name="password" id="password" placeholder="PASSWORD" v-model="form.password" required />
                            </div>

                            <div class="form-group row">
                                <label for="info_name" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                </label>
                                <transition name="hint" appear>
                                    <div v-if="passwordValidation.errors.length > 0  " class="mt-2">
                                        <div class="alert alert-danger">
                                            <span class="text-danger" v-for="error in passwordValidation.errors" :key="error">{{ error }}<br /></span>
                                        </div>
                                    </div>
                                </transition>
                            </div>

                            <div class="form-group row">
                                <label for="bonus" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                    โบนัส:
                                    <span class="required-label">*</span>
                                </label>
                                <select class="form-control col-lg-4 col-md-9 col-sm-8" name="bonus" id="bonus" v-model="form.bonus" required>
                                    <option selected disabled value>เลือก โบนัส</option>

                                    <option value="1">รับโบนัส</option>
                                    <option value="0">ไม่รับโบนัส</option>
                                </select>
                            </div>

                            <div class="form-group row">
                                <label for="line_id" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                    Line ID:
                                    <span class="required-label">*</span>
                                </label>

                                <input class="form-control col-lg-4 col-md-9 col-sm-8" type="text" name="line_id" id="line_id" aria-describedby="helpId" placeholder="กรอก Line ID" v-model="form.line_id" required />
                            </div>

                            <div class="form-group row">
                                <label for="know_us" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                    รู้จักเราผ่านช่องทางใด:
                                    <span class="required-label">*</span>
                                </label>
                                <select class="form-control col-lg-4 col-md-9 col-sm-8" id="know_us" name="know_us" v-model="form.know_us" required>
                                    <option value disabled selected>
                                        รู้จักเราผ่านช่องทางใด
                                    </option>
                                    <option value="google">Google</option>
                                    <option value="line">Line</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="youtube">Youtube</option>
                                    <option value="twitter">Twitter</option>
                                    <option value="vk">VK</option>
                                    <option value="tiktok">Tiktok</option>
                                    <!-- <option value="เฮียอาร์ม">เฮียอาร์ม</option>
                    <option value="เฮียบาส">เฮียบาส</option>
                    <option value="เฮียโก้">เฮียโก้</option>
                    <option value="เฮียเจอร์">เฮียเจอร์</option>
                    <option value="เฮียอั๋น">เฮียอั๋น</option>
                    <option value="เฮียหมู">เฮียหมู</option>
                    <option value="เฮียจ๊อด">เฮียจ๊อด</option>
                    <option value="เฮียแบงค์">เฮียแบงค์</option>
                    <option value="เฮียบอล">เฮียบอล</option>
                    <option value="เฮียจิมมี่">เฮียจิมมี่</option>
                    <option value="เฮียกอล์ฟ">เฮียกอล์ฟ</option>
                    <option value="เฮียซิน">เฮียซิน</option>
                    <option value="เสี่ยเท่ห์">เสี่ยเท่ห์</option> -->
                                    <option value="facebook">Facebook</option>
                                    <option value="friend">เพื่อนแนะนำมา</option>
                                </select>
                            </div>

                            <div class="form-group row" v-if="form.know_us === 'friend'">
                                <label for="friend" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                    ระบุ:
                                    <span class="required-label">*</span>
                                </label>

                                <input class="form-control col-lg-4 col-md-9 col-sm-8" type="text" name="friend" id="friend" aria-describedby="helpId" placeholder="กรอก ข้อมูล" v-model="form.friend" required />
                            </div>

                            <div class="form-group row d-none">
                                <label for="know_us" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                    Prefix:
                                    <span class="required-label">*</span>
                                </label>
                                <input type="text" class="form-control col-lg-4 col-md-9 col-sm-8" name="prefix" id="prefix" aria-describedby="helpId" placeholder="Prefix" v-model="form.prefix" required />

                                <button type="button" class="btn btn-info ml-3 mr-3" v-on:click.prevent="randomPrefix()">
                                    สร้าง Prefix
                                </button>
                            </div>

                            <button type="submit" class="btn btn-success float-right">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                ยืนยัน
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    baseURL
} from "../../../../services/api";
import UserService from "@/services/UserService";
import Swal from "sweetalert2";

// const url = "http://localhost:3000/api/member";
const url = `${baseURL}/member`;

export default {
    data() {
        return {
            form: {
                first_name: "",
                last_name: "",
                password: "",
                tel: "",
                bonus: "",
                line_id: "",
                know_us: "",
                bank_name: "",
                bank_number: "",
                prefix: "",
                friend: "",
            },
            prefixgen: "",
            rules: [{
                    message: "- ต้องใช้อักษรตัวพิมพ์เล็กหนึ่งตัว ",
                    regex: /[a-z]+/,
                },
                {
                    message: "- ต้องใช้อักษรตัวพิมพ์ใหญ่หนึ่งตัว ",
                    regex: /[A-Z]+/,
                },
                {
                    message: "- ขั้นต่ำ 8 ตัวอักษร ",
                    regex: /.{8,}/,
                },
                {
                    message: "- ต้องการหนึ่งหมายเลข ",
                    regex: /[0-9]+/,
                },
            ],
        };
    },
    methods: {
        async searchBank() {

            if (this.form.bank_name === "scb") {
                this.form.bank_name = "014";
            } else if (this.form.bank_name === "kbnk") {
                this.form.bank_name = "004";
            } else if (this.form.bank_name === "bbla") {
                this.form.bank_name = "002";
            } else if (this.form.bank_name === "ktba") {
                this.form.bank_name = "006";
            } else if (this.form.bank_name === "BAAC") {
                this.form.bank_name = "034";
            } else if (this.form.bank_name === "ttb" || this.form.bank_name === "tmb") {
                this.form.bank_name = "011";
            } else if (this.form.bank_name === "ICBC") {
                this.form.bank_name = "070";
            } else if (this.form.bank_name === "TCD") {
                this.form.bank_name = "071";
            } else if (this.form.bank_name === "CITI") {
                this.form.bank_name = "017";
            } else if (this.form.bank_name === "CIMB") {
                this.form.bank_name = "022";
            } else if (this.form.bank_name === "UOB") {
                this.form.bank_name = "024";
            } else if (this.form.bank_name === "bay") {
                this.form.bank_name = "025";
            } else if (this.form.bank_name === "gsb") {
                this.form.bank_name = "030";
            } else if (this.form.bank_name === "HSBC") {
                this.form.bank_name = "031";
            } else if (this.form.bank_name === "MIZUHO") {
                this.form.bank_name = "039";
            } else if (this.form.bank_name === "GHB") {
                this.form.bank_name = "033";
            } else if (this.form.bank_name === "LHBANK") {
                this.form.bank_name = "073";
            } else if (this.form.bank_name === "TBANK") {
                this.form.bank_name = "065";
            } else if (this.form.bank_name === "TISCO") {
                this.form.bank_name = "067";
            } else if (this.form.bank_name === "KKP") {
                this.form.bank_name = "069";
            } else if (this.form.bank_name === "IBANK") {
                this.form.bank_name = "066";
            }
            console.log(this.form.bank_name);
            console.log(this.form.bank_number);
            let checkform = {
                "bankCode": this.form.bank_name,
                "bankId": this.form.bank_number
            }

            const res = await axios.post(`https://api.gkbet888.com/api/bank/name`, checkform);
            console.log(res.data.data);
            if (res.data.message == undefined) {
                let searchname = res.data.data.accountToName.split(/ /).
console.log(searchname);
                this.form.first_name = searchname[0];
                this.form.last_name = searchname[1];

            } else {
                alert(res.data.message);
            }
console.log(this.form.bank_name);
            if (this.form.bank_name === "014") {
                this.form.bank_name = "scb";
            } else if (this.form.bank_name === "004") {
                this.form.bank_name = "kbnk";
            } else if (this.form.bank_name === "002") {
                this.form.bank_name = "bbla";
                
            } else if (this.form.bank_name == "006") {
                this.form.bank_name = "ktba";
                console.log(this.form.bank_name );
            } else if (this.form.bank_name === "034") {
                this.form.bank_name = "BAAC";
            } else if (this.form.bank_name === "011") {
                this.form.bank_name = "ttb";
            } else if (this.form.bank_name === "070") {
                this.form.bank_name = "ICBC";
            } else if (this.form.bank_name === "071") {
                this.form.bank_name = "TCD";
            } else if (this.form.bank_name === "017") {
                this.form.bank_name = "CITI";
            } else if (this.form.bank_name === "022") {
                this.form.bank_name = "CIMB";
            } else if (this.form.bank_name === "024") {
                this.form.bank_name = "UOB";
            } else if (this.form.bank_name === "025") {
                this.form.bank_name = "bay";
            } else if (this.form.bank_name === "030") {
                this.form.bank_name = "gsb";
            } else if (this.form.bank_name === "031") {
                this.form.bank_name = "HSBC";
            } else if (this.form.bank_name === "039") {
                this.form.bank_name = "MIZUHO";
            } else if (this.form.bank_name === "033") {
                this.form.bank_name = "GHB";
            } else if (this.form.bank_name === "073") {
                this.form.bank_name = "LHBANK";
            } else if (this.form.bank_name === "065") {
                this.form.bank_name = "TBANK";
            } else if (this.form.bank_name === "067") {
                this.form.bank_name = "TISCO";
            } else if (this.form.bank_name === "069") {
                this.form.bank_name = "KKP";
            } else if (this.form.bank_name === "066") {
                this.form.bank_name = "IBANK";
            }

        },
        onNumber() {
            this.form.tel = this.form.tel.replace(/[A-Za-zก-๛]/g, "");
            this.form.bank_number = this.form.bank_number.replace(/[A-Za-zก-๛]/g, "");
        },
        async checkAuth() {
            const res = await UserService.getProfile().catch(function (error) {
                if (error.response.status === 401 || error.response.status === 500) {
                    const removeToken = localStorage.removeItem("access_token");
                    if (removeToken == null) {
                        this.$router.push("/login");
                    }
                }
            });
            res.logout;
        },
        async submitForm() {
            if (this.form.know_us === "friend") {
                this.form.know_us = this.form.friend;
            }

            let timerInterval;
            Swal.fire({
                title: "กรุณารอสักครู่",
                // text: "ประมาณ 1 - 2 นาที",
                imageUrl: "https://media3.giphy.com/media/12MhwQm8toOEp2/source.gif",
                imageWidth: 300,
                imageHeight: 200,

                html: " ประมาน <b></b> นาที.",
                timer: 1234,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,

                didOpen: () => {
                    Swal.showLoading();
                    timerInterval = setInterval(() => {
                        const content = Swal.getContent();
                        if (content) {
                            const b = content.querySelector("b");
                            let ms = Swal.getTimerLeft();
                            let minutes = Math.floor(ms / 60000);
                            let seconds = ((ms % 60000) / 1000).toFixed(0);
                            if (b) {
                                b.textContent = `${minutes}:${
                  seconds < 10 ? "0" : ""
                }${seconds}`;
                            }
                        }
                    }, 1000);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            }).then(async (result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    this.time = "I was closed by the timer";
                }
            });
            console.log(this.form);
            if (this.form.bank_name === "014") {
                this.form.bank_name = "scb";
            } else if (this.form.bank_name === "004") {
                this.form.bank_name = "kbnk";
            } else if (this.form.bank_name === "002") {
                this.form.bank_name = "bbla";
            } else if (this.form.bank_name === "006") {
                this.form.bank_name = "ktba";
            } else if (this.form.bank_name === "034") {
                this.form.bank_name = "BAAC";
            } else if (this.form.bank_name === "011") {
                this.form.bank_name = "ttb";
            } else if (this.form.bank_name === "070") {
                this.form.bank_name = "ICBC";
            } else if (this.form.bank_name === "071") {
                this.form.bank_name = "TCD";
            } else if (this.form.bank_name === "017") {
                this.form.bank_name = "CITI";
            } else if (this.form.bank_name === "022") {
                this.form.bank_name = "CIMB";
            } else if (this.form.bank_name === "024") {
                this.form.bank_name = "UOB";
            } else if (this.form.bank_name === "025") {
                this.form.bank_name = "bay";
            } else if (this.form.bank_name === "030") {
                this.form.bank_name = "gsb";
            } else if (this.form.bank_name === "031") {
                this.form.bank_name = "HSBC";
            } else if (this.form.bank_name === "039") {
                this.form.bank_name = "MIZUHO";
            } else if (this.form.bank_name === "033") {
                this.form.bank_name = "GHB";
            } else if (this.form.bank_name === "073") {
                this.form.bank_name = "LHBANK";
            } else if (this.form.bank_name === "065") {
                this.form.bank_name = "TBANK";
            } else if (this.form.bank_name === "067") {
                this.form.bank_name = "TISCO";
            } else if (this.form.bank_name === "069") {
                this.form.bank_name = "KKP";
            } else if (this.form.bank_name === "066") {
                this.form.bank_name = "IBANK";
            }
            axios
                .post(url + "/", this.form, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("access_token"),
                    },
                })
                .then(() => {
                    this.$router.push("/user");
                    console.log();
                    this.$toast.success("สมัครเรียบร้อยแล้ว", {
                        position: "top-right",
                        timeout: 1500,
                        icon: true,
                        rtl: false,
                    });
                })
                .catch((error) => {
                    console.log(error.response.data.error.message);
                    this.$toast.error(error.response.data.error.message, {
                        position: "top-right",
                        timeout: 1500,
                        icon: true,
                        rtl: false,
                    });
                })
                .finally(() => {});
        },
        randomPrefix() {
            let prefixgen =
                Math.random()
                .toString(36)
                .substring(2, 6) +
                Math.random()
                .toString(36)
                .substring(2, 4);
            this.form.prefix = prefixgen;

            return prefixgen;
        },
    },
    computed: {
        passwordValidation() {
            let errors = [];
            for (let condition of this.rules) {
                if (!condition.regex.test(this.form.password)) {
                    errors.push(condition.message);
                }
            }
            if (errors.length === 0) {
                return {
                    valid: true,
                    errors,
                };
            } else {
                return {
                    valid: false,
                    errors,
                };
            }
        },
    },
    mounted() {
        this.checkAuth();

        this.randomPrefix();
    },
};
</script>
