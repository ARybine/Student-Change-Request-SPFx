import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'Wp1ReactWebPartStrings';
import Wp1React from './components/Wp1React';
import { IWp1ReactProps } from './components/IWp1ReactProps';

export interface IWp1ReactWebPartProps {
  description: string;
}

export default class Wp1ReactWebPart extends BaseClientSideWebPart <IWp1ReactWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWp1ReactProps> = React.createElement(
      Wp1React,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
