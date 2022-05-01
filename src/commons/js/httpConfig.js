import axios from "axios";
const url=process.env.REACT_APP_SERVER_ADDRESS

export default axios.create({
    baseUrl:url,
    header:{
        "Content-Type": "application/json",
    }

});