<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb shadow">
                        <li class="breadcrumb-item"><router-link to="/home">หนัาหลัก</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">รายละเอียดการถอนรายได้</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="row mt-2 justify-content-center">
            <div class="col-md-9">
                <div class="card shadow border-0 mt-4">
                    <div class="card-body">
                        <h6>รายละเอียดการถอนรายได้</h6>
                        <hr>

                        <div class="col-md-12">
                            <label for="formGroupExampleInput">เลขที่รายการ</label>
                            <div class="row">
                                <img class="ml-4" src="assets/images/icons/money.png" width="60" height="60" />
                                <div class="ml-3">
                                    <label for="">เครดิต </label>
                                </div>
                            </div>
                            <div class="row">
                                <img class="ml-5" src="assets/images/arrow.png" width="20" height="40" />
                            </div>
                            <div class="row">
                                <div class="d-flex justify-content-start mb-4 mt-2 ml-4">
                                    <img id="imgBank" src=""  width="60" height="60" />
                                    <div class="ml-3">
                                        <h6>ชื่อบัญชี: {{ name }}</h6>
                                        <h6>ธนาคาร: {{ bankName }}</h6>
                                        <h6>เลขบัญชี: {{ bankAccount }}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <label for="formGroupExampleInput">ยอดถอน</label><label class="float-right">{{ withdrawIncome }}</label>
                        <hr>
                        <div style="text-align: center; color: red"><span>กรุณารอรอดำเนินการภายใน 30 นาที</span></div>
                        <div class="row mt-3">
                            <div class="col-md-12 text-center" style="padding: 10px">
                                <router-link to="/home" class="btn btn-blue btn-lg rounded-pill text-center text-white">
                                    <i class="fas fa-check-circle"></i> กลับสู่หน้าหลัก
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import incomeService from "@/services/withdrawIncome";

export default {
    data() {
        return {
            name: "",
            bankAccount: "",
            bankName: "",
            withdrawIncome: "",
        };
    },
    mounted() {
        this.getDataUser();
        this.withdrawIncome = sessionStorage.getItem("amount");
    },
    methods: {
        async getDataUser() { // รายละเอียด bank
            const rs = await incomeService.getDataUser();
            this.name = rs.data.bank_account_name
            this.bankAccount = rs.data.bank_number
            this.bankName = rs.nameBank
            document.getElementById("imgBank").setAttribute("src", rs.imgBank);
        }
    }
};
</script>