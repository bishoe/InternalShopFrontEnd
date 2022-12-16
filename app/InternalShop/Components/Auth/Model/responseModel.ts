import { ResponseCode } from "../Enum/ResponseCode";

 
export class ResponseModel{
  public  responseCode :ResponseCode=ResponseCode.NotSet;
  public responseMessage:string ="";
  public  dateSet :any
}
