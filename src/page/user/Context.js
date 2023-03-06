import { createContext } from 'react'


export const UserContext = createContext();
export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

function ErrorCheck() {
    
if (UserContext === undefined) {
    throw new Error("Error Undefined");
  }
return UserContext;
}
export default ErrorCheck