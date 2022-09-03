<template>
<div id="user-data">
    <div class="row mt-1 justify-content-center">
        <div class="col-md-12">
            <div class="card  shadow">
                <div class="card-body " style="  background: linear-gradient(0deg, #007bff 0%, rgb(0 121 255 / 62%) 100%);">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="text-center text-white">
                                <img src="assets/images/icons/profile.png" style="width: 50px; height: 50px" />
                                <h6 class="font-size-label">
                                    User: {{ sb_username }}
                                    <i @click="copy" v-clipboard:copy="sb_username" class="far fa-copy"></i>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 mx-auto col-6">
                            <br />
                            <div class="d-flex justify-content-center">
                                <div class=" text-white">
                                    <!-- <h6 class="font-size-label">Name: {{first_name}} {{last_name}}</h6>
                <h6 class="font-size-label">Tel: {{tel}}</h6> -->
                                    <span class="text-warning text-center" style="font-size: 22px">เครดิต
                                    </span>
                                </div>
                            </div>

                            <div class="d-flex justify-content-center  text-center mt-2">
                                <label class="text-white" style="font-size: 22px">
                                    {{ credit | formatNumber }}
                                    <img @click="refresh" class="refresh crossRotate" src="./../../../../assets/img/lk/reload.png" alt="" width="40px" />
                                </label>
                            </div>
                        </div>

                        <div class="col-sm-6 col-6 ">
                            <div class="d-flex justify-content-center mt-4">
                                <span class="text-warning " style="font-size: 22px">รายได้
                                </span>
                            </div>
                            <div class="d-flex  justify-content-center mt-2">
                                <label class="text-white" style="font-size: 22px">
                                    {{ this.income }}
                                    <img @click="refresh" class="refresh crossRotate" src="./../../../../assets/img/lk/reload.png" alt="" width="40px" />
                                </label>
                            </div>
                        </div>
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
} from "./../../../../services/api";
import gameService from "./../../../../services/loginGame";
import profileService from "./../../../../services/profile";
import jQuery from "jquery";
import incomeervice from "@/services/incomeService";
export default {
    name: "home",
    data() {
        return {
            tel: "",
            first_name: "",
            last_name: "",
            member_credit: "",
            sb_username: "",
            sb_password: "",
            credit: "",
            income: "0.00",
        };
    },
    mounted() {
        jQuery(document).ready(function () {
            jQuery(".crossRotate").click(function () {
                if (jQuery(this).css("transform") == "none") {
                    jQuery(this).css("transform", "rotate(360deg)");
                } else {
                    jQuery(this).css("transform", "");
                }
            });
        });
        axios({
                method: "get",
                url: baseURL + "/member/profile",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                this.first_name = response.data.data.first_name;
                this.last_name = response.data.data.last_name;
                this.tel = response.data.data.tel;
                this.member_credit = response.data.data.member_credit;
                this.sb_username = response.data.data.sb_username;
                this.sb_password = response.data.data.sb_password;
                this.prefix = response.data.data.prefix;
                sessionStorage.setItem("sb_username", this.sb_username);
                sessionStorage.setItem("sb_password", this.sb_password);
                sessionStorage.setItem("prefixAfiliate", this.prefix);
                // this.loginGame();
            })
            .catch((error) => {
                console.log(error);
                this.$router.push("/login");
            });
        this.getCredit();
        this.getIncome();
    },
    methods: {
        //ดึงเครดิต
        async getCredit() {
            const resp = await profileService.getCredit();
            this.credit2 = resp.data.data.credit;
            this.credit3 = this.credit2 | this.formatNumber;
            if (this.credit3 == 0) {
                this.credit = 0;
            } else {
                this.credit = this.credit2;
            }
        },
        refresh() {
            // this.loginGame();
            this.getCredit();
        },
        async loginGame() {
            try {
                const data = {
                    username: sessionStorage.getItem("sb_username"),
                    password: sessionStorage.getItem("sb_password"),
                };
                const resp = await gameService.loginGame(data);
                if (resp.code === 0) {
                    sessionStorage.setItem("token", resp.result.access_token);
                    sessionStorage.setItem("user", JSON.stringify(resp.result.profile));
                    sessionStorage.setItem("username", data.username);
                    sessionStorage.setItem("password", data.password);
                }
            } catch (error) {
                console.log(error);
            }
        },
        copy() {
            this.$toast.success("คัดลอก User สำเร็จ", {
                position: "top-right",
                timeout: 1500,
            });
        },
        async getIncome() {
            const rs = await incomeervice.getIncome();
            this.income = rs.income;
        },
    },
};
</script>

<style scoped></style>>
