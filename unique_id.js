function getRand(min=0, max=63) {
    return Math.round(Math.random() * (max - min) + min);
}
// Return 6 digit unique id 
const getUnique_id = () =>{
    let allowedChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
    return allowedChar[getRand()] + allowedChar[getRand()] + allowedChar[getRand()] + allowedChar[getRand()] + allowedChar[getRand()] + allowedChar[getRand()]
}

module.exports = getUnique_id;