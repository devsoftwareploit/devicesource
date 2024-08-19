        const box = document.querySelector('.box');
        const fileList = document.querySelector('.file-preview');
        let droppedFiles = [];
        var error = false;
        var imgsource = null;
        var refreshtime =  (typeof time_to_repeat === 'undefined') ? 20 : time_to_repeat;

        [ 'drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop' ].forEach( event => box.addEventListener(event, function(e) {
            e.preventDefault();
            e.stopPropagation();
        }), false );

        [ 'dragover', 'dragenter' ].forEach( event => box.addEventListener(event, function(e) {
            box.classList.add('is-dragover');
        }), false );

        [ 'dragleave', 'dragend', 'drop' ].forEach( event => box.addEventListener(event, function(e) {
            box.classList.remove('is-dragover');
        }), false );

function fileValidation(type){
   if (!allowed_ext.includes(type)){
     document.querySelector('.modal-body').innerHTML = notext;
     $('#modal').modal();
     var img = document.getElementById("previewdropdown");
     var txt = document.getElementById("imgtxt");
     var size = document.getElementsByClassName("imgsize")[0];
     if(img != null && txt != null && size != null){ 
       img.remove();
       txt.remove();
       size.remove();
     }
     error = true;
     return false;
   }else{
     document.getElementById("overlay").style.display = "flex";
     return true;
   }
}
  
        box.addEventListener('drop', function(e) {
            droppedFiles = e.dataTransfer.files;
            fileInput.files = droppedFiles;
          var ext = e.dataTransfer.files[0].name.split('.').pop();
          if (allowed_ext.includes(ext)){
            filetype = 'msword';
            imgsource = image_icon;
          }else{
            imgsource = null;
          }
            if(fileValidation(ext)) updateFileList();
        }, false );
        fileInput.addEventListener('change', function(e) {
          var ext = e.target.files[0].name.split('.').pop();
          if (allowed_ext.includes(ext)){
            imgsource = image_icon;
          }else{
            imgsource = null;
          }
          	if(fileValidation(ext)) updateFileList();
        }, false );

        function updateFileList() {
            const filesArray = Array.from(fileInput.files);
            if (filesArray.length > 1) {
              $('#modal').modal();
              document.querySelector('.modal-body').innerHTML = multifile;
              error = true;
            } else if (filesArray.length == 1) {
              error = false;
                var file = filesArray[0],
                reader = new FileReader();
                filesize = file.size;
                $(".box").css("height", "auto");
                var img = document.getElementById("previewdropdown");
                if(img == null){ 
                    fileList.insertAdjacentHTML('beforeend', '<div class="item-actions"><button id="delete" type="button" class="btn btn-primary rounded-pill delete-item p-0 action-btn"><span aria-hidden="true">&times;</span></button></div>');
                    var img = document.createElement('img');
                    fileList.appendChild(img);
                    img.setAttribute("id","previewdropdown");
                    img.src = imgsource;
                }else{
                    reader.onload = function(e) {
                        img.src = imgsource;
                    };
                    var txt = document.getElementById("imgtxt");
                    var size = document.getElementsByClassName("imgsize")[0];
                     if(txt != null){ 
                       txt.remove();
                       size.remove();
                     }
                }
              reader.readAsDataURL(file);
              const p1 = document.createElement("p");
              p1.setAttribute("id","imgtxt");
              p1.classList.add("d-flex");
              p1.classList.add("justify-content-center");
              p1.classList.add("imagetext");
              p1.innerHTML = `${filesArray[0].name}`;
              fileList.appendChild(p1);
              const p2 = document.createElement("p");
              p2.classList.add("d-flex");
              p2.classList.add("justify-content-center");
              p2.classList.add("small");
              p2.classList.add("imgsize");
              p2.innerHTML = `${formatSizeUnits(filesArray[0].size)}`;
              fileList.appendChild(p2);
            } else {
              error = false;
                fileList.innerHTML = '';
            }
        }
  
  //Beautify Size Of File
    function formatSizeUnits(bytes)
    {
        if (bytes >= 1073741824)
        {
            bytes = (bytes / 1073741824).toFixed(2) + ' GB';
        }
        else if (bytes >= 1048576)
        {
            bytes = (bytes / 1048576).toFixed(2) + ' MB';
        }
        else if (bytes >= 1024)
        {
            bytes = (bytes / 1024).toFixed(2) + ' KB';
        }
        else if (bytes > 1)
        {
            bytes = bytes + ' bytes';
        }
        else if (bytes == 1)
        {
            bytes = bytes + ' byte';
        }
        else
        {
            bytes = '0 bytes';
        }
        return bytes;
    }
  
box.addEventListener('drop', function(e) {
    document.getElementById("overlay").style.display = "none";
});
$("#submit").click(function () {
    document.getElementById("overlay").style.display = "flex";
});
$(".file-preview").on('click', '#delete', function () {
    $(".file-preview").empty();
    fileInput.value = "";
}); 

$(document).ready(function() {
var divCheckingInterval = setInterval(function(){
      if ($('#res').length > 0){
        clearInterval(divCheckingInterval);
        //calculate step based on file input size
        var size_ko = filesize/1000;
        var step=0;
        if(size_ko < 100) step = 3;
        else if(size_ko > 100 && size_ko < 200) step = 2;
        else if(size_ko > 200 && size_ko < 300) step = 1;
        else if(size_ko > 300) step = 1;
        
        document.getElementById("overlay").style.display = "none";
        $("html, body").animate({ scrollTop: scrollme }, "slow");
        
        var progress = setInterval(function() {
          var $bar = $('.progress-bar');
          document.getElementById("progbar").style.display = 'block';
          if ($bar.width()>=809) {
            clearInterval(progress);
            $.get(window.location.origin + '/themes/altum/views/tools-wtlx/file-size-proxy.php', { filename:file_to_download, global_token:global_token }, function(data){
              if(data === 'not-found'){
                $bar.width(0);
                step /= 2;
                progress = setInterval(function() {
                  $bar = $('.progress-bar');
                  if ($bar.width()>=809) {
                    clearInterval(progress);
                    $.get(window.location.origin + '/themes/altum/views/tools-wtlx/file-size-proxy.php', { filename:file_to_download, global_token:global_token }, function(data){
                      if(data === 'not-found'){
                          $('#modal').modal();
                          document.querySelector('.modal-body').innerHTML = notfoundagain;
                      }else{
                          $('.progress-bar').removeClass('active');
                          $('#show-download').removeClass('d-none');
                          document.getElementById("progbar").style.display = "none";
                          $('.filesize').text(formatSizeUnits(parseInt(data))); 
                      }
                    })
                  } else {
                      $bar.width($bar.width()+step);
                  }
                  $bar.text(Math.round($bar.width()/8.1) + "%");
                }, refreshtime);
              }else{
				$('.progress-bar').removeClass('active');
				$('#show-download').removeClass('d-none');
				document.getElementById("progbar").style.display = "none";
				$('.filesize').text(formatSizeUnits(parseInt(data))); 
              }
             })
            
          } else {
              $bar.width($bar.width()+step);
          }
          $bar.text(Math.round($bar.width()/8.1) + "%");
        }, refreshtime);

    }
}, 500);
});