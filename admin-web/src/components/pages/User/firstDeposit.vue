<template>
    <div id="app">
        <div class="page-inner">
            <div class="page-header">
                <h4 class="page-title"><i class="fas fa-list-alt"></i> สมาชิกใหม่ / ฝากแรกของวัน</h4>
                <ul class="breadcrumbs"></ul>
            </div>
            <div class="card">
                <img class="card-img-top" src="holder.js/100x180/" alt="">
                <div class="card-body">
                    <h5 class="float-left"><i class="far fa-calendar-alt"> ประจำวันที่ : </i> {{ toDay }} ลูกค้าทั้งหมด <div class="badge badge-secondary">{{ listTable.length }}</div> คน </h5>

                    <div class="table-responsive">
                        <table id="basic-datatables" class="display table table-striped table-bordered">
                            <thead class="table-bordered" style="text-align: center">
                                <tr>
                                    <th>#</th>
                                    <th>ชื่อ-นามสกุล</th>
                                    <th>ชื่อผู้ใช้</th>
                                    <th>แนะนำโดย</th>
                                    <th>ยอดฝากแรก</th>
                                    <th>หมายเลขโทรศัพท์</th>
                                    <th>Bonus</th>
                                    <th>Line ID</th>
                                    <th>Know as</th>
                                    <th>วันที่ลงทะเบียน</th>
                                </tr>
                            </thead>
                            <tbody style="text-align: center">
                                <tr v-for="(data, index) in listTable" :key="data.uuid">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                        <img :src=" require(`../../../assets/bank_icon/${data.bank_name.toLowerCase()}.png`)" class="icon" style="margin-top: 10px; margin-bottom: 6px" width="40" ><br>
                                        <b>
                                            <a href="#" @click="getClipboardBank" v-clipboard:copy="data.bank_number">
                                                {{ data.bank_number }}
                                            </a>
                                        </b><br>
                                        <b>{{ data.bank_account_name }}</b>
                                    </td>
                                    <td>
                                        <b>
                                            <a href="#" @click="getClipboardBank" v-clipboard:copy="data.sb_username">
                                                {{ data.sb_username }}
                                            </a>
                                        </b>
                                    </td>
                                    <td>
                                        <b>
                                            <a href="#" @click="getClipboardBank" v-clipboard:copy="data.recommend">
                                                {{ data.recommend }}
                                            </a>
                                        </b>
                                    </td>
                                    <td>{{ data.amount }}</td>
                                    <td>{{ data.tel | formatTell }}</td>
                                    <td>
                                        <div v-if="data.bonus == '1'">
                                            <span class="badge badge-success">รับโบนัส</span>
                                        </div>
                                        <div v-if="data.bonus == '0'">
                                            <span class="badge badge-warning">ไม่รับโบนัส</span>
                                        </div>
                                    </td>
                                    <td>{{ data.line_id }}</td>
                                    <td>{{ data.know_us }}</td>
                                    <td>{{ data.register_date | formatDate }}</td>
                                </tr>
                                
                                <tr v-if="listTable.length === 0">
                                    <td colspan="10" class="text-center text-danger">
                                        <i class="fas fa-times"></i>ไม่มีข้อมูล !
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import affiliateService from "@/services/affiliateService";
import moment from "moment";

export default {
    data() {
        return {
            listTable: [],
            toDay: ""
        };
    },
    mounted() {
        this.getData()
        this.toDay = moment().locale("th").format("DD-MM-YYYY")
    },
    methods: {
        async getData() {
            const rs = await affiliateService.getUserFirstDeposit();
            this.listTable = rs.data
        },
        getClipboardBank() {
            this.$toast.info("คัดลอก เลขบัญชี สำเร็จแล้ว", {
                position: "top-right",
                timeout: 1500,
            });
        },
    },
};
</script>