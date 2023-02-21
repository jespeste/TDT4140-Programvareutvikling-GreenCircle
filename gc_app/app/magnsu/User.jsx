/**
 * A class representing a signed up user.
 * @class
 */
class User {
    /** Create a user.
     * @constructor
     * @param {string} name_first - User's first name.
     * @param {string} name_last - User's last name.
     * @param {email} email - User's email. (Used for sign-in)
     * @param {tel} phone_number - User's phone number.
     * @param {date} birthday - User's birthday.
     * @param {password} password - User's password. (Used for sign-in)
     */
    constructor(name_first, name_last, email, phone_number, birthday, password) {        
        this.setNameFirst(name_first);
        this.setNameLast(name_last);
        this.setEmail(email);
        this.setPhoneNumber(phone_number)
        this.setBirthday(birthday)
        this.setPassword(password)
    }

    //A profile image could be added:
    // setImage(image) {
    //     this.image = image;
    // }
    setNameFirst(name_first) {
        this.name_first = name_first;
    }

    setNameLast(name_last) {
        this.name_last = name_last;
    }

    setEmail(email) {
        this.email = email;
    }

    setPhoneNumber(phone_number) {
        this.phone_number = phone_number;
    }

    setBirthday(birthday) {
        if (birthday != null) {
            this.birthday = new Date(birthday);
        } else {
            this.birthday = birthday;
        }
    }
    
    setPassword(password) {
        this.password = password;
    }
  }

export default User;