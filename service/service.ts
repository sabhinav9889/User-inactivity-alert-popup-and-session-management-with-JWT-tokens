var sessionIdToUserMap = new Map<string, string>();

export function setValue(key:string, value:string){
    sessionIdToUserMap.set(key, value);
    console.log(sessionIdToUserMap);
}

export function getValue(key:string){
    return sessionIdToUserMap.get(key);
}

export function removeValue(key:string){
    sessionIdToUserMap.delete(key);
}