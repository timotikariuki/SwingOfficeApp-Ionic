export class UserModel {

  constructor(
      public token: string = '',
      public isloggedin: boolean = false,
      public isteacher: boolean = false,
      public contactid: string = '',
      public school: string = '',
      public mailschool: string = '',
      public schoolname: string = '',
      public language: string = '',
      public languagecode: string = '',
      public subfolder: string = '',
      public subdomain: string = ''
  ) {}

}
