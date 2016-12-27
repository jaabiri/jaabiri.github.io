



$( document ).ready(function() {
    console.log('ready')
    const formsubmit = $('#search');
    const inputsearch = $('.search');

  inputsearch.val('paris')

    function todayMeteo(data) {
        console.log(data[0].main)
        let todaytempl = `
      
               <div class="mainicon">
                <i class=" vertical-align-middlowf owf owf-${data[0].weather[0].id}  "></i>
               </div>
           

            <div class="temperature" >
              <span >${Math.round(data[0].main.temp)}°
                        <span >C</span>
              </span>

              
            </div>
           <div class="imidite">
             <div class="font-size-50" >
                  <span><i class="owf owf-957 font-size-50"></i></span>
                   <span class="text">${Math.round(data[0].wind.speed * 3,6) + " "}km/h</span>
             </div>
             <div class="vent font-size-50">
                <span><i class="owf owf-904 font-size-50"></i></span>
               <span class="text">${data[0].main.humidity}</span>
             </div>
           </div>
        `
        return todaytempl;


    }
    function otherdaymeteo(data) {
        let template = `
            <div class="col-xs-2 bor ">
             
                
                   <span class="">${convertDate(data.dt).substr(0, 3)}
                   </span>
                   <i class=" owf owf-${data.weather[0].id} "></i>
                   <div class="temp">
                     <span>${Math.round(data.main.temp_min)+ "°C"}</span>
                          <span>-</span>
                   
                    <span> ${Math.round(data.main.temp_max)+ "°C"}</span>
                   </div>
                 
               </div>
            </div>
         </div>`

        return template;
    }

    function convertDate(data) {
        var d = new Date(data * 1000);
               console.log(d)
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
    var fetchData = (evt,ville="paris") => {
        
        

        var location = encodeURIComponent(ville);
         console.log("sfsdfsdfsd")
        var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
        var urlSuffix = '&APPID=a4da4aea209d0977a955ead3516b9c1f&units=metric';
        var url = urlPrefix + location + urlSuffix;
       
        var form = $(this);
        $.ajax(url, {
            type: 'POST',
            success: function (result) {
                $('.city').text(result.city.name)
                var app = $('#app');
                $('#app').children().remove()
                 $('#app2').children().remove()
        $('.bor').remove()
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
    $('#iconsearch').on('click',(e)=>{
        console.log('click')
           fetchData(e,inputsearch.val())
    })
   $('.menu').on('click',()=>{
       console.log("lick")
         $('.sidebar').toggleClass('active')
   })
    fetchData()
});