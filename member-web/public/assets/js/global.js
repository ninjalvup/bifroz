$(function() {

    var includes = $('[data-include]');
    jQuery.each(includes, function() {
        var file = 'views/' + $(this).data('include') + '.html';
        $(this).load(file);
    });

    setTimeout(function() {
        $('#nav-hamburger').click(function() {
            $('html').toggleClass("menu-open")
        })
    }, 500)
});

function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

function isLine() {
    return /Line/i.test(navigator.userAgent);
}


function checkLogin() {
    if (!sessionStorage.getItem('token')) {
        location.href = 'login.html'
        return false
    } else {
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        return true
    }
}

var gameWindow;

function checkWindow() {
    if (gameWindow && !gameWindow.closed) {
        gameWindow.close();
    }

    gameWindow = window.open('', "popup", "fullscreen");
    gameWindow.moveTo(0, 0);
    gameWindow.resizeTo(screen.width, screen.height);
    gameWindow.document.write('Loading...');
    return;
}


async function saGame() {

    if (!checkLogin()) {
        alert('กรุณาเข้าสู่ระบบก่อน.')
        return
    }

    let uri = 'https://ukingbet.secure-restapi.com/sagame/login?gameId=601&client=';

    if (isMobile()) {
        uri = uri + 'MB'
    } else {
        uri = uri + 'PC'
    }

    if (isLine()) {
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
            }
        }
    } else {
        checkWindow()
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            gameWindow.location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
                gameWindow.close();
            }
        }
    
    }
}


async function ag() {
    if (!checkLogin()) {
        alert('กรุณาเข้าสู่ระบบก่อน.')
        return
    }

    let uri = 'https://ukingbet.secure-restapi.com/agg/login?gameId=1&prefix=VIEWBET&website=https://viewbet.com&client=';

    if (isMobile()) {
        uri = uri + 'MB'
    } else {
        uri = uri + 'PC'
    }

    if (isLine()) {
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
            }
        }
    } else {
        checkWindow()
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            gameWindow.location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
                gameWindow.close();
            }
        }
    
    }
}

async function dream() {
    if (!checkLogin()) {
        alert('กรุณาเข้าสู่ระบบก่อน.')
        return
    }

    let uri = 'https://ukingbet.secure-restapi.com/dreamgame/login?client=';

    if (isMobile()) {
        uri = uri + 'MB'
    } else {
        uri = uri + 'PC'
    }


    if (isLine()) {
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
            }
        }
    } else {
        checkWindow()
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            gameWindow.location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
                gameWindow.close();
            }
        }
    
    }
}

async function sexy() {
    if (!checkLogin()) {
        alert('กรุณาเข้าสู่ระบบก่อน.')
        return
    }

    let uri = 'https://ukingbet.secure-restapi.com/sexy-baccarat/login?client=';

    if (isMobile()) {
        uri = uri + 'MB'
    } else {
        uri = uri + 'PC'
    }

    if (isLine()) {
        let resp = await axios.get(uri)
    
        if (resp.data.code == 1) {
            location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
            }
        }
    } else {
        checkWindow()
        let resp = await axios.get(uri)
    
        if (resp.data.code == 1) {
            gameWindow.location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
                gameWindow.close();
            }
        }
    
    }
}

async function pretty() {
    if (!checkLogin()) {
        alert('กรุณาเข้าสู่ระบบก่อน.')
        return
    }

    let uri = 'https://ukingbet.secure-restapi.com/pretty/login?client=';

    if (isMobile()) {
        uri = uri + 'MB'
    } else {
        uri = uri + 'PC'
    }

    if (isLine()) {
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
            }
        }
    } else {
        checkWindow()
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            gameWindow.location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
                gameWindow.close();
            }
        }
    
    }
}


async function allbet() {
    if (!checkLogin()) {
        alert('กรุณาเข้าสู่ระบบก่อน.')
        return
    }

    let uri = 'https://ukingbet.secure-restapi.com/allbet/login?client=';

    if (isMobile()) {
        uri = uri + 'MB'
    } else {
        uri = uri + 'PC'
    }

    if (isLine()) {
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
            }
        }
    } else {
        checkWindow()
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            gameWindow.location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
                gameWindow.close();
            }
        }
    
    }
}

async function ebet() {
    if (!checkLogin()) {
        alert('กรุณาเข้าสู่ระบบก่อน.')
        return
    }

    let uri = 'https://ukingbet.secure-restapi.com/ebet/login?client=';

    if (isMobile()) {
        uri = uri + 'MB'
    } else {
        uri = uri + 'PC'
    }

    if (isLine()) {
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
            }
        }
    } else {
        checkWindow()
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            gameWindow.location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
                gameWindow.close();
            }
        }
    
    }
}


async function SBO() {

    if (!checkLogin()) {
        alert('กรุณาเข้าสู่ระบบก่อน.')
        return
    }
     let uri = 'https://ukingbet.com/?url=https%3A%2F%2Fukingbet.com&hash=5971acd0f7531e570a3f06a4&username='+ sessionStorage.getItem('username') +'&password='+ sessionStorage.getItem('password') +'#!/redirect';
     
    if (isLine()) {
        location.href = resp.data.url
        sessionStorage.clear();
    } else {
        checkWindow();
        gameWindow.location.href = uri
        sessionStorage.clear();
    }


}

async function AMBLOTTO() {

    if (!checkLogin()) {
        alert('กรุณาเข้าสู่ระบบก่อน.')
        return
    }
    let uri = 'https://ukingbet.secure-restapi.com/lotto/login?client=';

    if (isMobile()) {
        uri = uri + 'MB'
    } else {
        uri = uri + 'WEB'
    }
    
    if (isLine()) {
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
            }
        }
    } else {
        checkWindow()
        let resp = await axios.get(uri)
    
        if (resp.data.code == 0) {
            gameWindow.location.href = resp.data.url;
        } else {
            if (resp.data.code == 1005) {
                alert(resp.data.message)
                sessionStorage.clear();
                location.href = 'index.html'
            } else {
                alert(resp.data.message)
                gameWindow.close();
            }
        }
    
    }
}


function copyText(element) {
    var range, selection, worked;
  
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();        
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    try {
      document.execCommand('copy');
      alert('คัดลอกเรียบร้อย');
    }
    catch (err) {
      alert('unable to copy text');
    }
  }