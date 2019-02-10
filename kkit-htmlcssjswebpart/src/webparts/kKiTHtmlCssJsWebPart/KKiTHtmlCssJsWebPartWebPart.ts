import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import styles from './KKiTHtmlCssJsWebPartWebPart.module.scss';
import * as strings from 'KKiTHtmlCssJsWebPartWebPartStrings';
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
import { SPComponentLoader } from '@microsoft/sp-loader';

export interface IKKiTHtmlCssJsWebPartWebPartProps {
  htmlCode:string;
  csscode:string;
  externalcs:string;
  externaljs:string;
}

export default class KKiTHtmlCssJsWebPartWebPart extends BaseClientSideWebPart<IKKiTHtmlCssJsWebPartWebPartProps> {

  public render(): void {
    var output = '';

    if(this.properties.externalcs)
    {
      
      try {
        SPComponentLoader.loadCss(this.properties.externalcs);
      }
      catch(err) {
        console.log(err.message);
      }
    }

    if(this.properties.externaljs)
    {
      
      try {
        SPComponentLoader.loadScript(this.properties.externaljs);
      }
      catch(err) {
        console.log(err.message);
      }
    }
    if(this.properties.csscode)
    {
      output += '<style>'+ this.properties.csscode +'</style>'
    }

    if(this.properties.htmlCode)
    {
      output += this.properties.htmlCode;
    }



    this.domElement.innerHTML = output;


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
              groupName: strings.GroupName,
              groupFields: [
                PropertyFieldCodeEditor('htmlCode', {
                  label: 'Edit HTML Code',
                  panelTitle: 'Edit HTML Code',
                  initialValue: this.properties.htmlCode,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId',
                  language: PropertyFieldCodeEditorLanguages.HTML
                }),
                PropertyPaneTextField('externaljs', {
                  label: "URL to external JavaScript"
                }),
                PropertyPaneTextField('externalcss', {
                  label: "URL to external stylesheet"
                }),
                PropertyFieldCodeEditor('csscode', {
                  label: 'Edit CSS Code',
                  panelTitle: 'Edit CSS Code',
                  initialValue: this.properties.csscode,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId',
                  language: PropertyFieldCodeEditorLanguages.css
                })
              ]
            }
          ]
        }
      ]
    };
  }
}


