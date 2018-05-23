Vue.component('WeatherBar', {
  template: `
  <div class="weathers">
    <center>
      <div class="row">
        <div class="col-md-6">
          <div style="text-align:center;padding:1em 0;">
            <h5><span style="color:gray;">Clock Local</span><br />Jakarta, Indonesia</h5>
            <iframe scrolling="no" frameborder="no" clocktype="html5" style="overflow:hidden;border:0;margin:0;padding:0;width:120px;height:40px; " src="https://www.clocklink.com/html5embed.php?clock=004&timezone=Indonesia_Jakarta&color=gray&size=120&Title=&Message=&Target=&From=2018,1,1,0,0,0&Color=gray"></iframe>
          </div>
        </div>
        <div class="col-md-6">
          <h3>Weather today:</h3>
          <img :src="weather.icon" />
          <h4>{{weather.text}}</h4>
        </div>
      </div>
    </center>
  </div>
  `,
  props:['weather'],
  data: function () {
    return {

    }
  },
  methods: {

  }
})
