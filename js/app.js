$(function () {
    const formsubmit = $('#search');
    const inputsearch = $('.search');



    function todayMeteo(data) {
        let todaytempl = `
        <div id = "headday" class="col-md-3 col-sm-4 padding-left-30 padding-vertical-30">
          <div class="row">
            <div class="col-xs-4">
              <div class="vertical-align">

                <i class=" vertical-align-middlowf owf owf-${data[0].weather[0].id}  margin-bottom-10 font-size-50"></i>
              </div>
            </div>

            <div class="col-xs-8 vertical-align-c">
              <span class="blue-600 font-size-50">${Math.round(data[0].main.temp)}°
                        <span class="font-size-30">C</span>
              </span>

              <p class="font-size-14 margin-bottom-0">${convertDate(data[0].dt)} ${data[0].dt_txt.substr(0, 10)}</p>
            </div>
          </div>
        </div>
        `
        return todaytempl;


    }
    function otherdaymeteo(data) {
        let template = `<div class="col-xs-2 remo">
              <div class="weather-day vertical-align">
                <div class="vertical-align-middle font-size-16"><div class="margin-bottom-10">${convertDate(data.dt).substr(0, 3)}</div>
                  <i class=" owf owf-${data.weather[0].id} margin-bottom-10 font-size-24 "></i>
                  <div>${Math.round(data.main.temp)}
                    <span class="font-size-12">C</span>
                  </div> </div> </div></div>`

        return template;
    }

    function convertDate(data) {
        var d = new Date(data * 1000);

        return dayfrom(d.getDay());

    }
    function dayfrom(num) {
        switch (num) {
            case 0:
                return "SUNDAY";

            case 1:
                return "MONDAY";
            case 2:
                return "TUESDAY";
            case 3:
                return "WEDNESDAY";
            case 4:
                return "THURSDAY";
            case 5:
                return "FRIDAY"
            default: return "SATURDAY";



        }
    }
    var fetchData = (evt) => {
        evt.preventDefault();


        var location = encodeURIComponent(inputsearch.val());

        var urlPrefix = '//api.openweathermap.org/data/2.5/forecast?q=';
        var urlSuffix = '&APPID=a4da4aea209d0977a955ead3516b9c1f&units=metric';
        var url = urlPrefix + location + urlSuffix;

        var form = $(this);
        $.ajax(url, {
            type: 'POST',
            success: function (result) {
                $('.city').text(result.city.name)
                var app = $('#app');
                $('#headday').remove();
                $('.remo').remove();
                let rs = ""
                $('#app').prepend(todayMeteo(result.list));
                for (let i = 1; i < 7; i++) {
                    $('#app2').prepend(otherdaymeteo(result.list[i]));
                    console.log(result.list[i].dt)
                }

            }

        }
        )
    };
    formsubmit.on('submit', (evt) => {
        return fetchData(evt)
    })

})