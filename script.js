var newImages = [];
var showImgs = [];

function loadFiles(event) {
  var files = event.target.files; // Get the selected files
  var showImgContainer = document.getElementById('showImg'); // Get the showImg container element

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var reader = new FileReader();

    reader.onload = (function(file) {
      return function(e) {
        var showImg = document.createElement('img');
        showImg.src = URL.createObjectURL(file);
        showImgs.push(showImg);
        showImgContainer.appendChild(showImg); // Append the image to the showImg container

        var newImage = document.createElement('img');
        newImage.src = URL.createObjectURL(file);
        newImages.push(newImage);

        showImg.onload = function() {
          URL.revokeObjectURL(showImg.src); // Free memory
        };
      };
    })(file);

    reader.readAsDataURL(file);
  }
}

function pdfDown() {
  var doc = new jsPDF();

  for (var i = 0; i < newImages.length; i++) {
    var image = newImages[i];
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    var imageData = canvas.toDataURL('image/jpeg', 1.0);
    if (image.width / image.height > 1.7) {
      doc.addImage(imageData, 'JPEG', 5, 0, 0, 110);
    } else {
      doc.addImage(imageData, 'JPEG', 20, 0, 165, 0);
    }
    if (i < newImages.length - 1) {
      doc.addPage();
    }
  }

  doc.save('ImgToPDF.pdf');
}

function toggleContactSection() {
  var contactSection = document.getElementById("contact-section");
  if (contactSection.style.display === "none") {
    contactSection.style.display = "block";
  } else {
    contactSection.style.display = "none";
  }
}