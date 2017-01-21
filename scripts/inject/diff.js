(function () {
console.log("injected diff.js");

function _navigateTo(filename, lineno) {
  console.log('_navigateTo(%s, %s)', filename, lineno);
  console.log(self.fetch);
  //filename = filename.replace(/[^a-zA-Z_.0-9]/g, '');
  lineno = +lineno;

  var payload = { filename: filename, lineno: +lineno };
  fetch("http://localhost:44777/json/", {
    method: "POST",
    body: JSON.stringify( payload )
  });

  //var xhr = new XMLHttpRequest();
  //xhr.onreadystatechange = function (e) {};
  //xhr.open("GET", "http://localhost:44777/" + filename + ":" + lineno, true);
  //xhr.send();
}

decorate('M_HookState.prototype.updateIndicator_', function(func, tr) {
    var ret = func.call(this, tr);

    if (this.indicated_element) {
      //var filename = window.location.href.replace(/\?.*?$/, '').match(/[^/]*$/)[0];
      var fileSelector = document.querySelectorAll('select:not([name])')[0];
      var filename = fileSelector.options[fileSelector.selectedIndex].value;
      var line = this.indicated_element.lastChild.id.match(/\d*$/)[0];

      if (filename !== "" && line !== "") {
        _navigateTo(filename, line);
      }
    }

    return ret;
  });
})();
