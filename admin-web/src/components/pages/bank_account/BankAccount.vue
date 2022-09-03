<template>
<div id="bank">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title">
                <i class="fa fa-university" aria-hidden="true"></i> บัญชีธนาคาร
            </h4>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col">
                                <h3 class="card-title">ข้อมูลบัญชีธนาคาร</h3>
                            </div>
                            <div class="col">
                                <!-- <button
                    type="button"
                    class="btn btn-primary float-right"
                    data-toggle="modal"
                    data-target="#modalsettingSCBAPI"
                    @click.prevent="passUpdateStatusByUser(data)"
                  >
                    <i class="fa fa-cog" aria-hidden="true"></i> ตั้งค่า SCB API
                  </button> -->
                                <router-link to="add_bank_account">
                                    <button type="button" class="btn btn-secondary float-right mr-4 ml-4">
                                        <i class="fa fa-plus-circle fa-lg mr-2" aria-hidden="true"></i>
                                        เพิ่มบัญชีธนาคาร
                                    </button>
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="table-responsive">
                            <table id="basic-datatables" class="display table table-striped table-hover">
                                <thead style="text-align: center">
                                    <tr>
                                        <th>#</th>
                                        <!-- <th>Status System</th> -->
                                        <!-- <th>จัดการคิว</th> -->

                                        <th>เลขที่บัญชี</th>
                                        <th>ชื่อบัญชี</th>
                                        <th>ลำดับที่</th>
                                        <th>ชุดที่</th>

                                        <th>SMS</th>
                                        <th>สถานะ</th>
                                        <th>ประเภท</th>
                                        <th>ตัวเลือกการทำรายการ</th>
                                    </tr>
                                </thead>
                                <div></div>
                                <tbody style="text-align: center">
                                    <tr v-for="(data, index) in bank" v-bind:key="data.uuid">
                                        <td>{{ index + 1 }}</td>
                                        <!-- <td>
                        <div v-if="data.status_system == '1'">
                          <span class="badge badge-success">Online</span>
                        </div>
                        <div v-if="data.status_system == '0'">
                          <span class="badge badge-danger">Offline</span>
                        </div>
                      </td> -->
                                        <!-- <td>
                        <button
                          v-on:click.prevent="
                            selectStatus(data.uuid, data.status_system)
                          "
                          type="button"
                          class="btn btn-info btn-sm mr-1 text-white"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        >
                          <i class="fa fa-bolt" aria-hidden="true"></i>
                          system
                        </button>
                      </td> -->
                                        <!-- <td>

                      </td> -->
                                        <td>
                                            <div class="mt-3">
                                                <img :src="
                              require(`../../../assets/bank_icon/${data.bank_name.toLowerCase()}.png`)
                            " alt class="icon" width="40" />
                                                <div>
                                                    <b>
                                                        <a href="#/bankaccount" @click="getClipboard" v-clipboard:copy="data.bank_number">{{ data.bank_number }}</a></b>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{{ data.bank_account_name }}</td>
                                        <td>{{ data.account_sequence }}</td>
                                        <td>{{ data.account_set }}</td>

                                        <td>
                                            <div>
                                                <div v-if="data.bank_sms == '1'" v->
                                                    <span class="badge badge-success">
                                                        เปิดรับ SMS
                                                    </span>
                                                </div>
                                                <div v-if="data.bank_sms == '0'">
                                                    <span class="badge badge-danger"> ปิดรับ SMS</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div v-if="data.bank_status == '1'">
                                                <span class="badge badge-info">เปิดใช้งาน</span>
                                            </div>
                                            <div v-if="data.bank_status == '0'">
                                                <span class="badge badge-warning">ปิดใช้งาน</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div v-if="data.bank_type == '1'">
                                                <span class="badge badge-info">สำหรับฝาก</span>
                                            </div>
                                            <div v-if="data.bank_type == '2'">
                                                <span class="badge badge-warning">สำหรับถอน</span>
                                            </div>
                                        </td>

                                        <td>
                                            <button v-on:click.prevent="getBankbyuuid(data.uuid)" type="button" class="btn btn-info btn-sm mr-1 text-white" data-toggle="modal" data-target="#modelId">
                                                <i class="fas fa-edit"></i>

                                                แก้ไข
                                            </button>
                                            <button v-on:click.prevent="checkClicked(data.uuid)" class="btn btn-danger btn-sm mr-1 text-white">
                                                <i class="fas fa-trash-alt"></i>

                                                ลบ
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr v-if="bank.length == '0'">
                                        <td colspan="12" class="text-center text-danger">
                                            <i class="fas fa-times"></i>
                                            ไม่มีข้อมูล !
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">แก้ไขบัญชีธนาคาร</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div class="modal-body">
                                        <form v-on:submit.prevent="submitUpdate">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="bank_name" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                                                เลือกธนาคาร:
                                                                <span class="required-label">*</span>
                                                            </label>
                                                            <select class="form-control" name="bank_name" id="bank_name" v-model="form.bank_name" required>
                                                                <option selected disabled value>
                                                                    เลือก ธนาคาร
                                                                </option>
                                                                <option value="scb">ธนาคารไทยพาณิชย์</option>
                                                                <option value="kbnk">ธนาคารกสิกรไทย</option>
                                                                <option value="truemoney">
                                                                    Truemoney Wallet
                                                                </option>
                                                                <!-- 
                            <option value="ktba">ธนาคารกรุงไทย</option>
                            <option value="bay">ธนาคารกรุงศรีอยุธยา</option>
                            <option value="bbla">ธนาคารกรุงเทพ</option>
                            <option value="gsb">ธนาคารออมสิน</option>
                            <option value="promptpay">พร้อมเพย์</option>
                            <option value="tmb">ธนาคารทหารไทย</option>
                            <option value="truemoney">Truemoney Wallet</option>
                            <option value="BAAC">
                              ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร
                            </option>
                            <option value="ICBC">ธนาคารไอซีบีซี (ไทย)</option>
                            <option value="TCD">
                              ธนาคารไทยเครดิตเพื่อรายย่อย
                            </option>
                            <option value="CITI">ธนาคารซิตี้แบงก์</option>
                            <option value="SCBT">
                              ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย)
                            </option>
                            <option value="CIMB">ธนาคารซีไอเอ็มบีไทย</option>
                            <option value="UOB">ธนาคารยูโอบี</option>
                            <option value="HSBC">
                              ธนาคารเอชเอสบีซี ประเทศไทย
                            </option>
                            <option value="MIZUHO">
                              ธนาคารมิซูโฮ คอร์ปอเรต
                            </option>
                            <option value="GHB">ธนาคารอาคารสงเคราะห์</option>
                            <option value="LHBANK">
                              ธนาคารแลนด์ แอนด์ เฮ้าส์
                            </option>
                            <option value="TBANK">ธนาคารธนชาต</option>
                            <option value="TISCO">ธนาคารทิสโก้</option>
                            <option value="KKP">ธนาคารเกียรตินาคิน</option>
                            <option value="IBANK">
                              ธนาคารอิสลามแห่งประเทศไทย
                            </option> -->
                                                            </select>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="bank_number" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                                                เลขที่บัญชี :
                                                                <span class="required-label">*</span>
                                                            </label>
                                                            <input class="form-control" type="text" name="bank_number" id="bank_number" aria-describedby="helpId" placeholder="เลขที่บัญชี" value="bank_number" v-model="form.bank_number" required />
                                                        </div>

                                                        <div class="form-group row">
                                                            <label for="bank_name" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                                                ชื่อบัญชี:
                                                                <span class="required-label">*</span>
                                                            </label>
                                                            <input type="text" class="form-control" name="bank_account_name" id="bank_account_name" aria-describedby="helpId" value="bank_account_name" v-model="form.bank_account_name" required />
                                                        </div>

                                                        <div class="form-group row">
                                                            <label for="bank_number" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                                                USERNAME :
                                                                <span class="required-label">*</span>
                                                            </label>
                                                            <input class="form-control" type="text" name="USERNAME" id="USERNAME" aria-describedby="helpId" placeholder="USERNAME" value="USERNAME" v-model="form.username" required />
                                                        </div>

                                                        <div class="form-group row">
                                                            <label for="bank_number" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                                                PASSWORD :
                                                                <span class="required-label">*</span>
                                                            </label>
                                                            <input class="form-control" type="text" name="password" id="password" aria-describedby="helpId" placeholder="PASSWORD" v-model="form.password" required />
                                                        </div>
                                                        <!-- as? -->
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="bank_number" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                                                ลำดับที่ :
                                                                <span class="required-label">*</span>
                                                            </label>
                                                            <input class="form-control" type="number" name="account_sequence" id="account_sequence" aria-describedby="helpId" placeholder="ACCOUNT SEQUENCE" v-model="form.account_sequence" required />
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="bank_number" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                                                ชุดที่ :
                                                                <span class="required-label">*</span>
                                                            </label>
                                                            <input class="form-control" type="number" name="account_set" id="account_set" aria-describedby="helpId" placeholder="ACCOUNT SET" v-model="form.account_set" required />
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="bank_sms" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                                                SMS:
                                                                <span class="required-label">*</span>
                                                            </label>
                                                            <select class="form-control" name="bank_sms" id="bank_sms" v-model="form.bank_sms" required>
                                                                <option selected disabled value>
                                                                    เลือก สถานะ SMS
                                                                </option>
                                                                <option value="1">เปิดรับ SMS</option>
                                                                <option value="0">ปิดรับ SMS</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="bank_status" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                                                สถานะ:
                                                                <span class="required-label">*</span>
                                                            </label>
                                                            <select class="form-control" name="bank_status" id="bank_status" v-model="form.bank_status" required>
                                                                <option selected disabled value>
                                                                    เลือก สถานะ
                                                                </option>
                                                                <option value="1">เปิดใช้งาน</option>
                                                                <option value="0">ปิดใช้งาน</option>
                                                            </select>
                                                        </div>

                                                        <div class="form-group row">
                                                            <label for="bank_type" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                                                ประเภท:
                                                                <span class="required-label">*</span>
                                                            </label>
                                                            <select class="form-control" name="bank_type" id="bank_type" v-model="form.bank_type" required>
                                                                <option selected disabled value>
                                                                    เลือกประเภท
                                                                </option>

                                                                <option v-for="option in options" :value="option.id" v-bind:key="option.value">
                                                                    {{ option.type }}
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div v-if="form.bank_type === '1'" class="form-group row">
                                                            <label for="bank_type" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                                                                การฝาก:
                                                                <span class="required-label">*</span>
                                                            </label>
                                                            <select class="form-control" name="bank_type" id="bank_type" v-model="form.type_deposit" required>
                                                                <option selected disabled value>
                                                                    เลือกประเภทการฝาก
                                                                </option>

                                                                <option value="0">ฝากปกติ</option>
                                                                <option value="1">ฝากทศนิยม</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <button class="btn btn-primary float-right">
                                                        ยืนยัน
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">
                                        เลือก Status System
                                    </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <button id="myBtnonline" type="button" class="btn btn-success" v-on:click.prevent="checkOnline(uuid)">
                                                <i class="fa fa-globe" aria-hidden="true"></i>
                                                START
                                            </button>
                                        </div>
                                        <div class="col-md-4">
                                            <button id="myBtnoffline" type="button" class="btn btn-danger" v-on:click.prevent="checkOffline(uuid)">
                                                <i class="fa fa-power-off" aria-hidden="true"></i>
                                                STOP
                                            </button>
                                        </div>
                                        <div class="col-md-4">
                                            <button id="myBtnrestart" type="button" class="btn btn-info" v-on:click.prevent="checkRestart(uuid)">
                                                <i class="fas fa-sync-alt"></i>
                                                RESTART
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="forS6g = true" class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col">
                                <h3 class="card-title">SCB API</h3>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-primary float-right" data-toggle="modal" data-target="#ModalAddApp">
                                    <i class="fa fa-plus-circle fa-lg mr-2" aria-hidden="true"></i>
                                    เพิ่มแอปพลิเคชัน
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="table-responsive">
                            <table id="basic-datatables" class="display table table-striped table-hover">
                                <thead style="text-align: center">
                                    <tr>
                                        <th>#</th>
                                        <th>หมายเลขบัญชี</th>
                                        <th>สถานะ</th>
                                        <th>api_Key</th>
                                        <th>ชื่อบัญชี</th>
                                        <th>ชื่อธนาคาร</th>
                                        <th>หมายเลขอุปกรณ์</th>
                                        <!-- <th>username</th>
                      <th>password</th> -->
                                        <th>ประเภท</th>
                                        <th>ตัวเลือก</th>
                                    </tr>
                                </thead>
                                <div></div>
                                <tbody style="text-align: center">
                                    <tr v-for="(data, index) in appTable" v-bind:key="data.uuid">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ data.accountFrom }}</td>
                                        <td>
                                            <div @click.prevent="putUpdateStatus(data)">
                                                <div>
                                                    <label class="switch">
                                                        <input v-model="data.status" type="checkbox" />

                                                        <span class="slider round"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{{ data.api_Refresh }}</td>
                                        <td>{{ data.bank_account_name_app }}</td>
                                        <td>{{ data.bank_name_app }}</td>
                                        <td>{{ data.device_Id }}</td>
                                        <!-- <td>{{ data.username }}</td>
                      <td>{{ data.password }}</td> -->
                                        <td>
                                            <div v-if="data.status_type === 0" class="badge badge-info">
                                                ถอน
                                            </div>
                                            <div v-if="data.status_type === 1" class="badge badge-warning">
                                                ฝาก
                                            </div>
                                        </td>

                                        <td>
                                            <div>
                                                <button type="button" class="btn btn-info btn-sm ml-1 mr-1" data-toggle="modal" data-target="#ModalEditApp" @click.prevent="passEditAppData(data)">
                                                    <i class="fas fa-edit"></i>
                                                    แก้ไข
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr v-if="bank.length == '0'">
                                        <td colspan="12" class="text-center text-danger">
                                            <i class="fas fa-times"></i>
                                            ไม่มีข้อมูล !
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- addapp -->
        <div class="modal fade" id="ModalAddApp" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            เพิ่มข้อมูลแอปพลิเคชัน
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                     <form v-on:submit.prevent="postAppAPI">
                        <div class="modal-body">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card-body">
                                            <h4 class="card-title">api_Key</h4>
                                            <div class="form-group">
                                                <label for="api_Refresh"></label>
                                                <input v-model="formPostApp.api_Refresh" type="text" class="form-control" name="api_Refresh" id="api_Refresh" aria-describedby="helpId" placeholder="api_Key" />
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">หมายเลขอุปกรณ์</h4>
                                            <div class="form-group">
                                                <label for="device_Id"></label>
                                                <input v-model="formPostApp.device_Id" type="text" class="form-control" name="device_Id" id="device_Id" aria-describedby="helpId" placeholder="device_Id" />
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">หมายเลขบัญชี</h4>
                                            <div class="form-group">
                                                <label for="accountFrom"></label>
                                                <input v-model="formPostApp.accountFrom" type="text" class="form-control" name="accountFrom" id="accountFrom" aria-describedby="helpId" placeholder="accountFrom" />
                                            </div>
                                        </div>
                                        <div class="">
                                            <div class="card-body">
                                                <h4 class="card-title">สถานะ</h4>
                                                <div class="form-group">
                                                    <label for="status"></label>
                                                    <select class="form-control" name="status" id="status" v-model="formPostApp.status">
                                                        <option selected disabled value>
                                                            เลือก status
                                                        </option>
                                                        <option value="0">ปิด</option>
                                                        <option value="1">เปิด</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="">
                                            <div class="card-body">
                                                <h4 class="card-title">ประเภท</h4>
                                                <div class="form-group">
                                                    <label for="status_type"></label>
                                                    <select class="form-control" name="status_type" id="status_type" v-model="formPostApp.status_type">
                                                        <option selected disabled value>
                                                            เลือก status_type
                                                        </option>

                                                        <option value="0">ถอน</option>
                                                        <option value="1">ฝาก</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">ชื่อธนาคาร</h4>
                                            <div class="form-group">
                                                <label for="bank_name_app"></label>
                                                <input v-model="formPostApp.bank_name_app" type="text" class="form-control" name="bank_name_app" id="bank_name_app" aria-describedby="helpId" placeholder="bank_name_app" disabled />
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">ชื่อบัญชี</h4>
                                            <div class="form-group">
                                                <label for="bank_account_name_app"></label>
                                                <input v-model="formPostApp.bank_account_name_app" type="text" class="form-control" name="bank_account_name_app" id="bank_account_name_app" aria-describedby="helpId" placeholder="bank_account_name_app" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">
                                ปิด
                            </button>
                            <button type="submit" class="btn btn-success">
                                เพิ่มแอปพลิเคชัน
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- editapp -->
        <div class="modal fade" id="ModalEditApp" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">แก้ไขข้อมูลแอป</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form v-on:submit.prevent="putEditAppData">
                        <div class="modal-body">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card-body">
                                            <h4 class="card-title">api_Key</h4>
                                            <div class="form-group">
                                                <label for="api_Refresh"></label>
                                                <input v-model="formPostApp.api_Refresh" type="text" class="form-control" name="api_Refresh" id="api_Refresh" aria-describedby="helpId" placeholder="api_Key" />
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">หมายเลขอุปกรณ์</h4>
                                            <div class="form-group">
                                                <label for="device_Id"></label>
                                                <input v-model="formPostApp.device_Id" type="text" class="form-control" name="device_Id" id="device_Id" aria-describedby="helpId" placeholder="device_Id" />
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">หมายเลขบัญชี</h4>
                                            <div class="form-group">
                                                <label for="accountFrom"></label>
                                                <input v-model="formPostApp.accountFrom" type="text" class="form-control" name="accountFrom" id="accountFrom" aria-describedby="helpId" placeholder="accountFrom" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card-body">
                                            <h4 class="card-title">ประเภท</h4>
                                            <div class="form-group">
                                                <label for="status_type"></label>
                                                <select class="form-control" name="status_type" id="status_type" v-model="formPostApp.status_type">
                                                    <option selected disabled value>
                                                        เลือก status_type
                                                    </option>

                                                    <option value="0">ถอน</option>
                                                    <option value="1">ฝาก</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">ชื่อธนาคาร</h4>
                                            <div class="form-group">
                                                <label for="bank_name_app"></label>
                                                <input v-model="formPostApp.bank_name_app" type="text" class="form-control" name="bank_name_app" id="bank_name_app" aria-describedby="helpId" placeholder="bank_name_app" disabled />
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">ชื่อบัญชี</h4>
                                            <div class="form-group">
                                                <label for="bank_account_name_app"></label>
                                                <input v-model="formPostApp.bank_account_name_app" type="text" class="form-control" name="bank_account_name_app" id="bank_account_name_app" aria-describedby="helpId" placeholder="bank_account_name_app" />
                                            </div>
                                        </div>
                                        <!-- <div class="card-body">
                        <h4 class="card-title">username</h4>
                        <div class="form-group">
                          <label for="username"></label>
                          <input
                            v-model="formPostApp.username"
                            type="text"
                            class="form-control"
                            name="username"
                            id="username"
                            aria-describedby="helpId"
                            placeholder="username"
                          />
                        </div>
                      </div>
                      <div class="card-body">
                        <h4 class="card-title">password</h4>
                        <div class="form-group">
                          <label for="password"></label>
                          <input
                            v-model="formPostApp.password"
                            type="text"
                            class="form-control"
                            name="password"
                            id="password"
                            aria-describedby="helpId"
                            placeholder="password"
                          />
                        </div>
                      </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                ปิด
                            </button>
                            <button type="submit" class="btn btn-success">
                                บันทึกการแก้ไข
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- settingSCBAPI -->
        <div class="modal fade" id="modalsettingSCBAPI" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            ตั้งค่า SCB API
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-for="data in scbapiTable" v-bind:key="data.uuid">
                            <div v-if="data.status_type === 0" class="text-center mr-4 ml-4">
                                <span>ปิด/เปิด สำหรับบัญชีถอน</span>

                                <!-- @click.prevent="putUpdateStatus()"
                 v-model="formStatus.status" -->

                                <label class="switch mr-4 ml-4" @click.prevent="putUpdateStatus(data)">
                                    <input type="checkbox" v-model="data.status" />
                                    <span class="slider round"></span>
                                </label>

                                <br />
                                <br />
                            </div>
                            <br />

                            <div v-if="data.status_type === 1" class="text-center mr-4 ml-4">
                                <span>ปิด/เปิด สำหรับบัญชีฝาก</span>

                                <!-- @click.prevent="putUpdateStatus()"
                 v-model="formStatus.status" -->

                                <label class="switch mr-4 ml-4" @click.prevent="putUpdateStatus(data)">
                                    <input type="checkbox" v-model="data.status" />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">
                            ปิด
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// import router from "@/router";
import UserService from "@/services/UserService";

// import axios from "axios";
import bankService from "@/services/bankService.js";

export default {
    data() {
        return {
            forS6g: false,
            appTable: "",
            options: [{
                    id: 1,
                    value: 1,
                    type: "การฝาก"
                },
                {
                    id: 2,
                    value: 2,
                    type: "การถอน"
                },
            ],
            modalShow: true,
            status: {
                uuid: "",
                Online: "1",
                Offline: "0",
                restart: "1",
            },
            formPostApp: {
                api_Refresh: "",
                device_Id: "",
                accountFrom: "",
                bank_name_app: "SCB",
            },
            form: {
                username: "",
                password: "",
                account_sequence: "",
                account_set: "",
                type_deposit: "",
                bank_name: "",
                bank_account_name: "",
                bank_number: "",
                bank_status: "",
                bank_type: "",
                bank_sms: "",
            },
            username: "",
            password: "",
            account_sequence: "",
            account_set: "",
            formStatus: {
                status: "",
                uuid: "",
            },
            bank_name: "",
            bank_account_name: "",
            bank_number: "",
            bank_status: "",
            bank_type: "",
            bank_sms: "",
            status_system: "",
            bank: [],
            isOnline: true,
            isOffline: true,
            pause3sec: false,
            pausedFor5Seconds: false,
            scbapiTable: "",
        };
    },
    mounted() {
        this.bank = [];
        this.checkAuth();
        this.checkS6g();
        this.getBank();
    },
    methods: {
        async checkAuth() {
            const res = await UserService.getProfile().catch(function (error) {
                if (error.response.status === 401 || error.response.status === 500) {
                    const removeToken = localStorage.removeItem("access_token");
                    if (removeToken == null) {
                        this.$router.push("/login");
                    }
                }
            });
            this.forS6g = res.data.username;
            this.checkS6g(this.forS6g);
            // console.log( this.forS6g);
            res.logout;
        },

        async getBank() {
            this.bank = [];
            const res = await bankService.getBankList();
            this.bank = res.data.data;
        },

        checkS6g() {
            // console.log(data);
            if (this.forS6g === "super6") {
                console.log("AA");
                this.getAppAPI();
            }
        },

        async getAppAPI() {
            this.appTable = "";
            const res = await bankService.getAppBank();
            // console.log(res.data.data.status);
            this.appTable = res.data.data;
            this.formStatus.status = res.data.data.status;
            this.formStatus.uuid = res.data.data.uuid;
        },

        postAppAPI() {
            // console.log(this.formPostApp);
            const res = bankService
                .postAppBank(this.formPostApp)
                .then(async (response) => {
                    window.$("#ModalAddApp").modal("hide");
                    this.$toast.info(response.data.data, {
                        position: "top-right",
                        timeout: 4000,
                    });
                });
            res.postAppAPI;
            this.passUpdateStatusByUser();

            this.getAppAPI();
        },
        async putUpdateStatus(data) {
            // console.log(data);
            if (data.status == 0) {
                data.status = 1;
            } else {
                data.status = 0;
            }
            const form = {
                status: data.status,
            };
            const res = await bankService.putUpdateStatusApp(data.uuid, form);
            res.status;
            this.passUpdateStatusByUser();
            this.getAppAPI();
        },
        async passUpdateStatusByUser() {
            const res = await bankService.getStatusAppBank();

            // console.log(res.data.data);
            this.scbapiTable = res.data.data;
            // this.scbapiTable.status =res.data.data.status;
            // console.log(res.data.data[0].status);
            // const uuid = this.formStatus.uuid;
            // // console.log(this.formStatus);
            // if (this.formStatus.status == 0) {
            //   this.formStatus.status = 1;
            // } else {
            //   this.formStatus.status = 0;
            // }
            // const form = {
            //   status: this.formStatus.status,
            // };
            // const res = await bankService.putUpdateStatusApp(uuid, form);
            // res.status;
            // this.getAppAPI();
        },
        async passEditAppData(data) {
            console.log(data);
            this.formPostApp.accountFrom = data.accountFrom;
            this.formPostApp.api_Refresh = data.api_Refresh;
            this.formPostApp.device_Id = data.device_Id;
            this.formPostApp.uuid = data.uuid;
            this.formPostApp.bank_account_name_app = data.bank_account_name_app;
            this.formPostApp.bank_name_app = data.bank_name_app;
            this.formPostApp.status_type = data.status_type;
            this.formPostApp.password = data.password;

            // this.formPostApp.uuid = data.uuid;
            // return data
        },

        async putEditAppData() {
            const uuid = this.formPostApp.uuid;

            // console.log(this.formPostApp);
            const res = await bankService.putUpdateAppBank(uuid, this.formPostApp);
            // res.status;
            window.$("#ModalEditApp").modal("hide");
            this.$toast.info(res.data.data, {
                position: "top-right",
                timeout: 4000,
            });
            this.getAppAPI();
        },
        // async putOnline(uuid) {
        //   // console.log(uuid);
        //   const status_system = "1";
        //   const res = await bankService.systemStatus(uuid, status_system);
        //   this.bank = [];
        //   this.status = res;
        //   this.getBank();
        //   window.$("#exampleModal").modal("hide");

        //   this.getBank();
        //   document.getElementById("myBtnonline").disabled = true;
        //   setTimeout(function () {
        //     document.getElementById("myBtnonline").disabled = false;
        //   }, 5000);

        //   document.getElementById("myBtnoffline").disabled = true;
        //   setTimeout(function () {
        //     document.getElementById("myBtnoffline").disabled = false;
        //   }, 5000);
        //   document.getElementById("myBtnrestart").disabled = true;
        //   setTimeout(function () {
        //     document.getElementById("myBtnrestart").disabled = false;
        //   }, 5000);
        //   this.getBank();
        // },

        // async putOffline(uuid) {
        //   const status_system = "0";
        //   const res = await bankService.systemStatus(uuid, status_system);
        //   this.bank = [];
        //   this.getBank();
        //   this.status = res;
        //   this.getBank();
        //   window.$("#exampleModal").modal("hide");

        //   this.getBank();
        //   document.getElementById("myBtnonline").disabled = true;
        //   setTimeout(function () {
        //     document.getElementById("myBtnonline").disabled = false;
        //   }, 5000);

        //   document.getElementById("myBtnoffline").disabled = true;
        //   setTimeout(function () {
        //     document.getElementById("myBtnoffline").disabled = false;
        //   }, 5000);
        //   document.getElementById("myBtnrestart").disabled = true;
        //   setTimeout(function () {
        //     document.getElementById("myBtnrestart").disabled = false;
        //   }, 5000);
        // },

        // async putRestart(uuid) {
        //   const status_system = "1";

        //   const res = await bankService.systemStatus(uuid, status_system);
        //   this.status = res;
        //   this.getBank();
        //   window.$("#exampleModal").modal("hide");
        //   this.getBank();
        //   document.getElementById("myBtnonline").disabled = true;
        //   setTimeout(function () {
        //     document.getElementById("myBtnonline").disabled = false;
        //   }, 5000);

        //   document.getElementById("myBtnoffline").disabled = true;
        //   setTimeout(function () {
        //     document.getElementById("myBtnoffline").disabled = false;
        //   }, 5000);
        //   document.getElementById("myBtnrestart").disabled = true;
        //   setTimeout(function () {
        //     document.getElementById("myBtnrestart").disabled = false;
        //   }, 5000);
        //   this.getBank();
        // },
        async selectStatus(uuid) {
            const res = await bankService.bankEdit(uuid);
            this.uuid = res.data.data.uuid;
        },

        async deleteForm(uuid) {
            const res = await bankService.deleteBank(uuid);
            // const resbank = await bankService.getBankList();
            this.del = res;
            // this.bank = resbank.data.data;
            this.getBank();

            this.$toast.error("ลบบัญชี เรียบร้อยแล้ว", {
                position: "top-right",
                timeout: 1500,
                icon: true,
                rtl: false,
            });
        },

        async getBankbyuuid(uuid) {
            // console.log(uuid);
            const res = await bankService.bankEdit(uuid);
            this.status.uuid = res.data.data.uuid;

            this.form.uuid = res.data.data.uuid;
            this.form.bank_name = res.data.data.bank_name;
            this.form.bank_account_name = res.data.data.bank_account_name;
            this.form.bank_number = res.data.data.bank_number;
            this.form.bank_status = res.data.data.bank_status;
            this.form.bank_type = res.data.data.bank_type;
            this.form.status_system = res.data.data.status_system;
            this.form.bank_sms = res.data.data.bank_sms;
            this.form.type_deposit = res.data.data.type_deposit;
            this.form.username = res.data.data.username;
            this.form.password = res.data.data.password;
            this.form.account_sequence = res.data.data.account_sequence;
            this.form.account_set = res.data.data.account_set;
        },

        async submitUpdate() {
            const uuid = this.form.uuid;
            // console.log(this.form);
            // console.log(form);
            // console.log(this.form);
            // axios
            //   .put(url + "/" + uuid, this.form, {
            //     headers: {
            //       "Content-Type": "application/json",
            //       Authorization: "Bearer " + localStorage.getItem("access_token"),
            //     },
            //   })
            this.res = await bankService
                .submitForm(uuid, this.form)
                .then(() => {
                    this.bank = [];
                    window.$("#modelId").modal("hide");

                    this.getBank();
                    // this.modalShow = false;

                    // this.$router.push("/bankaccount");
                    this.$toast.success("เรียบร้อยแล้ว", {
                        position: "top-right",
                        timeout: 1500,
                        icon: true,
                        rtl: false,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.$toast.error("ไม่ถูกต้อง", {
                        position: "top-right",
                        timeout: 1500,
                        icon: true,
                        rtl: false,
                    });
                })
                .finally(() => {});
        },
        checkClicked(uuid) {
            // this.bank = [];

            this.$confirm("ยืนยันการลบ?").then(() => {
                this.deleteForm(uuid);
                this.getBank();

                // this.$router.push("/bankaccount");
            });
        },

        checkUpdate() {
            this.$confirm("ยืนยันการแก้ไข?").then(() => {
                this.submitUpdate();
                // router.push("/bankaccount");
            });
        },
        getClipboard() {
            this.$toast.success("คัดลอก เลขที่บัญชี	 สำเร็จแล้ว", {
                position: "top-right",
                timeout: 1500,
            });
        },
        // checkOnline(uuid) {
        //   this.$confirm("ยืนยันการเปลี่ยนแปลง?").then(() => {
        //     this.putOnline(uuid);
        //     // router.push("/bankaccount");
        //   });
        // },
        // checkOffline(uuid) {
        //   this.$confirm("ยืนยันการเปลี่ยนแปลง?").then(() => {
        //     this.putOffline(uuid);
        //     // router.push("/bankaccount");
        //   });
        // },
        // checkRestart(uuid) {
        //   this.$confirm("ยืนยันการเปลี่ยนแปลง?").then(() => {
        //     this.putRestart(uuid);
        //     // router.push("/bankaccount");
        //   });
        // },
    },
};
</script>
