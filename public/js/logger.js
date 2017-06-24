function error_logger(where,what){

		if(!where){
			let newpos=document.createElement('div');
			newpos.setAttribute('class','w3-red');
			newpos.setAttribute('id','error');
			document.body.append(newpos);
		}
		what=what?what:"THERE is some error";
		loc=where?where:newpos;
		loc.style.display='block';
		where.innerHTML+=("<br>"+what.toString());
	}
	
function __log(where,what){

		if(where==undefined){
			let newpos=document.createElement('div');
			newpos.setAttribute('class','w3-grey');
			document.body.append(newpos);
		}
		
		what=what?what:"LOG";
		loc=where?where:newpos;
		where.innerHTML=(what.toString());
	}
	
