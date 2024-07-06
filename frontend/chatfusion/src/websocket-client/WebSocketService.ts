import SockJS from "sockjs-client";
import { Client, Frame, Message, over } from "stompjs";
import { MessageType, SendMessagePayload } from "../types";


function getCookie(name:string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
  }

class WebSocketService {
    private readonly url: string;
    private client?:Client;
    private chatSubscriptions:{ [id: string] : any; };
  
    constructor(url: string) {
      this.url = url;
      this.client = undefined
      this.chatSubscriptions = {}
    }
  
    connect(){
        console.log('Trying to connect to URL:'+this.url+', using SockJs')
        const socket = new SockJS(this.url)
        this.client = over(socket)
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        };
        this.client.connect(headers,()=>{console.log('Connected to websocket live server.')},this.onError)
        console.log('Current subscriptions')
        console.log(this.chatSubscriptions.keys)
    }

    subscribe(endpoint: string, onMessageReceive: (message: any) => void) {
        if (this.client && this.client.connected && !(endpoint in this.chatSubscriptions)) {
          console.log(`Subscribing to endpoint: ${endpoint}`);
          const newSubscription = this.client.subscribe(endpoint, onMessageReceive);
          this.chatSubscriptions[endpoint] = newSubscription;
          console.log('Current subscriptions:')
          for(let endpoint in this.chatSubscriptions){
            console.log(`Subscribed to endpoint: ${endpoint}`)
          }
        } else {
          console.log(`Unable to subscribe to ${endpoint}. Client connected: ${this.client?.connected}`);
        }
    }

    unsubscribe(endpoint:string){
        if(this.client && this.client.connected && endpoint in this.chatSubscriptions){
            this.client.unsubscribe(endpoint)
            delete this.chatSubscriptions[endpoint]
        }
        else{
            console.log('Connection with websocket has not been established yet.')
        }
    }

  
    disconnect(){
        if(this.client && this.client.connected){
            for(let endpoint in this.chatSubscriptions){
                this.unsubscribe(endpoint)
            }
            this.client?.disconnect(()=>{
                console.log('Websocket disconnected')
            })
        }
        else{
            console.log('Connection with websocket has not been established yet.')
        }
    }
        

    onError(error:string|Frame) {
        console.error('WebSocket Error:', error);
    }

    sendMessage(message:SendMessagePayload){
        if(this.client && this.client.connected){
            this.client?.send("/app/message", {}, JSON.stringify(message))
        }
        else{
            console.log('Connection with websocket has not been established yet.')
        }
    }
  }
  
  export default WebSocketService;
  