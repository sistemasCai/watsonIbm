$(document).ready(function(){
    cargarLinea();
    $('#form').on('submit', function(event){
        event.preventDefault();
        var datos = new FormData($('#form')[0]);
       
    $.ajax({
    url : '/addDocument',
    type: 'POST',
    data : datos,
    processData: false,
    contentType: false,
    mimeType: "multipart/form-data",
    beforeSend: function(){
     preoloader();
    }  
  })
    .done(function(res){
       preoloaderFin();
       swal("Good job!", "You clicked the button!", "success");
    })
    .fail(function(res){
        swal("Good job!", "You clicked the button!", "error");
    })
    .always(function(){
        console.log('complete')
    });
    });

    $('#consultar').click(function(){
        var text = $('#texto').val();
        if(text === ''){
            alert('Rellene el Campo Consulta');
            return;
        }
        
        var route = '/data'
        $.ajax({
            url:route,
            type : 'GET',
            beforeSend: function(){
                preoloader();
                
            },
            success : function(res){
                preoloaderFin();
                $('#json').text(res);
                console.log(res);
            }
        })

    });
});


function cargarLinea(){
    new Morris.Line({
        // ID of the element in which to draw the chart.
        element: 'campo',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data: [
          { year: '2008', value: 20 },
          { year: '2009', value: 10 },
          { year: '2010', value: 5 },
          { year: '2011', value: 5 },
          { year: '2012', value: 20 }
        ],
        // The name of the data record attribute that contains x-values.
        xkey: 'year',
        // A list of names of data record attributes that contain y-values.
        ykeys: ['value'],
        // Labels for the ykeys -- will be displayed when you hover over the
        // chart.
        labels: ['Value']
      });
}

function preoloader(){
    var cadena = `<div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`;
    $('#json').html(cadena);
}

function preoloaderFin(){
    $('#json').html('');
}

