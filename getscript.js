chrome.browserAction.onClicked.addListener(function(tab) { alert('icon clicked')});
const data = {disclosuresPackageId: 'example'};
let package_get = fetch ('https://api.blendlabs.com/packages?applicationId=' +urlarray[5], {
  method: 'GET',
  hearders: {
    'Accept': 'application/json; charset=utf-8',
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
    'Authorization': 'Bearer XXXXXXXX',
    'blend-target-instance': tenant_name
  },
})
.then(Response => {
    return response.json()
  })
  .then(data => {
    console.log('Sucess', data);
  })
  .catch((error) => {
    console.error('Error',error);
  })