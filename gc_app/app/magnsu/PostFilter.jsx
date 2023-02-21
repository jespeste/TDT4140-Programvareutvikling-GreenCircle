class PostFilter {
    constructor(post_type, search_word, category, location, availability_start, availability_end) {
        this.setPostType(post_type);
        this.setSearchWord(search_word);
        this.setCategory(category);
        this.setLocation(location);
        this.setAvailabilityStart(availability_start);
        this.setAvailabilityEnd(availability_end);
    }

    setPostType(post_type) {
        this.post_type = post_type;
    }
    setSearchWord(search_word) {
        this.search_word = search_word;
    }
    setCategory(category) {
        this.category = category;
    }
    setLocation(location) {
        this.location = location;
    }
    setAvailabilityStart(availability_start) {
        if (availability_start != null) {
            this.availability_start = new Date(availability_start);
        } else {
            this.availability_start = null;
        }
    }
    setAvailabilityEnd(availability_end) {
        if (availability_end != null) {
            this.availability_end = new Date(availability_end);
        } else {
            this.availability_end = null;
        }
    }
  }

export default PostFilter;