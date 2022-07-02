module.exports = {
    // Returns the date in DD/MM/YYYY format
    format_date: date => {
        return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`;
    },
}