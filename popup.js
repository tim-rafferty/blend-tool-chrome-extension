//Sending a message to content script
document.addEventListener('DOMContentLoaded', documentEvents , false);

//Main Function
function documentEvents(){
  const rolodex_button = document.getElementById('rolodexbutton');
  const api_button = document.getElementById('apibutton');
  const rolodex_tab = document.getElementById('rolodex');
  const api_tab = document.getElementById('api');
  rolodex_button.addEventListener('click',function(){
    rolodex_tab.style.display = "block";
    api_tab.style.display = "none";
    rolodex_button.style.color = "#4e4e4e";
    api_button.style.color = "#FFFFFF";
    api_button.style.backgroundColor = "rgb(0, 117, 252)";
    rolodex_button.style.backgroundColor = "rgb(216, 216, 216)";
  });
  api_button.addEventListener('click',function(){
    rolodex_tab.style.display = "none";
    api_tab.style.display = "block";
    api_button.style.color = "#4e4e4e";
    rolodex_button.style.color = "#FFFFFF";
    rolodex_button.style.backgroundColor = "rgb(0, 117, 252)";
    api_button.style.backgroundColor = "rgb(216, 216, 216)";
  });

  const scroll_button = document.getElementById('scrollbutton')
  scroll_button.addEventListener('click',function(){
    chrome.scripting.executeScript({
      file: "script.js"
    });
  });

  //Find the current URL
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
    var url2 = tabs[0].url;
    var urlarray = url2.split("/");
    //Creates the URLs for api/loans and api/docusign
    var apiurl = "https://" + urlarray[2] + "/api/loans/" + urlarray[4]
    var mismourl = "https://" + urlarray[2] + "/api/loans/" + urlarray[4] + "/mismo"
    var docusignurl = "https://" + urlarray[2] + "/api/docusign/envelopes?loanId=" + urlarray[4]
    var packageId = "https://" + urlarray[2]+ "/api/loans/" + urlarray [4] + "/docs?disclosures=true&signatures=true"
    var oauthId = "https://" + urlarray[2] + "/auth/saml/blend"
    //Get html button elemts
    const apipage = document.getElementById('apiurl');
    const mismo_button = document.getElementById('mismobutton');
    const docusignpage = document.getElementById('docusignurl');
    const package_Id = document.getElementById('packageurl')
    const oauth_id =document.getElementById("oauth")
    //set the buttons with the link and name
    apipage.href = apiurl;
    apipage.innerHTML = "App API page";
    docusignpage.href = docusignurl;
    docusignpage.innerHTML = "Docusign API page";
    mismo_button.href = mismourl;
    mismo_button.innerHTML = "CLICK TO DOWNLOAD MISMO";
    package_Id.href = packageId,
    package_Id.innerHTML = "Package API page"
    oauth_id.href = oauthId;
    oauth_id.innerHTML = "OAUTH LINK"

    //Getting the tenant name
    var tenant_get = new XMLHttpRequest();
    tenant_get.open("GET", "https://" + urlarray[2] + "/api", true);
    tenant_get.onreadystatechange = function() {
      if (tenant_get.readyState == 4) {
        var tenant_page = JSON.parse(tenant_get.responseText);
        var tenant_name = tenant_page.tenant;
        const tenant = document.getElementById('tenant_name');
        const tenant_title = document.getElementById('tenant_title');
        tenant_title.innerHTML = "TENANT NAME"
        tenant.innerHTML += ("<li class ='id_result'>" + tenant_name + "</li>")
      }
    }
    tenant_get.send();

    //Checks to see if you are in a blend environemt
    if (urlarray[3] == "loans"){
      //unhide MISMO button
      document.getElementById('mismodiv').style.display="block";
      document.getElementById('apipageshortcuts').style.display="block";
      //Getting the borrower ID's
      var api_get = new XMLHttpRequest();
      api_get.open("GET", "https://" + urlarray[2] + "/api/loans/" + urlarray[4], true);
      api_get.onreadystatechange = function() {
        if (api_get.readyState == 4) {
          var api_page = JSON.parse(api_get.responseText);
          var borrower_pair_count = api_page.Mortgage.borrowerPairs.length;
          const id_results = document.getElementById('id_results_borrowers');
          const urlaversion = document.getElementById('loanidtitle');
          const loanid = document.getElementById('id_results_loan');
          loanid.innerHTML += ("<li class='id_result'>" + urlarray[4] + "</li>");
          urlaversion.innerHTML = "LOAN ID [" + api_page.application.URLAVersion + "]"
          var first_count = 0;
          var second_count = 0;
          var borrower_pairs = new Array(borrower_pair_count);
          while (first_count < borrower_pair_count){
            borrower_pairs[first_count] = api_page.Mortgage.borrowerPairs[first_count]
            first_count++;
          }
          while (second_count < borrower_pair_count){
          var title_count = second_count + 1;
            if (typeof borrower_pairs[second_count].secondaryBorrowerId == "undefined"){
              id_results.innerHTML += ("<li class='id_header'>Borrower pair " + title_count + "</li>");
              id_results.innerHTML += ("<li class='id_result'>" + borrower_pairs[second_count].primaryBorrowerId + "</li>");
            }
            else{
              id_results.innerHTML += ("<li class='id_header'>Borrower pair " + title_count + "</li>");
              id_results.innerHTML += ("<li class='id_result'>" + borrower_pairs[second_count].primaryBorrowerId + "</li>");
              id_results.innerHTML += ("<li class='id_result'>" + borrower_pairs[second_count].secondaryBorrowerId + "</li>");
            }
            second_count++;
          }
        }
      }
      api_get.send();

      //Getting the docusign envelope ID's
      var docusign_get = new XMLHttpRequest();
      docusign_get.open("GET", "https://" + urlarray[2] + "/api/docusign/envelopes?loanId=" + urlarray[4], true);
      docusign_get.onreadystatechange = function() {
        if (docusign_get.readyState == 4) {
          var docusign_page = JSON.parse(docusign_get.responseText);
          var envelope_count = docusign_page.envelopes.length;
          var envelope_ids = new Array(envelope_count);
          var envelope_types = new Array(envelope_count);
          var first_count = 0;
          var second_count = 0;
          if (envelope_count > 0){
            const envelope_ids_html = document.getElementById('id_results_docusign');
            while (first_count < envelope_count){
              envelope_ids[first_count] = docusign_page.envelopes[first_count].docusignEnvelopeId;
              envelope_types[first_count] = docusign_page.envelopes[first_count].parentType;
              first_count++;
            }
            while (second_count < envelope_count){
              var name_transform = envelope_types[second_count];
              name_transform = name_transform.replace("FollowUp","");
              envelope_ids_html.innerHTML += ("<li class='id_header'>" + name_transform + "</li>");
              envelope_ids_html.innerHTML += ("<li class='id_result'>" + envelope_ids[second_count] + "</li>");
              second_count++;
            }
          }
          else{
            const docusign_subtitle = document.getElementById("docusign_subtitle");
            docusign_subtitle.innerHTML = "No Envelope ID's found";
          }
        }
      }
      docusign_get.send();

      //Getting the package ID's
      var package_get = new XMLHttpRequest();
      package_get.open("GET", "https://" + urlarray[2]+ "/api/" + urlarray [4], true);
      package_get.onreadystatechange = function() {
        if (package_get.readyState == 4) {
          var package_page = JSON.parse(package_get.responseText);
          var package_count = package_page.processes.Disclosures_External_0.lenght;
          var package_ids = new Array(package_count);
          var package_types = new Array(package_count);
          var first_count = 0;
          var second_count = 0;
          if (package_count > 0){
            const package_ids_html = document.getElementById('id_results_package');
            while (first_count < envelope_count){
              package_ids[first_count] = package_page.processes.Disclosures_External.length[first_count].disclosuresPackageId;
              package_types[first_count] = package_page.processes.Disclosures_External.length.lenght[first_count].parentType;
              first_count++;
            }
            while (second_count < package_count){
              var name_transform = package_types[second_count];
              name_transform = name_transform.replace("disclosures","");
              package_ids_html.innerHTML += ("<li class='id_header'>" + name_transform + "</li>");
              package_ids_html.innerHTML += ("<li class='id_result'>" + package_ids[second_count] + "</li>");
              second_count++;
            }
          }
          else{
            const package_subtitle = document.getElementById("package_subtitle");
            package_subtitle.innerHTML = "No Envelope ID's found";
          }
        }
      }
      package_get.send();
    }
    //Let people know they aren't on a blend page
    else{
      const appinfo = document.getElementById('appinfosubtitle');
      const borrower_subtitle = document.getElementById("borrower_subtitle");
      const docusign_subtitle = document.getElementById("docusign_subtitle");
      const package_subtitle = document.getElementById("package_subtitle")
      appinfo.innerHTML = "This is not a Blend application";
      borrower_subtitle.innerHTML = "Turn around and go back";
      docusign_subtitle.innerHTML = "There is nothing for you here";
      package_subtitle.innerHTML = "There is nothing for you here"
    }
  })            

  chrome.storage.local.get(['beta_rolodex_true_list','beta_rolodex_false_list','beta_tenant_count','prod_rolodex_true_list','prod_rolodex_false_list','prod_tenant_count'],function(result){
    const tenant_list = document.getElementById("myUL");
    var count1 = 0;
    //var count2 = 0;
    while (count1 < result.prod_tenant_count){
      name_edit = result.prod_rolodex_false_list[count1];
      var host_url = result.prod_rolodex_true_list[name_edit].CANONICAL_HOST_URL + "/auth/saml/blend";
      tenant_list.innerHTML += ("<li><a href='" + host_url + "' target='_blank'>" + result.prod_rolodex_false_list[count1] + " (" + result.prod_rolodex_true_list[name_edit].CANONICAL_HOST_NAME + ")" + "</a></li>");
      count1++;
    }
    /*
    while (count2 < result.beta_tenant_count){
      name_edit = result.beta_rolodex_false_list[count2];
      var host_url = result.beta_rolodex_true_list[name_edit].CANONICAL_HOST_URL + "/auth/saml/blend";
      tenant_list.innerHTML += ("<li><a href='" + host_url + "' target='_blank'>" + result.beta_rolodex_false_list[count2] + " [BETA]</a></li>");
      count2++;
    }
    */
  })

  var input = document.getElementById('myInput')
  input.addEventListener('keyup',function(){
  // Declare variables
    var filter, ul, li, a, i, txtValue;
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1){
        li[i].style.display = "";
      } 
      else{
        li[i].style.display = "none";
      }
    }
  })
}