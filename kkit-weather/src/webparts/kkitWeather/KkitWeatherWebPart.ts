import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import styles from './KkitWeatherWebPart.module.scss';
import * as strings from 'KkitWeatherWebPartStrings';

import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
import * as $ from 'jquery';
import * as moment from 'moment';

export interface IKkitWeatherWebPartProps {
  apikey: string;
  location: string;
  TempUnits: boolean;
  days: number;
  backgroundcolor: string;
  textcolor: string;
  showForecast: boolean;
  showMinMax: boolean;
  showRegion: boolean;
  cachelength: number;
  cachedweather: string;
  cachedTimestamp: Date;
}


export default class KkitWeatherWebPart extends BaseClientSideWebPart<IKkitWeatherWebPartProps> {

  public render(): void {
  

if(this.properties.apikey == null || this.properties.location == null)
{
  this.domElement.innerHTML = "Please Enter API and Location <br/> Register for an API key <a href=https://www.apixu.com/>https://www.apixu.com/</a>";
  return;
}

if(this.properties.cachedweather == null && this.properties.apikey != null && this.properties.location != null)
{
  console.log("First Run");
      this.getWeather();
      this.domElement.innerHTML = this.displayWeather();
      return;
} else 
{
  var data = JSON.parse(this.properties.cachedweather);
  var now = new Date();
  var timestamp = moment(this.properties.cachedTimestamp).add(this.properties.cachelength, 'hours').toDate();

    if(this.properties.location != data.location.name || now > timestamp)
    {
      console.log("New Location or Cache Expired");
        this.getWeather();
        this.domElement.innerHTML = this.displayWeather();
    } else
    {
      console.log("Cache Valid");
      this.domElement.innerHTML = this.displayWeather();
    }

}

    
    
  }

public displayWeather(): string
{
  var html = '';
  var data = JSON.parse(this.properties.cachedweather);


  html += `<div class="${ styles.showWeather }" style=color:`+ this.properties.textcolor +`;background-color:` + this.properties.backgroundcolor + `>`;
  html += `<h2 class="${ styles.h2 }">` + data.location.name;  
    if(this.properties.showRegion)
    {
      html +=  ", "+ data.location.region +"</h2>"; 
    } else 
    {
      html +=  "</h2>"; 
    }
  html += `<div class="${ styles.today }">`;
    if(this.properties.TempUnits){
       html += `<div class="${ styles.temp }">` + data.current.temp_c + `<sup class="${ styles.sup }">&degC</sup> </div>`;
    } else 
    {
      html += `<div class="${ styles.temp }">` + data.current.temp_f + `<sup class="${ styles.sup }">&degF</sup> </div>`;
    }
  html += `<div class="${ styles.icon }">`;
  html += `<img class="${ styles.iconimg }" src=http:` + data.current.condition.icon + " alt='"+data.current.condition.text+"'></div></div>";
  html += `<br/>`;
      if(this.properties.showMinMax){
          html += `<div class="${ styles.minmax }">`;
          if(this.properties.TempUnits){
            html += `Max: ` + Math.round(data.forecast.forecastday[0].day.maxtemp_c) + `<sup class="${ styles.sup }">&degC</sup> Min: ` +Math.round(data.forecast.forecastday[0].day.mintemp_c) + `<sup class="${ styles.sup }">&degC</sup></div>`;
          } else 
          {
            html += `Max: ` + Math.round(data.forecast.forecastday[0].day.maxtemp_f) + `<sup class="${ styles.sup }">&degF</sup> Min: ` +Math.round(data.forecast.forecastday[0].day.mintemp_f) + `<sup class="${ styles.sup }">&degF</sup></div>`;
          }
      }
      
      if(this.properties.showForecast){

        html += `<br/>`;
            html += `<table class="${ styles.forecasttable }">`;
              $.each(data.forecast.forecastday.slice(1,this.properties.days+1), function(index, val) {
                html += "<tr><td width='100px'><b>" + moment(val.date).format('dddd') + "</b></td>";
                html += `<td width='66px'><img class="${ styles.forecastimg }" src='https:` + val.day.condition.icon + `' alt='"+val.day.condition.text+"'></td>`;
                if(this.properties.TempUnits){
                  html += `<td width='66px'>`+ Math.round(val.day.maxtemp_c) + `<sup class="${ styles.sup }">&degC</sup></td><td width='25%'>`+ Math.round(val.day.mintemp_c) + `<sup class="${ styles.sup }">&degC</sup></td></tr>`;
                } else 
                {
                  html += `<td width='66px'>`+ Math.round(val.day.maxtemp_f) + `<sup class="${ styles.sup }">&degF</sup></td><td width='25%'>`+ Math.round(val.day.mintemp_f)+ `<sup class="${ styles.sup }">&degF</sup></td></tr>`;
                }

              }.bind(this));
              
            html += "</table>";
    }
  html += '</div>';

  return html;

}

public getWeather(): void
{
  $.ajax({
    url: "https://api.apixu.com/v1/forecast.json", 
    dataType: "json",
    type: "GET",
    data: {
      q: this.properties.location,
      key: this.properties.apikey,
      days: "6",
    },
    success: function(data) {
      this.properties.cachedweather = JSON.stringify(data);
      this.properties.cachedTimestamp = new Date();
    }.bind(this),
  });

}

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
  }

  

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('apikey', {
                  label: strings.APIFieldLabel
                }),
                PropertyPaneTextField('location', {
                  label: strings.LocationFieldLabel
                }),
                PropertyPaneToggle('TempUnits', {
                  label: strings.UnitsFieldLabel,
                  onText: 'Celcius',
                  offText: 'Farenheit'
                }),
                               
                PropertyPaneToggle('showForecast', {
                  label: strings.showFCFieldLabel,
                  onText: strings.onLabel,
                  offText: strings.offLabel
                }),
                PropertyPaneSlider('days',{  
                  label:strings.DaysFieldLabel,  
                  min:1,  
                  max:5,  
                  value:5,  
                  showValue: true,  
                  step:1                
                }),
                PropertyPaneToggle('showRegion', {
                  label: strings.regionFieldLabel,
                  onText: strings.onLabel,
                  offText: strings.offLabel
                }),
                PropertyPaneToggle('showMinMax', {
                  label: strings.showMinMaxFieldLabel,
                  onText: strings.onLabel,
                  offText: strings.offLabel
                }),
                PropertyPaneSlider('cachelength',{  
                  label:strings.CacheFieldLabel,  
                  min:1,  
                  max:24,  
                  value:2,  
                  showValue: true,  
                  step:1                
                }),
                 PropertyFieldColorPicker('backgroundcolor', {
                  label: strings.BGColorFieldLabel,
                  selectedColor: this.properties.backgroundcolor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Precipitation',
                  key: 'BGcolorFieldId'
                }),
                PropertyFieldColorPicker('textcolor', {
                  label: strings.TXTColorFieldLabel,
                  selectedColor: this.properties.textcolor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Precipitation',
                  key: 'TXTcolorFieldId'
                })
               
                
              ]
            }
          ]
        }
      ]
    };
  }
}
