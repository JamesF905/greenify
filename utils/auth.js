// Created withAuth helper to redirect users that arent authenticated for a page theyre visiting the instead be sent to the login page
const withAuth = (req, res, next) => {
    // If there isnt a matching user_id value, redirect to the /login route
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
    // Continue with the program
        next();
    }
};
  
// Exports the module to be used in other files
module.exports = withAuth;