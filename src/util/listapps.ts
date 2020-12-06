import { appList } from '../appList';


appList.list().then((apps: Array<string>) => console.log(apps));