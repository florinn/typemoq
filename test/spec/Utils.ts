export class Utils {
    
    static isPhantomJS(): boolean {
       let userAgent = navigator.userAgent;
       let found = userAgent.toLocaleLowerCase().indexOf("phantomjs");
       return found > 0 ? true : false;
    }   
    
    static isNodeJS(): boolean {
        let found = false;
        if (typeof module !== "undefined" && module.exports)
            found = true;
        return found;
    }   
}