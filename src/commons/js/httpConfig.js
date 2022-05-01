import axios from "axios";
const url=process.env.REACT_APP_SERVER_ADDRESS

console.log("url", url)
const httpC= axios.create({
    baseURL: url,
    header:{
        "Content-Type": "application/json",
    }
    
});
export default httpC;