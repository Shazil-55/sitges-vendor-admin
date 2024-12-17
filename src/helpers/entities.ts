
export enum ActiveBlockStatus {
	Active = 'Active',
	Blocked = 'Blocked'
}


export interface Promotionalcode {
	id: string;
	name?:string;
	shopId: string;
	code: string;
	discountPercentage: number;
	image: string;
	status: PromotionSlidersStatus;
	createdById: string;
	createdAt: string;
	updatedAt: string;
}

export enum PromotionSlidersStatus {
	AwaitingApproval = 'AwaitingApproval',
	Blocked = 'Blocked',
	Expired = 'Expired',
	Active = 'Active',
}

export interface ProductTopping {
	id: string;
	toppingName: string;
	price: number;
	productId: string;
	createdAt: string;
	updatedAt: string;
}

export interface Product {
	id: string;
	categoryId: string;
	name: string;
	price: number;
	status: ActiveBlockStatus;
	image: string;
	displayMode: DisplayMode;
	allergies?: string[];
	shortDescription?: string;
	minimumPreparationTime : number;
	variation?: ProductVariation[];
	toppings?: ProductTopping[];
	createdAt: string;
	updatedAt: string;
}

export interface Wallet {
	id: string;
	userId: string;
	cash: number;
	createdAt: string;
	updatedAt: string;
}

export interface ProductVariation {
	id: string;
	variationName: string;
	price: number;
	createdAt: string;
	updatedAt: string;
}

export enum IdealFor {
	Families = 'Families',
	PlayingBeachGame = 'PlayingBeachGame',
	Couples = 'Couples',
	'Gay/LGBTQ' = 'Gay/LGBTQ',
	Relaxing = 'Relaxing',
	Reading = 'Reading',
	Nudist = 'Nudist'
}

export enum DisplayMode {
	ListModeView = 'ListModeView',
	ThumbnailModeView = 'ThumbnailModeView'
}

export enum SoldBy {
	No = 'No',
	Yes = 'Yes'
}

export enum CategoryStatus {
	InActive = 'InActive',
	Active = 'Active'
}

export enum ShopTypes {
	Restaurant = 'Restaurant',
	Shop = 'Shop',
	Beach = 'Beach',
	Meuseum = 'Meuseum',
	Events = 'Events'
}

export interface Category {
	id: string;
	name: string;
	image: string;
	description?: string;
	shopId: string;
	displayMode: DisplayMode;
	soldBy: SoldBy;
	categoryStatus: CategoryStatus;
	createdAt: string;
	updatedAt: string;
}

export enum Languages {
	English = 'English',
	Spanish = 'Español'
}

export enum ProfileStatus {
	Approved = 'Approved',
	AwaitingApproval = 'AwaitingApproval',
	Rejected = 'Rejected',
	Blocked = 'Blocked'
}

export enum ShopStatus {
	Active = 'Active',
	InActive = 'InActive'
}

export interface ImageUploadResponse {
	url_original_quality: string;
	url_low_quality: string;
	url_good_quality: string;
	public_id: string;
}

export enum UserTypes {
	Customer = 'Customer',
	Vendor = 'Vendor',
	Admin = 'Admin',
	Dispatcher = 'Dispatcher',
	Rider = 'Rider'
}

export enum UserStatus {
	Active = 'Active',
	Inactive = 'Inactive',
	Blocked = 'Blocked',
	Deleted = 'Deleted',
	Pending = 'Pending'
}

export enum RestaurantTypes {
	// Restaurant = 'Restaurant',
	Restaurant = 'Restaurant',
	Beach = 'Beach',
	Meuseum = 'Meuseum',
	Events = 'Events'
}

export interface Restaurants {
	id: string;
	name: string;
	productTags?: string;
	promotionalTags?: string;
	types: RestaurantTypes;
	coverImage: string;
	profileImage: string;
	status: boolean;
	approveStatus: ProfileStatus;
	deliveryTime: string;
	deliveryAmount: number;
	averageRating?: number;
	lat: number;
	long: number;
	vendorId: string;
	shopDetails?: Partial<RestaurantDetails>;
	email?: string;
	createdAt: string;
	updatedAt: string;
}

export interface RestaurantDetails {
	id: string;
	restaurantId: string;
	email: string;
	acceptCoupons: boolean;
	freeShipping: boolean;
	onlinePayment: boolean;
	cardPayment: boolean;
	address: string;
	effectivePayment: boolean;
	isVegan: boolean;
	isVegetarian: boolean;
	generalInformation?: string;
	attributes?: string;
	idealFor: string[];
	bussinessName: string;
	companyName: string;
	nifCifId: string;

	termsOfUse: string;
	privacyPolicy: string;
	deliveryAndReturnPolicy: string;

	commercialCode: number;
	businessTelephone: string;
	isBusinessTelephoneOnWhatsapp: boolean;
	telephoneOperations: string;
	isTelephoneOperationsOnWhatsapp: boolean;
	escalationPhone: string;
	isEscalationPhoneOnWhatsapp: boolean;
	nameOfTheRoad: string;
	trackNumber: number;
	postalCode: number;
	area: string;
	country: string;
	specialities: string[];
	features: string[];
	comments?: string;

	createdAt: string;
	updatedAt: string;
}

export enum CodeStatus {
	Active = 'Active',
	Blocked = 'Blocked'
}

export interface Promocode {
	id: string;
	name: string;
	code: string;
	discount: number;
	shopId: string;
	status: CodeStatus;
	createdAt: string;
	updatedAt: string;
}

export interface Vendors {
	town?: string;
	postCode?: string;
	street?: string;
	floor?: string;
	stair?: string;
	door?: string;
	block?: string;
	emailAccounting: any;
	profileImage?: string | File;
	countryCode?: string;
	commercialActivity?: string;
	fiscalAddress?: any;
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNo: string;
	userId: string;
	companyName: string;
	commercialName: string;
	nifNumber: string;
	additionalAddress?: string;
	category: VendorCategory;
	commercialInvoice: boolean;
	status: ProfileStatus;
	ownerFirstName: string;
	ownerLastName: string;
	ownerPhoneNo: string;
	registeredAs: VendorRegisterType;
	preferedLanguage: Languages;
	dispatcher?: string | null;
	dispatcherName?:string | null;
	dispatcherEmail?:string | null;

	createdAt: string;
	updatedAt: string;
}

export interface UpdateVendorUsers {
	userId?: string;
	companyName?: string;
	postCode?: string;
	street?: string;
	town?: string;
	country?: string;
	phoneNo?: string;
	floor?: string;
	commercialActivity?: string;
	stair?: string;
	profileImage?: string | File;
	door?: string;
	countryCode?: string;
	fiscalAddress?: string;
	commercialName?: string;
	nifNumber?: string;
	additionalAddress?: string;
	block?: string;
	emailAccounting?: string;
	category?: VendorCategory;
	commercialInvoice?: boolean;
	status?: ProfileStatus;
	ownerFirstName?: string;
	ownerLastName?: string;
	ownerPhoneNo?: string;
	registeredAs?: VendorRegisterType;
	preferedLanguage?: Languages;
	dispatcher?: string | null;
}

export enum VendorCategory {
	Services = 'Services',
	Products = 'Products',
	Restoration = 'Restoration',
	Rental = 'Rental'
}

export enum VendorRegisterType {
	'Self-employed' = 'Self-employed',
	Society = 'Society',
	Others = 'Others'
}
