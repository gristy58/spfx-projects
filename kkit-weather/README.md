## kkit-weather

The KKiT Weather WebPart provides both current weather and the upcoming forecast utilising the free apixu.com API.

To get started simply signup for a apixu.com API Key and install the application to your SharePoint Application Catalog.

The Webpart has various displays modes:

#### Full Size Weather with Forecast
![alt text][largeweather]

#### Compact Weather
![alt text][largeweather]

The WebPart has the following configuration available:

* **APIXU API Key** - Set your APIXU API Key
* **Weather Location** - Set a valid APIXU Location
* **Units** - Choose between Celsius and Fahrenheit
* **Show Forecast** - Show the upcoming forecast
* **Days** - Define how many days 1-5 you would like displayed
* **Show Region** - Show or Hide the region i.e. South Australia
* **Show Temperatures** - Show or Hide the temperatures for the current forecast
* **Cache Length (Hours)** - The WebPart stores a cache to ensure you do not access the API on every page refresh - configure the delay before the next call in hours.
* **Background Color** - Select the background color.
* **Text Color** - Select the text color.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

[largeweather]: https://static.wixstatic.com/media/b5408a_18f4112c98ec426f911025a94348cd99~mv2.png "Large Weather"
[compactweather]: https://static.wixstatic.com/media/b5408a_0784edc4ce36491081fbaeb78f736532~mv2.png "Compact Weather"

