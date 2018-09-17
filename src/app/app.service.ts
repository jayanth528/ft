import { Injectable } from '@angular/core';
import { Http,URLSearchParams } from '@angular/http';

@Injectable()
export class DataService{

	isSidenavOpen:boolean = true;
	isSpinnerVisible:boolean = false;
    currentExpenseMonth;

	selectedCat = 2;
	eventsNavData = [{link:"addEvents",icon:"add_to_photos",label:"Mark Event"}, {link:"defineEvents",icon:"add_to_photos",label:"Manage Events"}, {link:"reports",icon:"date_range",label:"Reports"} ];
    expensesNavData = [ {link:"manage",icon:"create",label:"Manage"}, {link:"mileage",icon:"local_gas_station",label:"Mileage"}];	
    allExpenseEvents=[];

	constructor() {
		this.getCurrentExpenseMonth();
		this.getAllExpenseEvents();
	}

	getAllFuelEvents() {
		if(localStorage.getItem("mileage_data")) {
		   	return JSON.parse(localStorage.getItem("mileage_data")) ;
		}
		return [];
    }

    setMileage(selectedFuelEvent, runKm) {
    	return new Promise((resolve, reject) => {
		  try{
		  	    let storedEvents = [];
		  	    if(localStorage.getItem("mileage_data") == "" || localStorage.getItem("mileage_data") == null) {
			    	reject('No Mileage Data Present. Exception');
			    }else {
			    	storedEvents = JSON.parse(localStorage.getItem("mileage_data"));
			    	const evToBeReplaced = storedEvents.find((obj)=>{ return obj.id == selectedFuelEvent.id})
					evToBeReplaced.mileage = (runKm / evToBeReplaced.fuelValue).toFixed(2) ;
			    	localStorage.setItem("mileage_data",JSON.stringify(storedEvents));	
			    	resolve('Mileage set  Successfully.');
			    }
		  }catch(err){
		  	reject('Exception');	
		  }
		});
    }

    deleteSelectedFuelEvent(selectedFuelEvent) {
        return new Promise((resolve, reject) => {
		  try{
		  	    let storedEvents = [];
		  	    if(localStorage.getItem("mileage_data") == "" || localStorage.getItem("mileage_data") == null) {
			    	reject('No Mileage Data Present. Exception');
			    }else {
			    	storedEvents = JSON.parse(localStorage.getItem("mileage_data"));
			    	const evToBeDeleted = storedEvents.find((obj)=>{ return obj.id == selectedFuelEvent.id})
					storedEvents.splice(storedEvents.indexOf(evToBeDeleted), 1) ;
			    	localStorage.setItem("mileage_data",JSON.stringify(storedEvents));	
			    	resolve('Fuel event Deleted Successfully.');
			    }
		  }catch(err){
		  	reject('Exception');	
		  }
		});
	}

	saveNewFuelEvent(fuelValue, date) {
        return new Promise((resolve, reject) => {
		  try{
		  	    let storedEvents = [];
		  	    if(localStorage.getItem("mileage_data") == "" || localStorage.getItem("mileage_data") == null) {
			    	storedEvents.push({fuelValue:fuelValue, id:date.valueOf()});
			    	localStorage.setItem("mileage_data",JSON.stringify(storedEvents));
			    }else {
			    	storedEvents = JSON.parse(localStorage.getItem("mileage_data"));
					storedEvents.push({fuelValue:fuelValue, id:date.valueOf()});
			    	localStorage.setItem("mileage_data",JSON.stringify(storedEvents));	
			    }
			    resolve('Fuel event Created Successfully.');
		  }catch(err){
		  	reject('Exception');	
		  }
		});
	}


    getExpenseEventById(id){
    	const expObj = this.allExpenseEvents.find((obj)=>{ return obj.id == id});
        return expObj;
    }

    getAllExpenseEvents() {
		if(localStorage.getItem("expense_events")) {
		   	this.allExpenseEvents  = JSON.parse(localStorage.getItem("expense_events")) ;
		}
    }


	getAllExpensesForMonth(monthId) {
		let allExpenseEventMonthsStr = localStorage.getItem("storedAllExpenseEvents");
        if(allExpenseEventMonthsStr){
            const allExpenseEventMonths = JSON.parse(allExpenseEventMonthsStr);
            const obj = allExpenseEventMonths.find((obj)=>{ return obj.monthid == monthId});
            if(obj!=null){
            	return obj.monthData;
            }
            return [];
        }
        return [];
	}


	deleteExpenseEvent(expenseEvent) {
  		 return new Promise((resolve, reject) => {
		  try{
	  	    	let allExpenseEventMonths = JSON.parse(localStorage.getItem("storedAllExpenseEvents"));
		    	const obj = allExpenseEventMonths.find((obj)=>{ return obj.monthid == this.currentExpenseMonth.id});
		    	
                const expEventToBeDeleted = obj.monthData.find((expEv)=>{return expEv.timeStamp == expenseEvent.timeStamp});

	    		obj.monthData.splice(obj.monthData.indexOf(expEventToBeDeleted), 1);

	    		allExpenseEventMonths.splice(allExpenseEventMonths.indexOf(obj),1);
	    		allExpenseEventMonths.push(obj);
            
		    	localStorage.setItem("storedAllExpenseEvents",JSON.stringify(allExpenseEventMonths));
		    	resolve('Expense Event Deleted Successfully.');
		  }catch(err){
		  	reject('Exception');	
		  }
		});
	}



	markExpenseEvent(event, selectedDate, eventValue) {
  		 return new Promise((resolve, reject) => {
		  try{
		  	    let storedAllEvents = [];
		  	    let today = new Date();  
                let thisMonth = today.getMonth()+1;

		  	    if(selectedDate!=null){
			  	    today = new Date(selectedDate);  
			  	    thisMonth = today.getMonth()+1;
		  	    }
		  	    
		  	    const todayDataToSave  = today.getDate();
		  	    
		  	    if(localStorage.getItem("storedAllExpenseEvents") == "" || localStorage.getItem("storedAllExpenseEvents") == null) {
		  	    	const data = {eventid:event.id,eventValue:eventValue,timeStamp:today.getTime()};
			        const thisMonthsData = {monthid: this.currentExpenseMonth.id,monthName: this.currentExpenseMonth.name, monthData:[data]};
			    	storedAllEvents.push(thisMonthsData);
			    	localStorage.setItem("storedAllExpenseEvents",JSON.stringify(storedAllEvents));
			    	resolve('Event Marked Successfully.');
			    }else {
			    	let allExpenseEventMonths = JSON.parse(localStorage.getItem("storedAllExpenseEvents"));
			    	const obj = allExpenseEventMonths.find((obj)=>{ return obj.monthid == this.currentExpenseMonth.id});
			    	const data = {eventid:event.id,eventValue:eventValue,timeStamp:today.getTime()};
			    	if(!obj) {
			            const thisMonthsData = {monthid: this.currentExpenseMonth.id,monthName: this.currentExpenseMonth.name, monthData:[data]};
						allExpenseEventMonths.push(thisMonthsData);
			    	}else {
			    		obj.monthData.push(data);
			    		allExpenseEventMonths.splice(allExpenseEventMonths.indexOf(obj),1);
			    		allExpenseEventMonths.push(obj);
                  	}
			    	localStorage.setItem("storedAllExpenseEvents",JSON.stringify(allExpenseEventMonths));
			    	resolve('Event Marked Successfully.');
			    }
		  }catch(err){
		  	reject('Exception');	
		  }
		});
	}

	getCurrentExpenseMonth() {
        const currentExpenseMonthStr = localStorage.getItem("currentExpenseMonth");
        if(currentExpenseMonthStr!='') {
        	this.currentExpenseMonth = JSON.parse(currentExpenseMonthStr);
        }
	}

	saveCurrentExpenseMonth(month) {
       return new Promise((resolve, reject) => {
		  try{
		  	    this.currentExpenseMonth = month;
				localStorage.setItem("currentExpenseMonth",JSON.stringify(month));
		    	resolve('Expense Month Saved Successfully.');
		  }catch(err){
		  	reject('Exception');	
		  }
		});
    }

   getExpenseMonths() {
		let storedEvents = [];
		if(localStorage.getItem("expense_months") == "" || localStorage.getItem("expense_months") == null) {
	    	return [];
	    }else {
	    	
	    	return JSON.parse(localStorage.getItem("expense_months"));
	    } 
	}

	getExpenseEvents() {
		let storedEvents = [];
		const newEvent = {id:'101', name:'Add New Event ...'};
  	    if(localStorage.getItem("expense_events") == "" || localStorage.getItem("expense_events") == null) {
	    	return [newEvent];
	    }else {
	    	
	    	return (JSON.parse(localStorage.getItem("expense_events"))).concat([newEvent]);
	    } 
	}

    deleteExpenseMonth(event) {
		return new Promise((resolve, reject) => {
		  try{
				let allEvents = this.getExpenseMonths() ;  	    
                allEvents.splice(allEvents.findIndex(obj => {return obj.id==event.id}), 1);
			    localStorage.setItem("expense_months",JSON.stringify(allEvents));
		    	resolve('Expense Month Deleted Successfully.');
		  }catch(err){
		  	reject('Exception');	
		  }
		});
	}

	createExpenseMonth(eventName) {
        return new Promise((resolve, reject) => {
		  try{
		  	    let storedEvents = [];
		  	    if(localStorage.getItem("expense_months") == "" || localStorage.getItem("expense_months") == null) {
			    	storedEvents.push({name:eventName, id:(new Date()).valueOf()});
			    	localStorage.setItem("expense_months",JSON.stringify(storedEvents));
			    	resolve('Expense Month Created Successfully.');
			    }else {
			    	storedEvents = JSON.parse(localStorage.getItem("expense_months"));
					const itemWithSameName = storedEvents.find((item) => { return item.name == eventName});
 					
 					if(itemWithSameName) {
 						reject('Expense Month with this name already exists.');	
 					}else {
 						storedEvents.push({name:eventName, id:(new Date()).valueOf()});
			    		localStorage.setItem("expense_months",JSON.stringify(storedEvents));	
			    		resolve('Expense Month Created Successfully.');
 					}
			    }
		  }catch(err){
		  	reject('Exception');	
		  }
		});
	}

	createExpenseEvent(eventName) {
        return new Promise((resolve, reject) => {
		  try{
		  	    let storedEvents = [];
		  	    if(localStorage.getItem("expense_events") == "" || localStorage.getItem("expense_events") == null) {
		  	    	const id = new Date().valueOf();
			    	storedEvents.push({name:eventName, id:id});
			    	localStorage.setItem("expense_events",JSON.stringify(storedEvents));
			    	this.getAllExpenseEvents();
			    	resolve({message:'Event Created Successfully.',id:id});
			    }else {
			    	storedEvents = JSON.parse(localStorage.getItem("expense_events"));
					const itemWithSameName = storedEvents.find((item) => { return item.name == eventName});
 					
 					if(itemWithSameName) {
 						reject('Event with this name already exists.');	
 					}else {
 						const id = new Date().valueOf();
 						storedEvents.push({name:eventName, id:id});
			    		localStorage.setItem("expense_events",JSON.stringify(storedEvents));	
			    		this.getAllExpenseEvents();
			    		resolve({message:'Event Created Successfully.',id:id});
 					}
			    }
		  }catch(err){
		  	reject('Exception');	
		  }
		});
	}

	



	deleteEvent(event) {
		return new Promise((resolve, reject) => {
		  try{
				let allEvents = this.getEvents() ;  	    
                allEvents.splice(allEvents.findIndex(obj => {return obj.id==event.id}), 1);
			    localStorage.setItem("events",JSON.stringify(allEvents));
		    	resolve('Event Marked Successfully.');
		  }catch(err){
		  	reject('Exception');	
		  }
		});
	}

    createEvent(eventName) {
        return new Promise((resolve, reject) => {
		  try{
		  	    let storedEvents = [];
		  	    if(localStorage.getItem("events") == "" || localStorage.getItem("events") == null) {
			    	storedEvents.push({name:eventName, id:(new Date()).valueOf()});
			    	localStorage.setItem("events",JSON.stringify(storedEvents));
			    	resolve('Event Created Successfully.');
			    }else {
			    	storedEvents = JSON.parse(localStorage.getItem("events"));
					const itemWithSameName = storedEvents.find((item) => { return item.name == eventName});
 					
 					if(itemWithSameName) {
 						reject('Event with this name already exists.');	
 					}else {
 						storedEvents.push({name:eventName, id:(new Date()).valueOf()});
			    		localStorage.setItem("events",JSON.stringify(storedEvents));	
			    		resolve('Event Created Successfully.');
 					}
			    }
		  }catch(err){
		  	reject('Exception');	
		  }
		});
	}

	getEvents() {
		let storedEvents = [];
  	    if(localStorage.getItem("events") == "" || localStorage.getItem("events") == null) {
	    	return null;
	    }else {
	    	return JSON.parse(localStorage.getItem("events"));
	    } 
	}

	getTodayEvents() {
		return [];
	}

	markEvent(event, selectedDate) {
  		 return new Promise((resolve, reject) => {
		  try{
		  	    let storedAllEvents = [];
		  	    let today = new Date();  
                let thisMonth = today.getMonth()+1;

		  	    if(selectedDate!=null){
			  	    today = new Date(selectedDate);  
			  	    thisMonth = today.getMonth()+1;
		  	    }
		  	    
		  	    const todayDataToSave  = today.getDate();
		  	    
		  	    if(localStorage.getItem("storedAllEvents") == "" || localStorage.getItem("storedAllEvents") == null) {
			        const thisMonthsData = {month:thisMonth, monthData:[todayDataToSave]};

			    	storedAllEvents.push({id:event.id,name:event.name,data:[thisMonthsData]});

			    	localStorage.setItem("storedAllEvents",JSON.stringify(storedAllEvents));
			    	
			    	resolve('Event Marked Successfully.');
			    }else {
			    	let allEvents = JSON.parse(localStorage.getItem("storedAllEvents"));
			    	const obj = allEvents.find((obj)=>{ return obj.id == event.id});
			    	if(!obj) {
			    		const thisMonthsData = {month:thisMonth, monthData:[todayDataToSave]};
                        allEvents.push({id:event.id,name:event.name,data:[thisMonthsData]});
			    	}else {
			    		const monthData = obj.data.find((obj)=>{ return obj.month == thisMonth});
                        if(!monthData){
                        	  const thisMonthsData = {month:thisMonth, monthData:[todayDataToSave]};
                              obj.data.push(thisMonthsData);
                        }
			    		else{
				    		obj.data.map((monthObj) => {
				    		   if(monthObj.month == thisMonth) {
				    				if(monthObj.monthData.indexOf(todayDataToSave)>-1){
										reject('Cant Save. Event Already Present for today');	    					
				    				}else{
				    					monthObj.monthData.push(todayDataToSave);
				    				}	
				    		   }
				    		});	
			    		}
			    	}
			    	localStorage.setItem("storedAllEvents",JSON.stringify(allEvents));
			    	resolve('Event Marked Successfully.');
			    }
		  }catch(err){
		  	reject('Exception');	
		  }
		});
	}


	getEventDataForMonth(eventId, month) {
		return new Promise((resolve, reject) => {
		  try{
		  	    let storedAllEvents = [];
		  	    const thisMonth = month+1;
		  	    
		  	    if(localStorage.getItem("storedAllEvents") == "" || localStorage.getItem("storedAllEvents") == null) {
			        reject('No Report Data At All to Show');
			    }else {
			    	let allEvents = JSON.parse(localStorage.getItem("storedAllEvents"));
			    	const obj = allEvents.find((obj)=>{ return obj.id == eventId});
			    	if(!obj) {
			            reject('No Report Data For Selected Event to Show');
			    	}else {
			    		obj.data.map((monthObj) => {
			    		   if(monthObj.month == thisMonth) {
			    				resolve({data:monthObj});
			    		   }
			    		});
			    		reject('Data not found for this period .');
			    	}
			    }
		  }catch(err){
		  	reject('Exception');	
		  }
		});
	}

	deleteEventForADay(eventId, month, day) {
		return new Promise((resolve, reject) => {
		  try{
	  	    	let allEvents = JSON.parse(localStorage.getItem("storedAllEvents"));
		    	const eventData = allEvents.find((obj)=>{ return obj.id == eventId});
		    	const monthData = eventData
			    	.data.map((monthObj) => {
		    		   if(monthObj.month == month) {
		    				monthObj.monthData.splice(monthObj.monthData.indexOf(day),1);
		    				resolve('Data Deleted for the day ');
		    		   }
		    		});
                localStorage.setItem("storedAllEvents",JSON.stringify(allEvents));
		  }catch(err){
		  	reject('Exception');	
		  }
		});

	}
}