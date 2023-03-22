/**
 * Some thoughts:
 * @param item_name Redundant? Could be provided in the title or as part of the description.
 * @param rental_cost Insufficient information? Is the cost per day, per hour..? Could use another attribute to specify the time aspect of the cost.
 * @param replacement_cost Redundant? Could be provided as part of description, or specified upon contact with the owner.
 * @param location Replace with 'region'? Setting regions rather than addresses would make sorting/filtering posts easier?
 * @param image Could be an album instead.
 * @param availabillity_xxxx Only allows for a single period, ideally several would be supported.
 *
 */

/**
 * A class representing a listing or request for lending/renting items.
 * @class
 */
class Post {
	/**
	 * Creates a post.
	 * @constructor
	 * @param {boolean} is_listing - Is the post a listing? Otherwise it must be a request.
	 * @param {string} title - Title of the post.
	 * @param {string} item_name - Name of the item.
	 * @param {string} description - Description of the item.
	 * @param {string} category - Category best suited for the item.
	 * @param {number} rental_cost - Cost of renting over a set time period. Cost of 0 implies item is for lending.
	 * @param {number} replacement_cost - Cost to replace the item.
	 * @param {string} location - Address/region where the item should be picked up.
	 * @param {url} image - Src url to an image depicting the item.
	 * @param {date} availability_start - Start date of when the item is/must be available.
	 * @param {date} availability_end - End date of when the item is/must be available.
	 * @param {User} owner - The user that created and owns the post.
	 */
	constructor(is_listing, title, description, image, owner, favorites, category, location, availability_start, availability_end) {
		this.setFavorites(favorites);
		this.setIsListing(is_listing);
		this.setTitle(title);
		// this.setItemName(item_name);
		this.setDescriptipon(description);
		this.setCategory(category);
		// this.setRentalCost(rental_cost);
		// this.setReplacementCost(replacement_cost);
		this.setLocation(location);
		this.setImage(image);
		this.setAvailabilityStart(availability_start);
		this.setAvailabilityEnd(availability_end);
		this.setOwner(owner);
	}

	setFavorites(favorites) {
		this.favorites = favorites;
	}

	setIsListing(is_listing) {
		this.is_listing = is_listing;
	}

	setTitle(title) {
		this.title = title;
	}

	setItemName(item_name) {
		this.item_name = item_name;
	}

	setDescriptipon(description) {
		this.description = description;
	}

	setCategory(category) {
		this.category = category;
	}

	setRentalCost(rental_cost) {
		this.rental_cost = rental_cost;
	}

	setReplacementCost(replacement_cost) {
		this.replacement_cost = replacement_cost;
	}

	setLocation(location) {
		this.location = location;
	}

	setImage(image) {
		this.image = image;
	}

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

	/**
	 * Set the start of the availabillity period.
	 * @param {date} availability_start - Start date of availabillity, null implies 'whenever'.
	 */
	setAvailabilityStart(availability_start) {
		if (availability_start != null) {
			this.availability_start = new Date(availability_start);
		} else {
			this.availability_start = null;
		}
	}

	/**
	 * Set the end of the availabillity period.
	 * @param {date} availability_start - End date of availabillity, null implies 'whenever'.
	 */
	setAvailabilityEnd(availability_end) {
		if (availability_end != null) {
			this.availability_end = new Date(availability_end);
		} else {
			this.availability_end = null;
		}
	}

	setOwner(owner) {
		this.owner = owner;
	}
}

export default Post;
