"use strict"

function init(){
  /*
  var beta_rolodex_true = new XMLHttpRequest();
  beta_rolodex_true.open("GET", "https://rolodex.k8s.beta.blend.com/tenants?detailed=true", true);
  beta_rolodex_true.onreadystatechange = function() {
    if (beta_rolodex_true.readyState == 4) {
      var beta_rolodex_true_list = JSON.parse(beta_rolodex_true.responseText);
      chrome.storage.local.set({'beta_rolodex_true_list':beta_rolodex_true_list});
    }
  }
  beta_rolodex_true.send();

  var beta_rolodex_false = new XMLHttpRequest();
  beta_rolodex_false.open("GET", "https://rolodex.k8s.beta.blend.com/tenants?detailed=false", true);
  beta_rolodex_false.onreadystatechange = function() {
    if (beta_rolodex_false.readyState == 4) {
      var rolodex_list = JSON.parse(beta_rolodex_false.responseText);
      var tenant_count = rolodex_list.tenants.length;
      var tenant_list = new Array(tenant_count);
      var i = 0;
      while (i < tenant_count){
        tenant_list[i] = rolodex_list.tenants[i];
        i++;
      }
      chrome.storage.local.set({'beta_rolodex_false_list':tenant_list});
      chrome.storage.local.set({'beta_tenant_count':tenant_count});
    }
  }
  beta_rolodex_false.send();
  */

  /*
  var s = document.createElement('script');
  s.src = chrome.runtime.getURL('script.js');
  s.onload = function() {
      this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
  */

  var prod_rolodex_true = new XMLHttpRequest();
  prod_rolodex_true.open("GET", "https://rolodex.k8s.prod.blend.com/tenants?detailed=true", true);
  prod_rolodex_true.onreadystatechange = function() {
    if (prod_rolodex_true.readyState == 4) {
      var prod_rolodex_true_list = JSON.parse(prod_rolodex_true.responseText);
      chrome.storage.local.set({'prod_rolodex_true_list':prod_rolodex_true_list});
    }
  }
  prod_rolodex_true.send();

  var prod_rolodex_false = new XMLHttpRequest();
  prod_rolodex_false.open("GET", "https://rolodex.k8s.prod.blend.com/tenants?detailed=false", true);
  prod_rolodex_false.onreadystatechange = function() {
    if (prod_rolodex_false.readyState == 4) {
      var rolodex_list = JSON.parse(prod_rolodex_false.responseText);
      var tenant_count = rolodex_list.tenants.length;
      var tenant_list = new Array(tenant_count);
      var i = 0;
      while (i < tenant_count){
        tenant_list[i] = rolodex_list.tenants[i];
        i++;
      }
      chrome.storage.local.set({'prod_rolodex_false_list':tenant_list});
      chrome.storage.local.set({'prod_tenant_count':tenant_count});
    }
  }
  prod_rolodex_false.send();
}

init();