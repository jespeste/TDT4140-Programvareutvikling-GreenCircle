/**
 * A class representing a report of a user or post.
 * @class
 */
class Report {
    /**
     * Creates a report
     * @param {*} description - Description of incident.
     * @param {*} reporter - The reporting user.
     * @param {*} reportedUser - The reported user.
     * @param {*} reportedPost - The reported post.
     */
    constructor(description, reporter, reportedUser, reportedPost) {
        this.setDescriptipon(description);
        this.setReporter(reporter);
        this.setReportedUser(reportedUser);
        this.setReportedPost(reportedPost);
    }

    setDescriptipon(description) {
        this.description = description;
    }

    setReporter(reporter) {
        this.reporter = reporter;
    }

    setReportedUser(reportedUser) {
        this.reportedUser = reportedUser;
    }

    setReportedPost(reportedPost) {
        this.reportedPost = reportedPost;
    }
}

export default Report;