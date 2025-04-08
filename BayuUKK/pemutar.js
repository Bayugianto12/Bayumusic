var lagudariServer;
var sedangdiPutar = 0;

$(document).ready(function () {
    ambilData("");
});


function ambilData (katakunci) {
  $.ajax({
    type: "GET",
    url: "http://192.168.1.111/ukk/semualagu.php?cari=" +katakunci,
    success: function (response) {
    lagudariServer = response
    console.log (lagudariServer) //menerapkan perintah eksekusi berbasis teks
     putarLagu (sedangdiPutar);
     cetaklistLagu();
    }
  });
}

function putarLagu(indexlagu){
  document.getElementById("gbrartis").src = lagudariServer [indexlagu].gambar
  $("#namaartis").html(lagudariServer [indexlagu].artis);
  $("#judullagu").html(lagudariServer [indexlagu].judul);
  $("#liriklagu").html(lagudariServer [indexlagu].lirik);
  document.getElementById("pemutarlagu").src = lagudariServer [indexlagu].url
  document.getElementById("pemutarlagu").load();
  document.getElementById("pemutarlagu").play();
  document.title = "Bayu Player - " +lagudariServer [indexlagu].judul
  sedangdiPutar = indexlagu; //merubah sedang di putar ke index lagu yang di pilih
}

function laguBerikut (){
 if (sedangdiPutar < lagudariServer.length-1){
  sedangdiPutar++
  putarLagu(sedangdiPutar);
 }
 else {
  alert("tidak ada lagu lagi")
 }
}
function laguSebelum (){
  if (sedangdiPutar >= 0){
    sedangdiPutar--
    putarLagu(sedangdiPutar);
  }
  else {
    alert("tidak bisa memindah lagu")
  }
}

// function cetaklistlagu
function cetaklistLagu () {
  $.each(lagudariServer, function (indexInArray, valueOfElement) { 
     $("#listlagu").append(
      "<p data-bs-dismiss='offcanvas' onclick='putarLagu("+indexInArray+")'>"+
      valueOfElement.artis+
      " - "+
      valueOfElement.judul+
      "</p>"
     );
  });
}

// function cari lagu
function cariLagu (){
  $("#listlagu").html("");
 ambilData(document.getElementById("katakunci").value);
}