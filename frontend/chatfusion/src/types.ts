export type LoginDetails = {
    email: string,
    password: string
}

export type SignUpDetails = {
  email:string,
  password:string,
  username:string,
  profile:string
}

export interface MessageType {
    id: number;
    content: string;
    user: User;
    timestamp: string;
    chat?:Chat
  }
  
  export interface Chat {
    id: number;
    isGroup:boolean,
    groupname: string;
    messages: MessageType[];
    createdBy:User,
    admins:User[],
    users:User[]
  }
  
  export interface User {
    id: number;
    username: string;
    email:string;
    profile:string;
  }

  export interface SignInPayload{
    email:string,
    password:string
  }

  export interface SignInResponse{
    isAuthenticated:boolean,
    token:string
  }
  
  export interface SendMessagePayload{
    userId?:number,
    chatId?:number,
    content:string
  }