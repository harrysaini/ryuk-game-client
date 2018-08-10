export function myFetch(url,options){
	var response,error;
	return new Promise((resolve,reject)=>{
		fetch(url,options).then(res=>{
			if(res.status===200){
				return res.json();
			}else{
				response = res;
				return Promise.reject(res.json());
			}
		}).then(res=>{
			console.log(res);
			resolve(res);
		}).catch(err=>{
			if(err instanceof Promise){
				return err;
			}else{
				reject(err)
			}
		}).then(res=>{
			reject(res);
		});
	});	
}