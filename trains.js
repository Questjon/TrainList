var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var trainJSON = JSON.parse(this.responseText);
        var sortedArray = parseTrains(trainJSON);
        outputTrains(sortedArray);
    }
};


xhr.open("GET", "https://api.tfl.gov.uk/Line/piccadilly/arrivals", true);
xhr.send();


function parseTrains(array) {


  function hash(o){
      return o.vehicleId;
  }
  var hashesFound = {};
  array.forEach(function(o){
      hashesFound[hash(o)] = o;
  })
  var results = Object.keys(hashesFound).map(function(k){
      return hashesFound[k];
  })
  results.sort(function(a, b) {
      return parseFloat(a.vehicleId) - parseFloat(b.vehicleId);
  });

  return results;
}

function outputTrains(array)
{
  console.log(array);
  for (var item in array) {
      var newElement = document.createElement('div');
      newElement.id = array[item]; newElement.className = "train";
      newElement.innerHTML = array[item].vehicleId+" : "+array[item].currentLocation;
      document.body.appendChild(newElement);
  }

}
