import axios from "axios";
import {urlServer} from "./constans";


export default function API(conf = {
    method: 'GET',
    url: urlServer
}) {
    return axios({
        ...conf, url: urlServer + conf.url, headers: {
            "Authorization": ` Token ${localStorage.getItem("token")}`
        }
    });
}
