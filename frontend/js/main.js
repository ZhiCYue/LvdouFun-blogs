(function(scope){
  
  const host = 'http://api.lvdouFun.com:7001'

  function update({ data }) {
    document.getElementById('clickTotal').innerText = data.total
  }

  function fetchClickNum() {
    var xhr = new XMLHttpRequest()

    xhr.open('GET', `${host}/api/v1/click`)
    xhr.responseType = 'json'

    xhr.onload = function() {
      if(xhr.status === 200) {
        update({ data: xhr.response })
      }
    }
    xhr.send()
  }

  function init() {
    fetchClickNum()
  }

  setTimeout(() => {
    init()
  }, 10);

})(
  (function() { return this })() || Function("return this")()
)