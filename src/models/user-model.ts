
export class User {
    private UserName: string;
    private Password:string;
    private access_token:string;
    private token_type:string;
    private Role:string;
    private isAuthenticated:boolean;
    private authorizationString:string;
    public constructor() {  }
    public setCurrentUser(
        UserName:string,
        Password:string,
        access_token:string,
        token_type:string,
        isAuthenticated:boolean){
        this.UserName=UserName;
        this.Password=Password;
        this.access_token=access_token;
        this.token_type=token_type;
        this.isAuthenticated=isAuthenticated;
        this.setAuthorization(this.token_type,this.access_token);   
       
    }
    public setAuthorization(token_type:string,access_token:string) 
    {
        this.authorizationString=this.token_type+' '+this.access_token;
    }
    public getAuthorization():string{
        return this.authorizationString;
    }
    public getAccessToken():string{

        return this.access_token;
    }
    public getUserName():string{
        return this.UserName;
    }
    public setisAuthenticated(_state:boolean)
    {
        this.isAuthenticated=_state;        
    }
    public getisAuthenticated():boolean{
        return this.isAuthenticated;
    }
    public setRole(_role:string){
        return new Promise((resolve, reject) => {    
            this.Role=_role;
          });      
    }
public getRole():string
{
    return this.Role;
}
}