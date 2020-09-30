export enum CUSTOMERS_SEGMENTS {
    consumer = 'consumer',
    business = 'business',
    government = 'government'
}

export enum CHANNELS_PHASES {
    awareness = 'awareness',
    evaluation = 'evaluation',
    purchase = 'purchase',
    delivering_value = 'delivering_value',
    post_sale_support = 'post_sale_support'
}

export enum CUSTOMERS_SEGMENTS_CATEGORIES {
    demographic = 'demographic',
    psychographic = 'psychographic',
    behavioral = 'behavioral',
    geography = 'geography'
}

export enum GENDER {
    male = 'male',
    female = 'female'
}

export enum RELATIONSHIP_STATUS {
    single = 'single',
    married = 'married',
    divorced = 'divorced',
    widowed = 'widowed'
}

export enum MONTHS_OF_THE_YEAR {    
        January = 1,
        February,
        March,
        April,
        May,
        June,
        July,
        August,
        September,
        October,
        November,
        December
}

export enum COST_OR_REVENUE {
    cost = 'cost',
    revenue = 'revenue'
}

export enum RISK_ASSESSTMENT_TYPE {
    strengths = 'strengths',
    weakness = 'weaknesses',
    opportunities = 'opportunities',
    threats = 'threats'
}

export enum RISK_ANALYSIS_TYPE {
    low = 'low',
    medium_low = 'medium_low',
    medium = 'medium',
    medium_high = 'medium_high',
    high = 'high'
}

export enum COMPANY_NETWORK_INVITES_STATUS {
    pending = 'pending',
    accepted = 'accepted',
    denied = 'declined'
}

//file field names according to how they are in the tables
export enum FILETYPE {
    logo = 'logo',
    profile_photo = 'profile_photo',
    sustainable_goal_image = 'sustainable_goal_image',
    pitch_decks_image = 'pitch_decks_image',
    pitch_deck_file_url = 'pitch_deck_file_url',
    market_potential_file_url = 'market_potential_file_url',
    user_profile_photo = 'user_profile_photo',
    contract_image = 'contract_image',
    contract_file_url = 'contract_file_url'
}

export enum COMPANY_TYPE {
    business = 'business',
    hub = 'hub',
    incubator = 'incubator',
    investor = 'investor'
}

export enum CONNECTED_HUB_OR_INCUBATOR {
    hub = 'hub',
    incubator = 'incubator',
    investor = 'investor'
}

export enum CONNECTION_TYPE {
    incoming = 'incoming',
    outgoing = 'outgoing'
}

export enum COMPETITORS_IMPORTANCE_LEVEL {
    low = 'low',
    moderate = 'moderate',
    high = 'high',
    severe = 'severe'
}

export enum RESOURCES_ACTIVITIES_RESOURCES_TYPE {
    resource = 'resource',
    activity = 'activity',
    partner = 'partner'
}
  