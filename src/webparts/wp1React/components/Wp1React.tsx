import * as React from 'react';
import { Version, EnvironmentType, Environment } from '@microsoft/sp-core-library';
import styles from './Wp1React.module.scss';
import { IWp1ReactProps } from './IWp1ReactProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import { Label } from 'office-ui-fabric-react/lib/Label';

import { sp } from "@pnp/sp/presets/all";  
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';

import MockupBannerCourseHttpClient from './MockupBannerCourses';
import MockupTermsHttpClient from './MockupTerms';

export interface IControls
{
  InstructorName:string;
  StudentName:string;
  StudentNameDisabled:boolean;
  ProgramName:string;
  ProgramNameDisabled:boolean;
  CourseTitle:string;
  CourseTitleDisabled:boolean;
  CourseSelectionList: IDropdownOption[];
  CourseNumber:string;
  CourseNumberDisabled:boolean;
  TermSelectionList: IDropdownOption[];
  SectionDisabled:boolean;
  MarkChangedFromDisabled:boolean;
  MarkChangedToDisabled:boolean;
}

//#region Export Sharepoint List Interface
export interface IBannerCourse {
  Title:string;
  Id:string;
}

export interface IBannerCourses {
  value:IBannerCourse[];
}

export interface ITerms {
  value:ITerm[];
}

export interface ITerm {
  Title:string;
  Id:string;
}

//#endregion

export default class Wp1React extends React.Component<IWp1ReactProps, IControls, {}> {
  
  constructor(props) {
    super(props);
    this.state={
      InstructorName:"CURRENT USER - INSTRUCTOR",
      StudentName:"N/A",
      StudentNameDisabled:true,
      ProgramName:"N/A",
      ProgramNameDisabled:true,
      CourseTitle:"N/A",
      CourseTitleDisabled: true,
      CourseSelectionList:[],
      CourseNumber:"N/A",
      CourseNumberDisabled:true,
      TermSelectionList:[],
      SectionDisabled:true,
      MarkChangedFromDisabled:true,
      MarkChangedToDisabled:true
      };

      sp.web.currentUser.get().then((user) => {
        this.setState({InstructorName:user.LoginName});
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>' + this.state.InstructorName);
        });

      

      this.getGrade_Click=this.getGrade_Click.bind(this);

      this._renderCoursesAsync();
      this._renderTermsAsync();      

    }


  
    //#region Render Banner Courses
    private _renderCoursesAsync()
    {
      if (Environment.type == EnvironmentType.Local)
      {
        this._getMockupBannerCoursesData().then((response) => {
          this._renderCoursesList(response.value);
        });
      }
    }

    private _getMockupBannerCoursesData(): Promise<IBannerCourses>{
      return MockupBannerCourseHttpClient.get().then((data: IBannerCourse[]) => {
        var bannerData: IBannerCourses ={value :data};
        return bannerData;
      }) as Promise<IBannerCourses>;
    }

  private _renderCoursesList (_courses: IBannerCourse[]):void
  {
    let courseList =this.state.CourseSelectionList;
    _courses.forEach((item:IBannerCourse) => {
      courseList.push({
        key: item.Id,
        text: item.Title
      });
    });
    this.setState({CourseSelectionList: courseList});
    }
    //#endregion

    //#region Terms
    private _renderTermsAsync(): void
    {
      if (Environment.type == EnvironmentType.Local)
      {
        this._getMockupTermsData().then((response) => {
          this._renderTermsList(response.value);
        });
      }
    }

    private _getMockupTermsData(): Promise<ITerms>{
      return MockupTermsHttpClient.get().then((data: ITerm[]) => {
        var termData: ITerms ={value :data};
        return termData;
      }) as Promise<ITerms>;
    }

  private _renderTermsList(_terms: ITerm[]):void
  {
    let termList =this.state.TermSelectionList;
    _terms.forEach((item:ITerm) => {
      termList.push({
        key: item.Id,
        text: item.Title
      });
    });
    this.setState({TermSelectionList: termList});
    }
    //#endregion

  private  getGrade_Click(){

    var s = JSON.parse('{"grades": [{"surrogateId": 0, "crn": "string", "subject": "string", "courseNumber": "string", "courseTitle": "string", "grade": "string"}], "lastName": "Rybin", "firstName": "Alex", "middleInitial": "string", "programDescription": "string"}');
    
    this.setState({StudentName:s.firstName + ' ' + s.lastName});
    
    //this.setState({StudentName: 'Alex Rybin'});
    this.setState({StudentNameDisabled: false});
    this.setState({ProgramName:'Motorcycling'});
    this.setState({ProgramNameDisabled: false});
    this.setState({CourseTitle:'Fast riding'});
    this.setState({CourseTitleDisabled: false});
    this.setState({CourseNumber:'S1000RR'});
    this.setState({CourseNumberDisabled: false});
    this.setState({SectionDisabled:false});
    this.setState({MarkChangedFromDisabled:false});
    this.setState({MarkChangedToDisabled:false});

          
    sp.web.currentUser.get().then((user) => {
      this.setState({InstructorName:user.LoginName});
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>' + this.state.InstructorName);
      });
          

    //this.context.aadHttpClientFactory
    //  .getClient('https://contoso.azurewebsites.net')
    //  .then((client: AadHttpClient): void => {
    //    client
    //      .get('https://contoso.azurewebsites.net/api/orders', AadHttpClient.configurations.v1)
    //      .then((response: HttpClientResponse): Promise<Order[]> => {
    //        return response.json();
    //      })
    //      .then((orders: Order[]): void => {
    //        // process data
    //      });
    //  });
    //}
  }

  public render(): React.ReactElement<IWp1ReactProps> {

    const optionsAcademicSession: IDropdownOption[] = [
      { key: '1', text: 'Fall' },
      { key: '2', text: 'Winter' },
      { key: '3', text: 'Summer' }
    ];
    const optionsSectionSelection: IDropdownOption[] = [
      { key: '1', text: 'Section 1' },
      { key: '2', text: 'Section 2' },
      { key: '3', text: 'Section 3' }
    ];
    const optionsCourseSection: IDropdownOption[] = [
      { key: '1', text: 'CRN-COURSE TITLE-COURSE# 1' },
      { key: '2', text: 'CRN-COURSE TITLE-COURSE# 2' },
      { key: '3', text: 'CRN-COURSE TITLE-COURSE# 3' }
    ];
    const dropdownStyles: Partial<IDropdownStyles> = {
      dropdown: { }
    };   
   
    return (
      <div className={ styles.wp1React }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <h2>{escape(this.props.description)}</h2>
              <Label htmlFor={'#fromUser'}>FROM:</Label>
              <TextField id="fromUser" value={this.state.InstructorName} readOnly/>
               <div>
               <Dropdown placeholder="Select an option" 
               label="COURSE:" 
               options={this.state.CourseSelectionList} 
               styles={dropdownStyles}/>
               </div>
               <div>
                 <div className={styles.leftColumn}>
                  <Label htmlFor={'#studentNumber'}>STUDENT NUMBER</Label>
                  <TextField id="studentNumber" maxLength={9}/>
                 </div>
                 <div className={styles.rightColumn}>
                 <Label htmlFor={'#academicTerm'}>TERM:</Label>
                 <Dropdown id="academicTerm" placeholder="Select an option" 
                      options={this.state.TermSelectionList}  
                      styles={dropdownStyles} />
                  </div>
               </div>
                <div className={styles.fieldSectionRight}>
                  <PrimaryButton id="btnGetGrade" text="GET GRADE" allowDisabledFocus onClick={this.getGrade_Click}/>
                </div>
               
               <div className={styles.fieldGroup}>
               <TextField label="STUDENT NAME"  value={this.state.StudentName} readOnly disabled={this.state.StudentNameDisabled} />
               <TextField label="PROGRAMM:"  value={this.state.ProgramName}  readOnly disabled={this.state.ProgramNameDisabled}/>
  
              
               <Dropdown placeholder="Select an option" 
               label="SECTION:" 
               options={optionsSectionSelection} 
               styles={dropdownStyles} disabled={this.state.SectionDisabled}/>
               <div>
                 <div className={styles.leftColumn}><TextField label="MARK CHANGED FROM:" readOnly disabled={this.state.MarkChangedFromDisabled}/></div>
                 <div className={styles.rightColumn}><TextField label="MARK CHANGED TO:" disabled={this.state.MarkChangedToDisabled}/></div>
               </div>
               <TextField label="RATIONALE" multiline rows={6} />
               <div>
                 <div className={styles.leftColumn}><DefaultButton text="Cancel" allowDisabledFocus  /></div>
                 <div className={styles.rightColumn}><PrimaryButton text="Submit" allowDisabledFocus  /></div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
