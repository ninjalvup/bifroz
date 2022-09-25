<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-12"
            >
                <nav aria-label="breadcrumb"

                >
                    <ol class="breadcrumb rounded"
                    style="background-color: rgb(27, 27, 27);"
                    >
                        <li class="breadcrumb-item"><router-link to="/home">หนัาหลัก</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">สมาชิก</li>
                    </ol>
                </nav>
            </div>
        </div>
        <sharetap />
        <div class="row mt-2 justify-content-center">
            <div class="col-md-12">
                <div class="card border-0 rounded"

                style="background-color: rgb(27, 27, 27);"
                >
                    <div class="card-body rounded">
                        <div class="body genealogy-body genealogy-scroll">
                            <div class="genealogy-tree" id="showUserTree">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sharetap from "../sharedLink/sharetap";
import userTreeService from "@/services/userTree";

export default {
    components: {
    sharetap,
  },
    data() {
        return {

        };
    },
    mounted() {
        this.userTree();
    },
    methods: {
        async userTree() {
            let number = "data-v-1807aef7";
            const rs1 = await userTreeService.getSearchTree();
            let html = `
                <ul ${ number }><li ${ number }>
                    <a href="#" ${ number }>
                        <div class="member-view-box" ${ number }>
                            <div class="member-image" ${ number }>
                            <img src="assets/images/icons/user.svg" ${ number }>
                            <div class="member-details" ${ number }><span ${ number }>${ rs1.userLogin }</span></div>
                            </div>
                        </div>
                    </a>`
                    
                    html += `<ul class="active" ${ number }>` // start LV 1
                    for (let i=0; i < rs1.data.length; i++) {
                        html += `<li ${ number }>
                                    <a href="#" ${ number }>
                                        <div class="member-view-box" ${ number }>
                                            <div class="member-image" ${ number }>
                                                <img src="assets/images/icons/user.svg" ${ number }>
                                                <div class="member-details" ${ number }><span ${ number }>${ rs1.data[i].sb_username }</span></div>
                                            </div>
                                        </div>
                                    </a>`

                                    if (rs1.data[i].total > 0) {
                                        html += `<ul ${ number }>` // start LV 2
                                        const rs2 = await userTreeService.getSearchTreeUUID(rs1.data[i].uuid); // LV 2
                                        for (let j=0; j < rs2.data.length; j++) {
                                            html += `<li ${ number }>
                                                        <a href="#" ${ number }>
                                                            <div class="member-view-box" ${ number }>
                                                                <div class="member-image" ${ number }>
                                                                    <img src="assets/images/icons/user.svg" ${ number }>
                                                                    <div class="member-details" ${ number }><span ${ number }>${ rs2.data[j].sb_username }</span></div>
                                                                </div>
                                                            </div>
                                                        </a>`

                                                        if (rs2.data[j].total > 0) {
                                                            html += `<ul ${ number }>` // start LV 3
                                                            const rs3 = await userTreeService.getSearchTreeUUID(rs2.data[j].uuid); // LV 3
                                                            for (let k=0; k < rs3.data.length; k++) {
                                                                html += `<li ${ number }>
                                                                            <a href="#" ${ number }>
                                                                                <div class="member-view-box" ${ number }>
                                                                                    <div class="member-image" ${ number }>
                                                                                        <img src="assets/images/icons/user.svg" ${ number }>
                                                                                        <div class="member-details" ${ number }><span ${ number }>${ rs3.data[k].sb_username }</span></div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>`

                                                                        if (rs3.data[k].total > 0) {
                                                                            html += `<ul ${ number }>` // start LV 4
                                                                            const rs4 = await userTreeService.getSearchTreeUUID(rs3.data[k].uuid); // LV 4
                                                                            for (let l=0; l < rs4.data.length; l++) {
                                                                                html += `<li ${ number }>
                                                                                            <a href="#" ${ number }>
                                                                                                <div class="member-view-box" ${ number }>
                                                                                                    <div class="member-image" ${ number }>
                                                                                                        <img src="assets/images/icons/user.svg" ${ number }>
                                                                                                        <div class="member-details" ${ number }><span ${ number }>${ rs4.data[l].sb_username }</span></div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>`

                                                                                            if (rs4.data[l].total > 0) {
                                                                                                html += `<ul ${ number }>` // start LV 5
                                                                                                const rs5 = await userTreeService.getSearchTreeUUID(rs4.data[l].uuid); // LV 5
                                                                                                for (let m=0; m < rs5.data.length; m++) {
                                                                                                    html += `<li ${ number }>
                                                                                                                <a href="#" ${ number }>
                                                                                                                    <div class="member-view-box" ${ number }>
                                                                                                                        <div class="member-image" ${ number }>
                                                                                                                            <img src="assets/images/icons/user.svg" ${ number }>
                                                                                                                            <div class="member-details" ${ number }><span ${ number }>${ rs5.data[m].sb_username }</span></div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </a>`

                                                                                                                if (rs5.data[m].total > 0) {
                                                                                                                    html += `<ul ${ number }>` // start LV 6
                                                                                                                    const rs6 = await userTreeService.getSearchTreeUUID(rs5.data[m].uuid); // LV 6
                                                                                                                    for (let n=0; n < rs6.data.length; n++) {
                                                                                                                        html += `<li ${ number }>
                                                                                                                                    <a href="#" ${ number }>
                                                                                                                                        <div class="member-view-box" ${ number }>
                                                                                                                                            <div class="member-image" ${ number }>
                                                                                                                                                <img src="assets/images/icons/user.svg" ${ number }>
                                                                                                                                                <div class="member-details" ${ number }><span ${ number }>${ rs6.data[n].sb_username }</span></div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </a>`

                                                                                                                                    if (rs6.data[n].total > 0) {
                                                                                                                                        html += `<ul ${ number }>` // start LV 7
                                                                                                                                        const rs7 = await userTreeService.getSearchTreeUUID(rs6.data[n].uuid); // LV 7
                                                                                                                                        for (let o=0; o < rs7.data.length; o++) {
                                                                                                                                            html += `<li ${ number }>
                                                                                                                                                        <a href="#" ${ number }>
                                                                                                                                                            <div class="member-view-box" ${ number }>
                                                                                                                                                                <div class="member-image" ${ number }>
                                                                                                                                                                    <img src="assets/images/icons/user.svg" ${ number }>
                                                                                                                                                                    <div class="member-details" ${ number }><span ${ number }>${ rs7.data[o].sb_username }</span></div>
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                        </a>`

                                                                                                                                                        if (rs7.data[o].total > 0) {
                                                                                                                                                            html += `<ul ${ number }>` // start LV 8
                                                                                                                                                            const rs8 = await userTreeService.getSearchTreeUUID(rs7.data[o].uuid); // LV 8
                                                                                                                                                            for (let p=0; p < rs8.data.length; p++) {
                                                                                                                                                                html += `<li ${ number }>
                                                                                                                                                                            <a href="#" ${ number }>
                                                                                                                                                                                <div class="member-view-box" ${ number }>
                                                                                                                                                                                    <div class="member-image" ${ number }>
                                                                                                                                                                                        <img src="assets/images/icons/user.svg" ${ number }>
                                                                                                                                                                                        <div class="member-details" ${ number }><span ${ number }>${ rs8.data[p].sb_username }</span></div>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                            </a>`

                                                                                                                                                                            if (rs8.data[p].total > 0) {
                                                                                                                                                                                html += `<ul ${ number }>` // start LV 9
                                                                                                                                                                                const rs9 = await userTreeService.getSearchTreeUUID(rs8.data[p].uuid); // LV 9
                                                                                                                                                                                for (let q=0; q < rs9.data.length; q++) {
                                                                                                                                                                                    html += `<li ${ number }>
                                                                                                                                                                                                <a href="#" ${ number }>
                                                                                                                                                                                                    <div class="member-view-box" ${ number }>
                                                                                                                                                                                                        <div class="member-image" ${ number }>
                                                                                                                                                                                                            <img src="assets/images/icons/user.svg" ${ number }>
                                                                                                                                                                                                            <div class="member-details" ${ number }><span ${ number }>${ rs9.data[q].sb_username }</span></div>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                </a>`

                                                                                                                                                                                                if (rs9.data[q].total > 0) {
                                                                                                                                                                                                    html += `<ul ${ number }>` // start LV 10
                                                                                                                                                                                                    const rs10 = await userTreeService.getSearchTreeUUID(rs9.data[q].uuid); // LV 10
                                                                                                                                                                                                    for (let r=0; r < rs10.data.length; r++) {
                                                                                                                                                                                                        html += `<li ${ number }>
                                                                                                                                                                                                                    <a href="#" ${ number }>
                                                                                                                                                                                                                        <div class="member-view-box" ${ number }>
                                                                                                                                                                                                                            <div class="member-image" ${ number }>
                                                                                                                                                                                                                                <img src="assets/images/icons/user.svg" ${ number }>
                                                                                                                                                                                                                                <div class="member-details" ${ number }><span ${ number }>${ rs10.data[r].sb_username }</span></div>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                    </a>`
                                                                                                                                                                                                        html += `</li>` // end LV 10
                                                                                                                                                                                                    }
                                                                                                                                                                                                    html += `</ul>` // end LV 10
                                                                                                                                                                                                }

                                                                                                                                                                                    html += `</li>` // end LV 9
                                                                                                                                                                                }
                                                                                                                                                                                html += `</ul>` // end LV 9
                                                                                                                                                                            }

                                                                                                                                                                html += `</li>` // end LV 8
                                                                                                                                                            }
                                                                                                                                                            html += `</ul>` // end LV 8
                                                                                                                                                        }

                                                                                                                                            html += `</li>` // end LV 7
                                                                                                                                        }
                                                                                                                                        html += `</ul>` // end LV 7
                                                                                                                                    }

                                                                                                                        html += `</li>` // end LV 6
                                                                                                                    }
                                                                                                                    html += `</ul>` // end LV 6
                                                                                                                }

                                                                                                    html += `</li>` // end LV 5
                                                                                                }
                                                                                                html += `</ul>` // end LV 5
                                                                                            }

                                                                                html += `</li>` // end LV 4
                                                                            }
                                                                            html += `</ul>` // end LV 4
                                                                        }

                                                                html += `</li>` // end LV 3
                                                            }
                                                            html += `</ul>` // end LV 3
                                                        }

                                            html += `</li>` // end LV 2
                                        }
                                        html += `</ul>` // end LV 2
                                    }

                        html += `</li>` // end LV 1
                    }
                    html += `</ul>` // end LV 1

                html += `</li></ul>` // end main ul

            document.getElementById("showUserTree").innerHTML = html
        } // async userTree()
    }
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
    color: wheat;
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
    width: 30px;
    height: 30px;
    border-radius: 6px;
    background-color :#000;
    z-index: 1;
}

</style>
<style scoped>
* {
  color: wheat !important;
  font-weight: 700 !important;
}
.rounded {
    border-radius: 1.25rem !important;
}
</style>