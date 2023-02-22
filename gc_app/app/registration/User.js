/**
 * A class representing a signed up user.
 * @class
 */
class User {
    constructor(userName,email,emailVisibility,firstName,lastName,password,passwordConfirm,telephone){
        this.setUserName(userName);
        this.setEmail(email);
        this.setEmailVisibility(emailVisibility);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setPassword(password);
        this.setPasswordConfirm(passwordConfirm);
        this.setTelephone(telephone);
    }

    setUserName(userName){
        this.userName = userName;
    }
    setEmail(email){
        this.email = email;
    }
    setEmailVisibility(emailVisibility){
        this.emailVisibility = emailVisibility;
    }
    setFirstName(firstName){
        this.firstName = firstName;
    }
    setLastName(lastName){
        this.lastName = lastName;
    }
    setPassword(password){
        this.password = password;
    }
    setPasswordConfirm(passwordConfirm){
        this.passwordConfirm = passwordConfirm;
    }
    setTelephone(telephone){
        this.telephone = telephone;
    }
}

export default User;