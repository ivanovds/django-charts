/*
This file contains 2 Ajax-functions that:
    - handles the currency chart
    - handles the currency chart form
*/

$(document).ready(function(){

    // currency chart
    var $currencyChart = $("#currency-chart");
    $.ajax({
        url: $currencyChart.data("url"),
        success: function (data) {
          // hiding an empty chart
          if (data.chart_empty){$("#currency-chart").css({'visibility' : 'hidden'});}
          var ctx = $currencyChart[0].getContext("2d");
          lineChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: data.labels,
              datasets: [{
                label: 'USD/UAH',
                data: data.data,
                fill: false,
                lineTension: 0.0,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
              }]
            },
            options: {
              responsive: true,
              legend: {
                display: true,
              },
              title: {
                display: false,
              }
            }
          });
        }
      });


    // currency chart form
    var $myForm = $('.currency-ajax-form');
    $myForm.submit(function(event){
        event.preventDefault();
        var $formData = $(this).serialize();
        var $thisURL = $myForm.attr('data-url') || window.location.href;
        $.ajax({
            method: "POST",
            url: $thisURL,
            data: $formData,
            success: function handleFormSuccess(data, textStatus, jqXHR){
                $("#currency-chart").css({'visibility' : 'visible'});
                // removing error and success messages
                $myForm.find('.success').remove()
                $myForm.find('.error').remove();
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
                chartUpdate();
                $myForm[0].reset();
                display_success(data);
            },
            error: function handleFormError(jqXHR, textStatus, errorThrown){
                $myForm.find('.error').remove();
                display_form_errors(jqXHR['responseJSON']);
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            },
        })

            // adding new element from the form, sorting, updating
            function chartUpdate(){
               lineChart.data.datasets[0].data.push($('input[name="rate"]').val());
               lineChart.data.labels.push($('input[name="date"]').val());
               chartSort();
               lineChart.update();
            }

             // sorting all data
             function chartSort(){
               var list = [];
               const size = lineChart.data.labels.length;

               // creating list of dictionaries
               for(var i = 0; i < size; i++){
                list.push({dates: lineChart.data.labels[i], rates: lineChart.data.datasets[0].data[i]})
               }

               // sorting of list of dictionaries
               list.sort((a, b) => {
                   return (a.dates > b.dates) ? 1 : -1
               })

               lineChart.data.datasets[0].data = [];
               lineChart.data.labels = [];

               // overriding chart`s dataset
               for(var i = 0; i < size; i++){
                   lineChart.data.datasets[0].data[i] = list[i].rates;
                   lineChart.data.labels[i] = list[i].dates
               }
             };

            function display_form_errors(errors){
                for (var k in errors) {
                    $myForm.find('input[name=' + k + ']').after(
                        '<div class="error">' + errors[k] + '</div>');
                }
            }

            function display_success(data){
                    $myForm.find($('#saveButton')).after(
                        '<div class="success" style="display: none">' + data['message'] + '</div>');
                    $('.success').show(300, function(){
                      setTimeout(function(){
                        $('.success').slideUp(300);
                      }, 4000);
                    });

            }
    });
})

