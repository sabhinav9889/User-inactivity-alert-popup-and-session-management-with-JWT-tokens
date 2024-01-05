export var sessionIdToUserMap = new Map();

export function setValue(key:string, value:string){
    sessionIdToUserMap.set(key, value);
    console.log(sessionIdToUserMap);
}

export function getValue(key:string){
    console.log(sessionIdToUserMap);
    return sessionIdToUserMap.get(key);
}

export function removeValue(key:string){
    // console.log(sessionIdToUserMap);
    sessionIdToUserMap.delete(key);
}