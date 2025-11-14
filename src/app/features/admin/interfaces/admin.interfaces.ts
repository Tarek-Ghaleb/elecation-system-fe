export interface MainPoints {
	id: number;
	title: string;
	description: string;
}

export interface Regions {
	id: number;
	name: string;
	isActive: string;
}

export interface School{
	id:number;
	name:string;
	address:string;
	isActive:boolean
}

export interface PaymentPoint{
	id:number;
	name:string;
	isActive:string;

}

export interface GeatherPoint{
	id:number;
	name:string;
	isActive:string;

}

export interface GeatherPoint{
	id:number;
	name:string;
	isActive:string;

}

export interface User{
	id:number;
	name:string;
	userName:string;
	isConfirm:string;
	isActive:string;
	roleName:string;
	areaName:string;
	responsibility:string;

}

export interface Role{
	id:number;
	roleName:string;
	roleNameAr:string;


}