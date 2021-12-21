const createBooking = async (req, res) => {
  try {
    const email = req.email;
    const { courseId, locationId, locationName, locationCity } =
      req.body;
    // Get topic, level base on courseId

    // check location base on locationName, locationCity and
    // return location details with wheelchairAccessible

    // selection trainer base on wheelchair, competence(topic), level

    // check if trainer is avail on specified date

  } catch (error) {}
};

export { createBooking };
