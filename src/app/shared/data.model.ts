export interface User_Data{
    UEmail:string|undefined|null,
    Passwd:string|undefined|null,
    Mobnumber?:string
}

export interface Ques_Data{
    qnId:number,
    qn:string|undefined|null,
    imageName:string|undefined|null,
    option1:string|undefined,
    option2:string|undefined,
    option3:string|undefined,
    option4:string|undefined,
    ans:number
}

export interface Get_User{
    attempts?:null,
    mobnumber:string|null,
    uEmail:string,
    uId:number
}

export interface Answers{
    QnId:number,
    Qn:string|undefined|null,
    ImageName:string|undefined|null,
    selected:number
}

export interface Answer_Data{
    answered:Array<Answers>,
    Time_spent:string
}

export interface Attempt_Data{
    Entry_id?:number,
    Date:string,
    UId:number,
    Score:number,
    TimeSpent:number,
    UIdNavigation?:null
}

export interface Recv_Attempt_Data{
    entry_id?:number,
    date:string,
    uId:number,
    score:number,
    timeSpent:number,
    uIdNavigation?:null
}