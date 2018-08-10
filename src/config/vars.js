import developmentVariables from './development';
import productionVariables from './production';
let exportVariable;


if(process.env.NODE_ENV==='production'){
	exportVariable = productionVariables;
}else{
	exportVariable = developmentVariables;
}

export default exportVariable;