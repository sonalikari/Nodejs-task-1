const getAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);

    const yearsDifference = today.getFullYear() - birthDate.getFullYear();

    const isBeforeBirthday =
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate());

    return isBeforeBirthday ? yearsDifference - 1 : yearsDifference;
};

module.exports = { getAge };
