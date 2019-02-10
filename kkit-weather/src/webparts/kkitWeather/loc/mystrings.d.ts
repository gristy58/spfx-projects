declare interface IKkitWeatherWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  APIFieldLabel: string;
    LocationFieldLabel: string;
    BGColorFieldLabel: string;
    TXTColorFieldLabel: string;
    UnitsFieldLabel: string;
    DaysFieldLabel: string;
    showFCFieldLabel: string;
    showMinMaxFieldLabel: string;
    CacheFieldLabel: string;
    CacheWeatherFieldLabel: string;
    CacheLengthFieldLabel: string;
    regionFieldLabel: string;
    onLabel: string;
    offLabel: string;
}

declare module 'KkitWeatherWebPartStrings' {
  const strings: IKkitWeatherWebPartStrings;
  export = strings;
}
