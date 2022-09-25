<template>
  <div id="app">
    <header class="main-header"
    style="background-color: rgb(58, 63, 72) !important; color: white !important;"
    
    >
      <!-- Logo Header -->
      <div class="logo-header"
      style="
    background-color: #3a3f48 !important;
    color: white !important;
"
      
      >
        <a class="logo">
          <img
            src="../../assets/SUPERFASTHEADER.png"
            alt="navbar brand"
            class="navbar-brand mr-2"
            width="91%"
          /><b class="text-white"></b>
        </a>
        <button
          class="navbar-toggler sidenav-toggler ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <i class="icon-menu"></i>
          </span>
        </button>
        <button class="topbar-toggler more">
          <i class="icon-options-vertical"></i>
        </button>
        <div class="nav-toggle">
          <button class="btn btn-toggle toggle-sidebar">
            <i class="icon-menu"></i>
          </button>
        </div>
      </div>

      <nav
        class="navbar navbar-header navbar-expand-lg"
        
      >
        <div class="container-fluid">
          <ul class="navbar-nav topbar-nav ml-md-auto align-items-center">
            <router-link to="user">
              <div>
                <h6 class="mr-4" style="color: white">
                  <span>สมัครสำเร็จ </span>
                  <span class="badge badge-pill badge-danger">{{
                    member.length
                  }}</span>
                </h6>
              </div>
            </router-link>


            <router-link to="home">
              <div>
                <h6 class="mr-4" style="color: white">
                  <span>ฝากไม่สำเร็จ </span>
                  <span class="badge badge-pill badge-danger">{{
                    smstable.length
                  }}</span>
                </h6>
              </div>
            </router-link>


            <router-link to="withdrawpending">

              <div>
                <h6 class="mr-4" style="color: white">
                  <span>แจ้งถอนเงิน </span>
                  <span class="badge badge-pill badge-danger">{{
                    withdrawpending.length
                  }}</span>
                </h6>
              </div>
            </router-link>

            <div style="font-size: 25px" class="row">
              <div>
                <h6 class="mr-4" style="color: white">
                  <img
                    height="35px"
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDgwIDQ4MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDgwIDQ4MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0VGRUNFODsiIGQ9Ik0yNDAsOEMxMTEuODcyLDgsOCwxMTEuODcyLDgsMjQwYzAsNTYuMjU2LDIwLjAzMiwxMDcuODI0LDUzLjMzNiwxNDcuOTkyDQoJYzE1LjUxMi02My4xNzYsNjMuNjg4LTExMy4zODQsMTI1LjU1Mi0xMzIuMDRDMTYxLjA0OCwyMzguNzQ0LDE0NCwyMDkuMzc2LDE0NCwxNzZjMC01My4wMTYsNDIuOTg0LTk2LDk2LTk2czk2LDQyLjk4NCw5Niw5Ng0KCWMwLDMzLjM3Ni0xNy4wNDgsNjIuNzQ0LTQyLjg5Niw3OS45NTJjNjEuODY0LDE4LjY1NiwxMTAuMDQsNjguODY0LDEyNS41NTIsMTMyLjA0QzQ1MS45NjgsMzQ3LjgyNCw0NzIsMjk2LjI1Niw0NzIsMjQwDQoJQzQ3MiwxMTEuODcyLDM2OC4xMjgsOCwyNDAsOHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNDNkMzQkQ7IiBkPSJNMjkzLjEwNCwyNTUuOTUyQzMxOC45NTIsMjM4Ljc0NCwzMzYsMjA5LjM3NiwzMzYsMTc2YzAtNTMuMDE2LTQyLjk4NC05Ni05Ni05NnMtOTYsNDIuOTg0LTk2LDk2DQoJYzAsMzMuMzc2LDE3LjA0OCw2Mi43NDQsNDIuODk2LDc5Ljk1MmMtNjEuODY0LDE4LjY1Ni0xMTAuMDQsNjguODY0LTEyNS41NTIsMTMyLjA0YzAsMCwwLDAuMDA4LDAuMDA4LDAuMDA4DQoJYzIuNTI4LDMuMDQ4LDUuMTUyLDYuMDI0LDcuODMyLDguOTQ0YzAuNjQ4LDAuNzEyLDEuMzI4LDEuMzkyLDEuOTkyLDIuMDg4YzIuMDY0LDIuMTkyLDQuMTUyLDQuMzUyLDYuMjk2LDYuNDY0DQoJYzAuODg4LDAuODcyLDEuNzkyLDEuNzEyLDIuNjk2LDIuNTY4YzEuOTg0LDEuODg4LDMuOTkyLDMuNzUyLDYuMDQsNS41NjhjMS4wMTYsMC44OTYsMi4wNDgsMS43ODQsMy4wNzIsMi42NjQNCgljMi4wMDgsMS43Miw0LjA0LDMuNDA4LDYuMTEyLDUuMDU2YzEuMDg4LDAuODcyLDIuMTg0LDEuNzI4LDMuMjgsMi41ODRjMi4wOTYsMS42MTYsNC4yMjQsMy4xODQsNi4zNzYsNC43Mg0KCWMxLjExMiwwLjc5MiwyLjIwOCwxLjYsMy4zMzYsMi4zNzZjMi4yNzIsMS41NjgsNC41ODQsMy4wNzIsNi45MTIsNC41NmMxLjA0OCwwLjY2NCwyLjA3MiwxLjM1MiwzLjEyOCwyLjAwOA0KCWMyLjY4OCwxLjY1Niw1LjQyNCwzLjI0LDguMTg0LDQuNzkyYzAuNzI4LDAuNDA4LDEuNDQsMC44NDgsMi4xNzYsMS4yNDhjMy41NjgsMS45NTIsNy4xOTIsMy44MjQsMTAuODcyLDUuNTkyDQoJYzAuMDg4LDAuMDQsMC4xODQsMC4wOCwwLjI3MiwwLjEyYzMuNTEyLDEuNjgsNy4wOCwzLjI3MiwxMC42ODgsNC43NzZjMS4xMiwwLjQ3MiwyLjI2NCwwLjg4OCwzLjM5MiwxLjMzNg0KCWMyLjYwOCwxLjA0LDUuMjE2LDIuMDY0LDcuODcyLDMuMDA4YzEuNDA4LDAuNTA0LDIuODMyLDAuOTYsNC4yNDgsMS40NGMyLjQxNiwwLjgxNiw0Ljg0OCwxLjYwOCw3LjI5NiwyLjMzNg0KCWMxLjU1MiwwLjQ2NCwzLjExMiwwLjg5Niw0LjY4LDEuMzI4YzIuMzY4LDAuNjU2LDQuNzUyLDEuMjgsNy4xNiwxLjg2NGMxLjYyNCwwLjM5MiwzLjI1NiwwLjc2OCw0Ljg5NiwxLjEyOA0KCWMyLjQwOCwwLjUyOCw0LjgyNCwxLjAwOCw3LjI1NiwxLjQ1NmMxLjY0OCwwLjMwNCwzLjI4OCwwLjYxNiw0Ljk1MiwwLjg4YzIuNTEyLDAuNDA4LDUuMDQsMC43NTIsNy41NzYsMS4wOA0KCWMxLjYsMC4yMDgsMy4xOTIsMC40NCw0LjgsMC42MDhjMi44LDAuMzA0LDUuNjI0LDAuNTIsOC40NDgsMC43MmMxLjM2OCwwLjA5NiwyLjcyLDAuMjQsNC4wODgsMC4zMTINCgljNC4yMTYsMC4yNCw4LjQ0OCwwLjM3NiwxMi43MiwwLjM3NnM4LjUwNC0wLjEzNiwxMi43Mi0wLjM2YzEuMzY4LTAuMDcyLDIuNzI4LTAuMjE2LDQuMDg4LTAuMzEyYzIuODMyLTAuMiw1LjY1Ni0wLjQxNiw4LjQ0OC0wLjcyDQoJYzEuNjA4LTAuMTc2LDMuMi0wLjQsNC44LTAuNjA4YzIuNTM2LTAuMzI4LDUuMDY0LTAuNjcyLDcuNTc2LTEuMDhjMS42NTYtMC4yNzIsMy4zMDQtMC41NzYsNC45NTItMC44OA0KCWMyLjQzMi0wLjQ0OCw0Ljg1Ni0wLjkyOCw3LjI1Ni0xLjQ1NmMxLjY0LTAuMzYsMy4yNzItMC43MzYsNC44OTYtMS4xMjhjMi40LTAuNTg0LDQuNzg0LTEuMjA4LDcuMTYtMS44NjQNCgljMS41Ni0wLjQzMiwzLjEyOC0wLjg2NCw0LjY4LTEuMzI4YzIuNDU2LTAuNzM2LDQuODgtMS41MjgsNy4yOTYtMi4zMzZjMS40MTYtMC40OCwyLjg0OC0wLjkzNiw0LjI0OC0xLjQ0DQoJYzIuNjQ4LTAuOTUyLDUuMjY0LTEuOTY4LDcuODcyLTMuMDA4YzEuMTI4LTAuNDQ4LDIuMjcyLTAuODcyLDMuMzkyLTEuMzM2YzMuNTkyLTEuNTA0LDcuMTQ0LTMuMDgsMTAuNjQtNC43Ng0KCWMwLjEwNC0wLjA0OCwwLjIxNi0wLjA5NiwwLjMyLTAuMTQ0YzMuNjgtMS43NjgsNy4zMDQtMy42NCwxMC44NzItNS41OTJjMC43MzYtMC40LDEuNDQ4LTAuODQsMi4xNzYtMS4yNDgNCgljMi43Ni0xLjU1Miw1LjQ5Ni0zLjEzNiw4LjE4NC00Ljc5MmMxLjA1Ni0wLjY0OCwyLjA4OC0xLjMzNiwzLjEyOC0yLjAwOGMyLjMyOC0xLjQ4OCw0LjY0LTMsNi45MTItNC41Ng0KCWMxLjEyLTAuNzc2LDIuMjI0LTEuNTc2LDMuMzM2LTIuMzc2YzIuMTUyLTEuNTQ0LDQuMjgtMy4xMTIsNi4zNzYtNC43MmMxLjEwNC0wLjg0OCwyLjE5Mi0xLjcxMiwzLjI4LTIuNTg0DQoJYzIuMDY0LTEuNjQ4LDQuMTA0LTMuMzM2LDYuMTEyLTUuMDU2YzEuMDMyLTAuODgsMi4wNjQtMS43NjgsMy4wNzItMi42NjRjMi4wNDgtMS44MTYsNC4wNTYtMy42OCw2LjA0LTUuNTY4DQoJYzAuODk2LTAuODU2LDEuODA4LTEuNzA0LDIuNjk2LTIuNTY4YzIuMTQ0LTIuMTEyLDQuMjQtNC4yNzIsNi4yOTYtNi40NjRjMC42NTYtMC43MDQsMS4zMzYtMS4zODQsMS45OTItMi4wODgNCgljMi42OC0yLjkyLDUuMzA0LTUuODk2LDcuODMyLTguOTQ0YzAsMCwwLTAuMDA4LDAuMDA4LTAuMDA4QzQwMy4xNTIsMzI0LjgxNiwzNTQuOTc2LDI3NC42LDI5My4xMDQsMjU1Ljk1MnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiM0QjQxM0E7IiBkPSJNMjQwLDBDMTA3LjY2NCwwLDAsMTA3LjY2NCwwLDI0MGMwLDU3Ljk2LDIwLjY1NiwxMTEuMTg0LDU0Ljk5MiwxNTIuNzA0DQoJYzAuMDg4LDAuMTIsMC4wOTYsMC4yNzIsMC4xOTIsMC4zODRjMjQuNzkyLDI5Ljg5Niw1NS45MjgsNTIuODE2LDkwLjYyNCw2Ny42MjRjMC40LDAuMTY4LDAuNzkyLDAuMzUyLDEuMTkyLDAuNTINCgljMi44MDgsMS4xODQsNS42NDgsMi4yOCw4LjQ5NiwzLjM1MmMxLjEyLDAuNDI0LDIuMjQsMC44NTYsMy4zNzYsMS4yNjRjMi40NTYsMC44OCw0LjkyOCwxLjcxMiw3LjQxNiwyLjUxMg0KCWMxLjU5MiwwLjUxMiwzLjE4NCwxLjAxNiw0Ljc5MiwxLjQ5NmMyLjIsMC42NTYsNC40MDgsMS4yODgsNi42MzIsMS44ODhjMS45NTIsMC41MjgsMy45MiwxLjAxNiw1Ljg4OCwxLjQ4OA0KCWMxLjk5MiwwLjQ4LDMuOTkyLDAuOTYsNiwxLjM4NGMyLjI0LDAuNDgsNC41MDQsMC45MDQsNi43NzYsMS4zMmMxLjgyNCwwLjMzNiwzLjY0LDAuNjg4LDUuNDgsMC45ODQNCgljMi41MiwwLjQwOCw1LjA1NiwwLjcyOCw3LjYsMS4wNTZjMS42NCwwLjIwOCwzLjI3MiwwLjQ0OCw0LjkyLDAuNjI0YzIuODgsMC4zMDQsNS43ODQsMC41Miw4LjY5NiwwLjcyDQoJYzEuMzUyLDAuMDk2LDIuNjk2LDAuMjQsNC4wNTYsMC4zMTJjNC4yNDgsMC4yNCw4LjU0NCwwLjM2OCwxMi44NzIsMC4zNjhzOC42MjQtMC4xMjgsMTIuODg4LTAuMzUyDQoJYzEuMzYtMC4wNzIsMi43MDQtMC4yMTYsNC4wNTYtMC4zMTJjMi45MTItMC4yMDgsNS44MTYtMC40MTYsOC42OTYtMC43MmMxLjY0OC0wLjE3NiwzLjI4LTAuNDE2LDQuOTItMC42MjQNCgljMi41NDQtMC4zMjgsNS4wOC0wLjY0OCw3LjYtMS4wNTZjMS44MzItMC4yOTYsMy42NTYtMC42NDgsNS40OC0wLjk4NGMyLjI2NC0wLjQxNiw0LjUyOC0wLjg0LDYuNzc2LTEuMzINCgljMi4wMDgtMC40MzIsNC0wLjkwNCw2LTEuMzg0YzEuOTY4LTAuNDgsMy45MzYtMC45NjgsNS44ODgtMS40ODhjMi4yMjQtMC41OTIsNC40MzItMS4yMzIsNi42MzItMS44ODgNCgljMS42MDgtMC40OCwzLjItMC45ODQsNC43OTItMS40OTZjMi40ODgtMC44LDQuOTYtMS42MzIsNy40MTYtMi41MTJjMS4xMjgtMC40MDgsMi4yNDgtMC44NCwzLjM3Ni0xLjI2NA0KCWMyLjg1Ni0xLjA3Miw1LjY4OC0yLjE3Niw4LjQ5Ni0zLjM1MmMwLjQtMC4xNjgsMC43OTItMC4zNTIsMS4xOTItMC41MmMzNC42ODgtMTQuODA4LDY1LjgzMi0zNy43MjgsOTAuNjI0LTY3LjYyNA0KCWMwLjA5Ni0wLjExMiwwLjEwNC0wLjI3MiwwLjE5Mi0wLjM4NEM0NTkuMzQ0LDM1MS4xODQsNDgwLDI5Ny45Niw0ODAsMjQwQzQ4MCwxMDcuNjY0LDM3Mi4zMzYsMCwyNDAsMHogTTI4Ny44NzIsMjQ5LjczNg0KCWMtMy4xNTIsMi4wNDgtNi40MzIsMy44OC05LjgsNS40OGMtMC40LDAuMTkyLTAuNzkyLDAuMzkyLTEuMTkyLDAuNTc2Yy0yMy4xNjgsMTAuNTM2LTUwLjU5MiwxMC41MzYtNzMuNzYsMA0KCWMtMC40LTAuMTg0LTAuOC0wLjM4NC0xLjE5Mi0wLjU3NmMtMy4zNzYtMS42LTYuNjQ4LTMuNDMyLTkuOC01LjQ4QzE2OC4wMDgsMjM0LjAyNCwxNTIsMjA2Ljg2NCwxNTIsMTc2YzAtNDguNTIsMzkuNDgtODgsODgtODgNCglzODgsMzkuNDgsODgsODhDMzI4LDIwNi44NjQsMzExLjk5MiwyMzQuMDI0LDI4Ny44NzIsMjQ5LjczNnogTTE4OS4xNTIsMjY2LjYzMmMwLjY3MiwwLjM3NiwxLjMzNiwwLjc3NiwyLjAxNiwxLjEzNg0KCWMyLjM4NCwxLjI2NCw0LjgsMi40NDgsNy4yNzIsMy41MTJjMS44OTYsMC44MzIsMy44NTYsMS41MzYsNS44MDgsMi4yNTZjMC4zODQsMC4xMzYsMC43NjgsMC4yODgsMS4xNTIsMC40MjQNCgljMTAuODQ4LDMuODQsMjIuNDU2LDYuMDQsMzQuNiw2LjA0YzEyLjE0NCwwLDIzLjc1Mi0yLjIsMzQuNTkyLTYuMDRjMC4zODQtMC4xMzYsMC43NjgtMC4yODgsMS4xNTItMC40MjQNCgljMS45NTItMC43MiwzLjkxMi0xLjQyNCw1LjgwOC0yLjI1NmMyLjQ3Mi0xLjA2NCw0Ljg4OC0yLjI0OCw3LjI3Mi0zLjUxMmMwLjY4LTAuMzY4LDEuMzQ0LTAuNzYsMi4wMTYtMS4xMzYNCgljMS4xNDQtMC42NCwyLjMxMi0xLjI0OCwzLjQzMi0xLjkzNmM1Ni4zMiwxOC4yNzIsMTAwLjA4OCw2NC4xNzYsMTE1LjU2LDEyMS4xMTJjLTIwLjAwOCwyMy4yNzItNDQuNjY0LDQyLjQ0LTcyLjU3Niw1NS45NTINCgljLTAuMTIsMC4wNTYtMC4yMzIsMC4xMi0wLjM1MiwwLjE3NmMtMi44NTYsMS4zNzYtNS43NiwyLjY3Mi04LjY4OCwzLjkzNmMtMC42NjQsMC4yOC0xLjMyLDAuNTY4LTEuOTg0LDAuODQ4DQoJYy0yLjU2LDEuMDcyLTUuMTUyLDIuMDg4LTcuNzYsMy4wNjRjLTEuMDg4LDAuNDA4LTIuMTc2LDAuODA4LTMuMjcyLDEuMTkyYy0yLjMxMiwwLjgyNC00LjYzMiwxLjYxNi02Ljk3NiwyLjM2OA0KCWMtMS40NTYsMC40NjQtMi45MiwwLjkwNC00LjM4NCwxLjMzNmMtMi4wOCwwLjYyNC00LjE2OCwxLjIyNC02LjI4LDEuNzg0Yy0xLjc3NiwwLjQ3Mi0zLjU2OCwwLjkwNC01LjM2LDEuMzI4DQoJYy0xLjg4LDAuNDQ4LTMuNzUyLDAuOTA0LTUuNjQ4LDEuMzA0Yy0yLjA3MiwwLjQ0LTQuMTYsMC44MTYtNi4yNCwxLjE5MmMtMS42ODgsMC4zMTItMy4zNjgsMC42NC01LjA3MiwwLjkxMg0KCWMtMi4zNDQsMC4zNjgtNC43MTIsMC42NjQtNy4wNzIsMC45NmMtMS40OTYsMC4xOTItMi45ODQsMC40MTYtNC40OTYsMC41NzZjLTIuNjk2LDAuMjg4LTUuNDE2LDAuNDcyLTguMTI4LDAuNjY0DQoJYy0xLjIwOCwwLjA4LTIuNDA4LDAuMjE2LTMuNjMyLDAuMjhjLTMuOTYsMC4yMDgtNy45MjgsMC4zMi0xMS45MTIsMC4zMnMtNy45NTItMC4xMTItMTEuOTA0LTAuMzINCgljLTEuMjE2LTAuMDY0LTIuNDE2LTAuMTkyLTMuNjMyLTAuMjhjLTIuNzItMC4xODQtNS40MzItMC4zNzYtOC4xMjgtMC42NjRjLTEuNTEyLTAuMTYtMy0wLjM4NC00LjQ5Ni0wLjU3Ng0KCWMtMi4zNi0wLjI5Ni00LjcyOC0wLjU5Mi03LjA3Mi0wLjk2Yy0xLjcwNC0wLjI3Mi0zLjM4NC0wLjYtNS4wNzItMC45MTJjLTIuMDg4LTAuMzc2LTQuMTc2LTAuNzYtNi4yNC0xLjE5Mg0KCWMtMS44OTYtMC40LTMuNzc2LTAuODU2LTUuNjQ4LTEuMzA0Yy0xLjc5Mi0wLjQzMi0zLjU4NC0wLjg1Ni01LjM2LTEuMzI4Yy0yLjEwNC0wLjU2LTQuMi0xLjE2OC02LjI4LTEuNzg0DQoJYy0xLjQ2NC0wLjQzMi0yLjkyOC0wLjg3Mi00LjM4NC0xLjMzNmMtMi4zNDQtMC43NTItNC42NzItMS41NDQtNi45NzYtMi4zNjhjLTEuMDk2LTAuMzkyLTIuMTg0LTAuNzkyLTMuMjcyLTEuMTkyDQoJYy0yLjYwOC0wLjk3Ni01LjItMS45OTItNy43Ni0zLjA2NGMtMC42NjQtMC4yNzItMS4zMTItMC41Ni0xLjk3Ni0wLjg0Yy0yLjkyOC0xLjI1Ni01LjgzMi0yLjU2LTguNjk2LTMuOTM2DQoJYy0wLjEyLTAuMDU2LTAuMjMyLTAuMTEyLTAuMzUyLTAuMTc2Yy0yNy45MTItMTMuNTA0LTUyLjU2OC0zMi42NzItNzIuNTc2LTU1Ljk1MmMxNS40NjQtNTYuOTQ0LDU5LjI0LTEwMi44NDgsMTE1LjU2LTEyMS4xMTINCglDMTg2Ljg0OCwyNjUuMzg0LDE4OC4wMDgsMjY1Ljk5MiwxODkuMTUyLDI2Ni42MzJ6IE00MjEuODMyLDM3MC41ODRjLTE4LjEzNi01My41NTItNTkuNTEyLTk2LjgzMi0xMTIuMzc2LTExNy4zOTINCglDMzMwLjYsMjM0LjE0NCwzNDQsMjA2LjY0LDM0NCwxNzZjMC01Ny4zNDQtNDYuNjU2LTEwNC0xMDQtMTA0cy0xMDQsNDYuNjU2LTEwNCwxMDRjMCwzMC42NCwxMy40LDU4LjE0NCwzNC41NTIsNzcuMTkyDQoJYy01Mi44NjQsMjAuNTY4LTk0LjI0LDYzLjg0LTExMi4zNzYsMTE3LjM5MkMzMS42NzIsMzMzLjc5MiwxNiwyODguNzA0LDE2LDI0MEMxNiwxMTYuNDg4LDExNi40ODgsMTYsMjQwLDE2czIyNCwxMDAuNDg4LDIyNCwyMjQNCglDNDY0LDI4OC43MDQsNDQ4LjMyOCwzMzMuNzkyLDQyMS44MzIsMzcwLjU4NHoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                  />
                  {{ username }} |
                  <span class="badge badge-dark">{{ role }}</span>
                </h6>
              </div>
            </div>
            <div>
              <span style="margin: 50"></span>
            </div>

            <button class="btn btn-danger btn-sm" v-on:click="logout()">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </ul>
        </div>
      </nav>
      <!-- End Navbar -->
    </header>
  </div>
</template>

<script scoped>
import { baseURL } from "./../../services/api";
import moment from "moment";
import smsService from "@/services/smsService";
// import bankService from "@/services/bankService";

import axios from "axios";

export default {
  data() {
    return {
      username: "",
      role: "",
      search_type: "",
      member: [],
      smstable: [],
      todaydate: "",
      todaytime: "",
      todaytime2: "",
      status: "",
      withdrawpending: "",
    };
  },

  mounted() {
    this.getWait();

    this.showProfile();
  },
  methods: {
    async getWait() {
      let status = "Approve";
      this.todaydate = moment().locale("th").format("YYYY-MM-DD");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      const t = "T";
      const z = "";
      let search_type = this.search_type;
      const username = "";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;

      axios({
        method: "get",
        url: `${baseURL}/member/?start_date=${start_date}&end_date=${end_date}&username=${username}&search_type=${search_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then(async (response) => {
          this.member = await response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });

      ("Approve");

      axios({
        method: "get",
        url: `${baseURL}/member_transaction/withdraw-pending-list?start_date=${start_date}&end_date=${end_date}&status=${status}&username=${username}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then(async (response) => {
          this.withdrawpending = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.firstData = this.smstable.length;

      const res = await smsService.getScbSmsTransactionWait();
      // console.log(res.data);
      this.smstable = res.data;
      // console.log(this.smstable.length);

      if (this.firstData < this.smstable.length) {
        let self = this;
        self.playAudio();
      }

      let self = this;
      setTimeout(async function () {
        await self.getWait();
      }, 2000);
    },

    showProfile() {
      axios({
        method: "get",
        // url: "http://localhost:3000/api/user/profile",
        url: `${baseURL}/user/profile`,

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
          // console.log(res);
          this.username = res.data.data.username;
          this.role = res.data.data.role;
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          }
          if (error.response.status === 401 || error.response.status === 500) {
            const removeToken = localStorage.removeItem("access_token");
            if (removeToken == null) {
              this.$router.push("/login");
            }
          }
        });
    },
    logout() {
      const removeToken = localStorage.removeItem("access_token");
      if (removeToken == null) {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style></style>
