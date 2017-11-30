class User {
    private UserName: string;
    private Password:string;
    private access_token:string;
    private token_type:string;
    private role:string;
    private isAuthenticated:boolean;
    public constructor() {  }
    public setCurrentUser(access_token:string,token_type:string,isAuthenticated:boolean){
        this.access_token=access_token;
        this.token_type=token_type;
        this.isAuthenticated=isAuthenticated;
    }
    
}